const puppeteer = require('puppeteer');

// List of available devices:
// https://pptr.dev/#?product=Puppeteer&version=v7.1.0&show=api-puppeteerdevices
console.log(puppeteer.devices);

(async () => {
    const iphone11 = puppeteer.devices['iPhone 11 Pro Max'];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Pretends to be an iPhone 11 Pro max device
    // Will change attribute such as the user agent
    // as well as screen resolution:
    // {
    //     name: 'iPhone 11 Pro Max',
    //     userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
    //     viewport: {
    //       width: 414,
    //       height: 896,
    //       deviceScaleFactor: 3,
    //       isMobile: true,
    //       hasTouch: true,
    //       isLandscape: false
    // }
    await page.emulate(iphone11);
    await page.goto('https://antoinevastel.com/');

    const deviceInfo = await page.evaluate(() => {
        return {
            userAgent: navigator.userAgent,
            screenWidth: screen.width,
            screenHeight: screen.height,
            numTouchPoints: navigator.maxTouchPoints
        }
    });

    // To verify it properly emulates an iPhone 11 Pro Max device
    console.log(deviceInfo);
    // {
    //     userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
    //     screenWidth: 414,
    //     screenHeight: 896,
    //     numTouchPoints: 1
    // }


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
    await browser.close()
})()