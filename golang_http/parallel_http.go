package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
)

func getURL(url string, wg *sync.WaitGroup, c chan<- []string) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	defer wg.Done()

	if err != nil {
		log.Fatalln(err)
	}

	req.Header.Set("accept-language", "en-US;q=0.8,en;q=0.7")
	req.Header.Set("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36")
	// Add any header you want

	resp, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	var results []string

	doc.Find("a.storylink").Each(func(i int, aElt *goquery.Selection) {
		href, _ := aElt.Attr("href")
		results = append(results, fmt.Sprintf("%s;%s\n", href, aElt.Text()))
	})
	c <- results
}

func main() {
	// Crawl URLs by batches of maxConcurrency URLs at a time
	// Wait for all the requests to finish before starting a new batch of requests
	// Not equivalent to a pool of goroutines (or to a Promise.map in NodeJs) since not all goroutines are used at a given time
	numPages := 10
	maxConcurrency := 4

	var results []string
	for idx := 1; idx <= numPages; idx += +maxConcurrency {
		var numGoroutines int

		// Handle cases where number of pages to crawl is not a multiple of maxConcurrency
		if idx+maxConcurrency > numPages {
			numGoroutines = (numPages - idx) + 1
		} else {
			numGoroutines = maxConcurrency
		}

		fmt.Printf("Creating %d goroutines\n", numGoroutines)

		c := make(chan []string, numGoroutines)
		var wg sync.WaitGroup
		wg.Add(numGoroutines)
		for indexPage := idx; indexPage < idx+numGoroutines; indexPage++ {
			url := fmt.Sprintf("https://news.ycombinator.com/news?p=%d", indexPage)
			fmt.Printf("Crawling page: %s\n", url)
			go getURL(url, &wg, c)
		}

		wg.Wait()
		close(c)

		for resultsURL := range c {
			for _, storyLinkInfo := range resultsURL {
				results = append(results, storyLinkInfo)
			}
		}

	}

	fmt.Printf("Found %d URLs\n", len(results))
	fmt.Println(strings.Join(results[:], "\n"))

	// Found 300 URLs

	// 	https://www.semanticscholar.org/product/semantic-reader;Semantic Reader: Show Reference Abstracts in Context, and More

	// https://csvbox.io;Show HN: Csvbox.io – CSV import button for a web app, SaaS or API

	// https://github.com/sidkshatriya/me/blob/master/004-A-debugger-is-born.md;55,000 lines of Rust code later: A debugger is born

	// ...
}
