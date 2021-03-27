# Bots Zoo

For my different projects, I often have to launch bots using different kinds of browsers (Firefox, Chrome, Headless/not headless) using different automation frameworks (Puppeteer, Selenium, Playwright) in several programming languages. 

Since I'm juggling between different frameworks/languages, sometimes it's difficult to remember/find how to set up a particular kind of bot, or how to execute basic commands. 

That's why I've decided to centralize examples of simple bots in this repository. I hope it will also benefit other people.

For the moment I only have example for the following bots:
- Playwright (NodeJS): Chromium, Webkit (Safari), Firefox
- Playwright extra stealth (Nodejs): Chromium (will be updated when it becomes stable)
- Puppeteer (NodeJS): Chromium, Firefox, Android (emulation), iPhone (emulation)
- Puppeteer extra stealth (NodeJS): Chromium
- Pyppeteer stealth (Python): Chromium
- Selenium (NodeJS): Chromium, Firefox
- Selenium stealth (Python): Chrome
- Undetected Chromedriver (Python): Chrome
- Ferrum (Ruby): Chrome
- Watir (Ruby): Chrome, Safari (MacOS)
- Simple HTTP module/library (NodeJS + Cheerio): Sequential, Parallel
- Simple HTTP module/library (Python requests/aiohttp + Beautifulsoup): Sequential, Parallel (x2 implementations)

I will continue to add other examples, such as Playwright Firefox/WebKit, Selenium Firefox, both in NodeJS but also in other programming languages like Python.
I will also provide examples for bot frameworks that provide mechanisms against bot detection solutions.

The **headers** directory contains data related to HTTP headers.
For the moment, it contains:
- A list of ~16K user-agents;
- **Accept** headers for the main browsers;
- **Accept-Encoding** headers for the main browsers;
- **Header names** for the main browsers;
- **Fetch metadata** request headers.

The **browser_apis** directory contains data related to JS APIs sometimes used to identify a browser:
- ```language.txt``` values of navigator.language;
- ```languages.txt``` values of navigator.languages;
- ```mimeTypes.txt``` values of navigator.mimeTypes;
- ```oscpus.txt``` values of navigator.oscpu;
- ```platforms.txt``` values of navigator.platform;
- ```plugins.txt``` values of navigator.plugins;
- ```webGLrenderers.txt``` values of ```gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)```;
- ```webGLvendors.txt``` values of ```gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)```;

**DON'T contact me** if you want to ask me how to make your bot(s) undetectable. 
You can find [articles on my website](https://antoinevastel.com/categories.html#Bot-detection-ref), but I won't provide more details since I'm working for a bot detection company.
