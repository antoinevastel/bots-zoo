import requests
from bs4 import BeautifulSoup

headers = {
    "accept-language": "en-US;q=0.8,en;q=0.7",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
    # Add any header you want
}

url = 'https://news.ycombinator.com/news?p'
NUM_PAGES_TO_CRAWL = 5

results = []

for idx_page in range(1, NUM_PAGES_TO_CRAWL + 1):
    print("Crawling page {}/{}".format(idx_page, NUM_PAGES_TO_CRAWL))
    r = requests.get("{}={}".format(url, idx_page), headers=headers)
    html_content = r.text
    soup = BeautifulSoup(html_content, 'html.parser')
    for link in soup.select('a.storylink'):
        results.append('{};{}'.format(link.get('href'), link.text))

print(results)
# ['https://github.com/vosen/ZLUDA;Zluda: CUDA on Intel GPUs',
# 'https://github.com/trailofbits/graphtage;Graphtage: A semantic diff utility for JSON, HTML, YAML, CSV, etc',
# 'https://offgridpermaculture.com/Finding_Land/Free_Land___Living_Off_Grid_With_No_Money.html;Free Land – Living Off Grid With No Money',
# ...
# 'https://github.com/chriswalz/bit/blob/master/README.md;Bit (1.0) – a modern Git CLI in Go']
