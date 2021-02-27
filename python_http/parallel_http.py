import asyncio
from datetime import datetime
import aiohttp
from bs4 import BeautifulSoup


async def get_url(session, url):
    headers = {
        "accept-language": "en-US;q=0.8,en;q=0.7",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
        # Add any header you want
    }

    print("Crawling: {}".format(url))
    results = []
    resp = await session.get(url, headers=headers)
    print("Crawled: {}".format(url))
    html_content = await resp.text()

    soup = BeautifulSoup(html_content, 'html.parser')
    for link in soup.select('a.storylink'):
        results.append('{};{}'.format(link.get('href'), link.text))

    return results


async def main():
    max_concurrency = 3
    num_pages = 20
    tasks = []
    urls = ['https://news.ycombinator.com/news?p={}'.format(idx_page) for idx_page in range(1, num_pages)]
    connector = aiohttp.TCPConnector(limit=max_concurrency)
    session = aiohttp.ClientSession(connector=connector)

    start = datetime.now()
    for url in urls:
        tasks.append(asyncio.ensure_future(get_url(session, url)))

    results_tasks = await asyncio.gather(*tasks)
    links = []
    for sublist_results in results_tasks:
        for link in sublist_results:
            links.append(link)

    end = datetime.now()
    print("Results obtained in {}:".format(end - start))
    print(links)
    connector.close()


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
