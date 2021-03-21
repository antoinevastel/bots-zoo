// https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth
const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// Code is similar to puppeteer/chrome.js
// The only differences are related to the imports above and 
// the fact that we use StealthPlugin()
// You must install these dependencies for this program to work: npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://antoinevastel.com/');

    // Get the list of article titles
    const titleArticles = await page.$$eval('article a', aElts => {
        return aElts.map(aElt => aElt.text)
    })

    console.log(titleArticles)
    // [
    //     "Equivalent of Promise.map (Bluebird) in Python",
    //     "A common mistake while monitoring HTTP responses with Puppeteer",
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
    await browser.close()
})()