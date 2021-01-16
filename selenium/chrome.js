require('chromedriver');
var webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async() => {
    let options = new chrome.Options();
    options.addArguments('headless');
    var driver = new webdriver.Builder()
        .setChromeOptions(options)
        .forBrowser('chrome')
        .build();
    
    await driver.get('https://antoinevastel.com/');

    // Example to execute some JS in the browser context
    const userAgent = await driver.executeScript('return navigator.userAgent');
    console.log(userAgent);

    let links = await driver.findElements({css:'article a'});
    const titleArticles = await Promise.all(links.map((link) => {
        return link.getText();
    }));

    console.log(titleArticles)
    // [
    //     "Analyzing Recent's Magento 1 Credit Card Skimmer",
    //     'Creating a simple ExpressJS middleware to detect bots',
    //     'Bot detection 101: How to detect web bots?',
    //     'Bot detection 101: Categories of web bots',
    //     'Benchmarking our JavaScript obfuscator',
    //     'Improving our homemade JavaScript obfuscator',
    //     'A simple homemade JavaScript obfuscator',
    //     'The Intriguing Sneaker Bot industry',
    //     'Detecting Chrome headless, the game goes on!',
    //     'Automatically beautify JavaScript files on the fly with Puppeteer and Chrome headless'
    //   ]

    driver.quit();
})();
