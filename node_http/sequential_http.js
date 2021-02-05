// To save results of the crawl
const fs = require('fs');

// To make http requests
const http = require('https');

// To parse HTML
const cheerio = require('cheerio');

async function getURL(url, headers) {
    return new Promise((resolve, reject) => {
        const request = http.request(url, { headers: headers }, (res) => {
            let data = ""

            res.on("data", d => {
                data += d
            })

            res.on("end", () => {
                resolve(data);
            })

            res.on("error", (err) => {
                reject(err);
            })
        })

        request.on('error', (err) => {
            reject(err);
        });

        request.end();
    })
}

(async () => {
    const numPagesToCrawl = 4;
    const url = 'https://news.ycombinator.com/news?p';
    const headers = {
        "accept-language": "en-US;q=0.8,en;q=0.7",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        // Add any header you want
    };

    const results = [];
    for (let indexPage = 1; indexPage <= numPagesToCrawl; indexPage++) {
        try {
            console.log(`Crawling page ${indexPage}/${numPagesToCrawl}`);
            const htmlContent = await getURL(`${url}=${indexPage}`, headers);
    
            // Parse raw HTML
            const $ = cheerio.load(htmlContent);
            links = $('a.storylink');
            $(links).each((i, link) => {
                results.push(`${$(link).attr('href')};${$(link).text()}`);
            });
        } catch (e) {
            console.error(`Error while crawling ${url}=${indexPage}`);
            console.error(e);
        }
    }

    // Print result of the crawl
    console.log(results);
    /*
        [
            'https://mitpress.mit.edu/books/elements-computing-systems-second-edition;The Elements of Computing Systems, Second Edition',
            'https://www.eurekalert.org/pub_releases/2021-02/uop-ftt012921.php;Fecal transplant turns cancer immunotherapy non-responders into responders',
            'https://www.remarkbox.com/remarkbox-is-now-pay-what-you-can.html;Show HN: Remarkbox – Hosted comments without ads or tracking',
            ...
            'https://blocksandfiles.com/2021/02/04/petabyte-tape-cartridges-are-coming/;Petabyte tape cartridges are coming'
        ]
    */

    fs.writeFileSync('./result_crawl_seq_hn.csv',
        results.join('\n', 'utf8'));

})();