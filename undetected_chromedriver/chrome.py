# https://github.com/ultrafunkamsterdam/undetected-chromedriver
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By

options = uc.ChromeOptions()
options.headless=True
driver = uc.Chrome(options=options)

url = "https://antoinevastel.com"
driver.get(url)

user_agent = driver.execute_script("return navigator.userAgent")
print("User-Agent: {}".format(user_agent))
# Legit user-agent, doesn't contain "HeadlessChrome":
# Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36

has_webdriver = driver.execute_script("return !!navigator.webdriver")
print("Has webdriver: {}".format(has_webdriver))
# No webdriver

articles = []
a_elts = driver.find_elements(By.CSS_SELECTOR, 'article a')
for a_elt in a_elts:
    articles.append({
        'title': a_elt.text,
        'url': a_elt.get_attribute("href")
    })

print(articles)
# [{'title': 'Equivalent of Promise.map (Bluebird) in Python', 'url': 'https://antoinevastel.com/python/2021/03/13/promise-map-python.html'}, {'title': 'A common mistake while monitoring HTTP responses with Puppeteer', 'url': 'https://antoinevastel.com/puppeteer/2021/01/23/instrumenting-requests-puppeteer-bug.html'}, {'title': "Analyzing Recent's Magento 1 Credit Card Skimmer", 'url': 'https://antoinevastel.com/fraud/2020/09/20/analyzing-magento-skimmer.html'}, {'title': 'Creating a simple ExpressJS middleware to detect bots', 'url': 'https://antoinevastel.com/bot/2020/05/10/express-middleware-bot.html'}, {'title': 'Bot detection 101: How to detect web bots?', 'url': 'https://antoinevastel.com/javascript/2020/02/09/detecting-web-bots.html'}, {'title': 'Bot detection 101: Categories of web bots', 'url': 'https://antoinevastel.com/crawler/2019/12/29/families-web-bots.html'}, {'title': 'Benchmarking our JavaScript obfuscator', 'url': 'https://antoinevastel.com/javascript/2019/09/10/benchmarking-obfuscator.html'}, {'title': 'Improving our homemade JavaScript obfuscator', 'url': 'https://antoinevastel.com/javascript/2019/09/09/improving-obfuscator.html'}, {'title': 'A simple homemade JavaScript obfuscator', 'url': 'https://antoinevastel.com/javascript/2019/09/04/home-made-obfuscator.html'}, {'title': 'The Intriguing Sneaker Bot industry', 'url': 'https://antoinevastel.com/javascript/2019/08/31/sneakers-supreme-bots.html'}]

driver.quit()