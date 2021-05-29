/*
    This file shows how to use HTTP proxies that require authentication in NodeJS
    using no external dependencies, i.e. no request/request-promise.
    Indeed, these libraries have been deprecated for more than a year but all/most Stackoverflow answers still advise to use these 2 libraries because it's easier.
    I thought it would be nice to have a simple working example in vanilla NodeJS.
*/

const http = require('http');

// Configuration file that contains information about your proxy
// {
//     "proxy_username": "username",
//     "proxy_password": "password",
//     "proxy_host": "proxyHost",
//     "proxy_port": proxyPort
// }
const conf = require('./conf.json');

// Value of the Proxy-Authorization header required to connect to the proxy
const proxyAuthHeader = 'Basic ' + Buffer.from(conf.proxy_username + ':' + conf.proxy_password).toString('base64');

async function getURL(url, headers) {
    return new Promise((resolve, reject) => {
        headers.host = new URL(url).hostname;
        headers['Proxy-Authorization'] = proxyAuthHeader;
        const options = {
            host: conf.proxy_host,
            port: conf.proxy_port,
            path: url,
            headers: headers
        }
        const request = http.request(options, (res) => {
            let data = ""

            res.on("data", d => {
                data += d
            })

            res.on("end", () => {
                resolve(data);
            })

            res.on("error", (err) => {
                reject(err);
            })
        })

        request.on('error', (err) => {
            reject(err);
        });

        request.end();
    })
}

(async () => {
    const headers = {
        "accept-language": "en-US;q=0.8,en;q=0.7",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
        // Add any header you want
    };

    const url = 'http://ip-api.com/json/';
    const numRequests = 10;
    
    for (let i = 0; i < numRequests; i++) {
        const infoIp = await getURL(url, headers);
        console.log(infoIp);
    }

    // {"status":"success","country":"United States","countryCode":"US","region":"NY","regionName":"New York","city":"New York","zip":"10001","lat":40.7503,"lon":-74.0014,"timezone":"America/New_York","isp":"Colocation America Corporation","org":"MOD Mission Critical","as":"AS21769 Colocation America Corporation","query":"184.174.8.112"}
    // {"status":"success","country":"United States","countryCode":"US","region":"CA","regionName":"California","city":"Los Angeles","zip":"90014","lat":34.0494,"lon":-118.2661,"timezone":"America/Los_Angeles","isp":"Colocation America Corporation","org":"Colocation America Corporation","as":"AS21769 Colocation America Corporation","query":"185.202.170.244"}
    // {"status":"success","country":"United States","countryCode":"US","region":"NY","regionName":"New York","city":"New York","zip":"10001","lat":40.7503,"lon":-74.0014,"timezone":"America/New_York","isp":"Colocation America Corporation","org":"MOD Mission Critical","as":"AS21769 Colocation America Corporation","query":"184.174.11.68"}
    // ...
    // {"status":"success","country":"United States","countryCode":"US","region":"PA","regionName":"Pennsylvania","city":"State College","zip":"16803","lat":40.8009,"lon":-77.8805,"timezone":"America/New_York","isp":"MOD Mission Critical","org":"FISK INTERNET SERVICES, LLC","as":"AS54103 MOD Mission Critical","query":"216.155.48.39"}
    // {"status":"success","country":"United States","countryCode":"US","region":"CA","regionName":"California","city":"San Jose","zip":"95119","lat":37.2379,"lon":-121.7946,"timezone":"America/Los_Angeles","isp":"Colocation America Corporation","org":"MOD Mission Critical","as":"AS21769 Colocation America Corporation","query":"66.78.6.24"}

})();