# https://github.com/MeiK2333/pyppeteer_stealth
import asyncio
from pyppeteer import launch
from pyppeteer_stealth import stealth

def parse_articles(a_elts):
    print(a_elts)
    return 'toto'

async def main():
    browser = await launch(headless=True)
    page = await browser.newPage()

    await stealth(page)
    await page.goto('https://antoinevastel.com/')

    user_agent = await page.evaluate('navigator.userAgent;')
    print("User-Agent: {}".format(user_agent))
    # Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3542.0 Safari/537.36
    # No signs of "HeadlessChrome" in the User-Agent

    has_webdriver = await page.evaluate('!!navigator.webdriver;')
    print("Has webdriver: {}".format(has_webdriver))
    # No webdriver


    #  Get the list of articles
    titleArticles = await page.querySelectorAllEval('article a',
    '''(aElts) => {
        return Array.from(aElts).map((aElt) => {
            return {
                title: aElt.innerText,
                url: aElt.href
            }
        })  
    }''')

    print(titleArticles)
    # [{'title': 'Equivalent of Promise.map (Bluebird) in Python', 'url': 'https://antoinevastel.com/python/2021/03/13/promise-map-python.html'}, {'title': 'A common mistake while monitoring HTTP responses with Puppeteer', 'url': 'https://antoinevastel.com/puppeteer/2021/01/23/instrumenting-requests-puppeteer-bug.html'}, {'title': "Analyzing Recent's Magento 1 Credit Card Skimmer", 'url': 'https://antoinevastel.com/fraud/2020/09/20/analyzing-magento-skimmer.html'}, {'title': 'Creating a simple ExpressJS middleware to detect bots', 'url': 'https://antoinevastel.com/bot/2020/05/10/express-middleware-bot.html'}, {'title': 'Bot detection 101: How to detect web bots?', 'url': 'https://antoinevastel.com/javascript/2020/02/09/detecting-web-bots.html'}, {'title': 'Bot detection 101: Categories of web bots', 'url': 'https://antoinevastel.com/crawler/2019/12/29/families-web-bots.html'}, {'title': 'Benchmarking our JavaScript obfuscator', 'url': 'https://antoinevastel.com/javascript/2019/09/10/benchmarking-obfuscator.html'}, {'title': 'Improving our homemade JavaScript obfuscator', 'url': 'https://antoinevastel.com/javascript/2019/09/09/improving-obfuscator.html'}, {'title': 'A simple homemade JavaScript obfuscator', 'url': 'https://antoinevastel.com/javascript/2019/09/04/home-made-obfuscator.html'}, {'title': 'The Intriguing Sneaker Bot industry', 'url': 'https://antoinevastel.com/javascript/2019/08/31/sneakers-supreme-bots.html'}]

    await browser.close()

asyncio.get_event_loop().run_until_complete(main())
