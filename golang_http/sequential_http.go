package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func getURL(url string) ([]string, error) {
	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)

	if err != nil {
		log.Fatalln(err)

		return []string{}, errors.New("Couldn't get content of the page")
	}

	req.Header.Set("accept-language", "en-US;q=0.8,en;q=0.7")
	req.Header.Set("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36")
	// Add any header you want

	resp, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)

		return []string{}, errors.New("Couldn't get content of the page")
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

	return results, nil
}

func main() {
	numPages := 5

	var results []string
	for indexPage := 1; indexPage <= numPages; indexPage++ {
		url := fmt.Sprintf("https://news.ycombinator.com/news?p=%d", indexPage)
		fmt.Printf("Crawling page: %s\n", url)
		resultsURL, err := getURL(url)
		if err != nil {
			log.Fatal(err)
		}

		for _, storyLinkInfo := range resultsURL {
			results = append(results, storyLinkInfo)
		}
	}

	fmt.Printf("Found %d URLs\n", len(results))
	fmt.Println(strings.Join(results[:], "\n"))

	// Found 150 URLs

	// https://chrome.google.com/webstore/detail/buy-nearby/egoikpnpdihpdfenconkdnndbnhcfmkj;Chrome extension recommends local businesses while shopping on Amazon or eBay

	// https://portfolio.zxh.io;Show HN: A portfolio website simulating macOS's GUI using React

	// https://www.theguardian.com/lifeandstyle/2021/apr/16/experience-ive-had-the-same-supper-for-10-years;I’ve had the same supper for 10 years
	// ...
}
