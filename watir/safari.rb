# Work only on MacOS
# Follow instructions here to install driver: http://watir.com/guides/safari/
require 'watir'

browser = Watir::Browser.new :safari

browser.goto 'https://antoinevastel.com'

userAgent = browser.execute_script('return navigator.userAgent')
puts "User agent is: ", userAgent, "\n"
# Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15
# -> Not headless

webdriver = browser.execute_script("return navigator.webdriver")
puts "Is webdriver present: ", webdriver, "\n"
# By default, webdriver is present

articles = []
browser.articles().each { |articleElt|
    aElt = articleElt.a()
    article = {"title" => aElt.text, "url" => aElt.href}
    articles.push(article)
}

puts articles
# {"title"=>"Equivalent of Promise.map (Bluebird) in Python", "url"=>"https://antoinevastel.com/python/2021/03/13/promise-map-python.html"}
# {"title"=>"A common mistake while monitoring HTTP responses with Puppeteer", "url"=>"https://antoinevastel.com/puppeteer/2021/01/23/instrumenting-requests-puppeteer-bug.html"}
# {"title"=>"Analyzing Recent's Magento 1 Credit Card Skimmer", "url"=>"https://antoinevastel.com/fraud/2020/09/20/analyzing-magento-skimmer.html"}
# {"title"=>"Creating a simple ExpressJS middleware to detect bots", "url"=>"https://antoinevastel.com/bot/2020/05/10/express-middleware-bot.html"}
# {"title"=>"Bot detection 101: How to detect web bots?", "url"=>"https://antoinevastel.com/javascript/2020/02/09/detecting-web-bots.html"}
# {"title"=>"Bot detection 101: Categories of web bots", "url"=>"https://antoinevastel.com/crawler/2019/12/29/families-web-bots.html"}
# {"title"=>"Benchmarking our JavaScript obfuscator", "url"=>"https://antoinevastel.com/javascript/2019/09/10/benchmarking-obfuscator.html"}
# {"title"=>"Improving our homemade JavaScript obfuscator", "url"=>"https://antoinevastel.com/javascript/2019/09/09/improving-obfuscator.html"}
# {"title"=>"A simple homemade JavaScript obfuscator", "url"=>"https://antoinevastel.com/javascript/2019/09/04/home-made-obfuscator.html"}
# {"title"=>"The Intriguing Sneaker Bot industry", "url"=>"https://antoinevastel.com/javascript/2019/08/31/sneakers-supreme-bots.html"}

browser.close