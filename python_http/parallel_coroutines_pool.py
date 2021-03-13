import asyncio
import aiohttp
from bs4 import BeautifulSoup


async def get_url(url):
    connector = aiohttp.TCPConnector()
    session = aiohttp.ClientSession(connector=connector)

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
    await connector.close()

    soup = BeautifulSoup(html_content, 'html.parser')
    for link in soup.select('a.storylink'):
        results.append('{};{}'.format(link.get('href'), link.text))

    return results


async def promise_map(values, mapper, concurrency):

    async def mapper_wrapper(iterator, mapper):
        res_coroutine = []
        for elt in iterator:
            res_mapper = await mapper(elt)
            res_coroutine.append(res_mapper)

        return res_coroutine

    coroutines = []
    values_iterator = iter(values)

    for idx_concurrency in range(0, concurrency):
        coroutines.append(mapper_wrapper(values_iterator, mapper))


    results = await asyncio.gather(*coroutines)

    res_coroutines = []
    for res_coroutine in results:
        for v in res_coroutine:
            res_coroutines.append(v)

    return res_coroutines


async def main():
    num_pages = 15
    concurrency = 4
    urls = ['https://news.ycombinator.com/news?p={}'.format(idx_page) for idx_page in range(1, num_pages)]
    res = await promise_map(urls, get_url, concurrency)
    print(res)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
