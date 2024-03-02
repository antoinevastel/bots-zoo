# Repo of Selenium driverless: https://github.com/kaliiiiiiiiii/Selenium-Driverless

from selenium_driverless import webdriver
from selenium_driverless.types.by import By
import asyncio


async def main():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
    
    async with webdriver.Chrome(options=options) as driver:
        url = "https://antoinevastel.com"
        await driver.get(url)

        user_agent = await driver.execute_script("return navigator.userAgent")
        print("User-Agent: {}".format(user_agent))
        # Legit user-agent, doesn't contain "HeadlessChrome":
        # Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36

        has_webdriver = await driver.execute_script("return !!navigator.webdriver")
        print("Has webdriver: {}\n".format(has_webdriver))
        
        articles = []
        a_elts = await driver.find_elements(By.CSS_SELECTOR, 'article a')
        for a_elt in a_elts:
            articles.append({
                'title': await a_elt.text,
                'url': await a_elt.get_attribute("href")
            })

        print(articles)
        # [{'title': 'New headless Chrome has been released and has a near-perfect browser fingerprint', 'url': 'https://antoinevastel.com/bot%20detection/2023/02/19/new-headless-chrome.html'}, {'title': 'Using Python3-nmap to fingerprint and cluster proxies', 'url': 'https://antoinevastel.com/bot/2022/11/20/fingerprinting-proxies.html'}, {'title': 'Exploring the Avastel all infected IPs 7d blocklist using Git-python and Matplotlib', 'url': 'https://antoinevastel.com/bot/2022/09/24/exploring-ip-list-with-python.html'}, {'title': 'NodeJS/JavaScript: execute at most N tasks at the same time without external dependencies', 'url': 'https://antoinevastel.com/nodejs/2022/02/26/task-pool-no-deps-nodejs.html'}, {'title': 'NodeJS: how to route HTTPS requests through an HTTP proxy without any external dependencies (optimized version)', 'url': 'https://antoinevastel.com/nodejs/2022/02/26/nodejs-optimized-https-proxy-no-dependencies.html'}, {'title': 'NodeJS: how to route HTTPS requests through an HTTP proxy without any external dependencies', 'url': 'https://antoinevastel.com/nodejs/2022/02/19/nodejs-https-proxy-no-dependencies.html'}, {'title': 'Yet another bot IPs blocklist: longtime bot IPs', 'url': 'https://antoinevastel.com/bot/2021/11/02/longtime-ip-block-list.html'}, {'title': 'Bot IPs blocklists', 'url': 'https://antoinevastel.com/bot/2021/10/31/blocking-lists-ips.html'}, {'title': 'Bots IPs API: documentation', 'url': 'https://antoinevastel.com/bot/2021/09/26/bots-ips-api-doc.html'}, {'title': 'New feature to malicious IPs API: check an IP', 'url': 'https://antoinevastel.com/bot/2021/08/24/api-malicious-ips-2.html'}]


asyncio.run(main())
