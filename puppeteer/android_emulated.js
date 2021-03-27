const puppeteer = require('puppeteer');

// List of available devices:
// https://pptr.dev/#?product=Puppeteer&version=v7.1.0&show=api-puppeteerdevices
console.log(puppeteer.devices);

(async () => {
    const nexus10 = puppeteer.devices['Nexus 10'];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Pretends to be a Nexus 10 device
    // Will change attribute such as the user agent
    // as well as screen resolution:
    // {
    //     name: 'Nexus 10',
    //     userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
    //     viewport: {
    //       width: 800,
    //       height: 1280,
    //       deviceScaleFactor: 2,
    //       isMobile: true,
    //       hasTouch: true,
    //       isLandscape: false
    //  }
    await page.emulate(nexus10);
    await page.goto('https://antoinevastel.com/');

    const deviceInfo = await page.evaluate(() => {
        return {
            userAgent: navigator.userAgent,
            screenWidth: screen.width,
            screenHeight: screen.height,
            numTouchPoints: navigator.maxTouchPoints
        }
    });

    // To verify it properly emulates a Nexus 10 device
    console.log(deviceInfo);
    // {
    //     userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3765.0 Safari/537.36',
    //     screenWidth: 800,
    //     screenHeight: 1280,
    //     touchSupport: 1
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