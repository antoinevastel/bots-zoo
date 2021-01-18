const playwright = require('playwright');

(async () => {
    const browser = await playwright['firefox'].launch();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto('https://antoinevastel.com/');

    const userAgent = await page.evaluate(() => {
        return navigator.userAgent;
    });

    // To verify the browser used by Playwright
    console.log(`User-Agent is: ${userAgent}`);

    const webdriver = await page.evaluate(() => {
        return navigator.webdriver;
    });

    // Is navigator.webdriver present?
    // -> it's not present, so it appears human
    console.log(`Is navigator.webdriver present?: ${webdriver}`);

    // Get the list of article titles
    // Same API as Puppeteer
    const titleArticles = await page.$$eval('article a', aElts => {
        return aElts.map(aElt => aElt.text)
    })

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

    await browser.close();

})();