// Available only in beta for the moment
// https://github.com/berstend/puppeteer-extra/tree/automation-extra/packages/playwright-extra#readme
// Follow instructions in the README.md to install compatible version
const { chromium } = require('playwright-extra');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://antoinevastel.com/');

    const userAgent = await page.evaluate(() => {
        return navigator.userAgent;
    });

    // To verify the browser used by Playwright
    console.log(`User-Agent is: ${userAgent}`);

    // Get the list of article titles
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