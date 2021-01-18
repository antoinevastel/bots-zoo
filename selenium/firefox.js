const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
// To run this program, you need to download geckodriver and place it into the same directory as this program
// https://github.com/mozilla/geckodriver/releases/

(async() => {
    let options = new firefox.Options();
    options.addArguments('-headless');

    let driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
    
    await driver.get('https://antoinevastel.com/');

    // Example to execute some JS in the browser context
    const userAgent = await driver.executeScript('return navigator.userAgent');
    console.log(userAgent);

    const webdriverValue = await driver.executeScript('return navigator.webdriver');
    // Is navigator.webdriver present?
    // -> it's present, so it looks like a bot
    // However, with playwright + Firefox, webdriver is = false
    console.log(`Is navigator.webdriver present?: ${webdriverValue}`);


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
