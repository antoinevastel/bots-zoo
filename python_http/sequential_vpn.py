# pip3 install 'urllib3[socks]'

import requests
import json
import random
import os
from bs4 import BeautifulSoup

# Not your usual username/password
# Go to https://my.nordaccount.com/dashboard/nordvpn/
# Then scroll to section "Advanced configuration"
# Select credentials provided in "Service credentials (manual setup)"
username = os.environ["NORD_VPN_USERNAME"]
password = os.environ["NORD_VPN_PWD"]

# unofficial list, obtained here: https://support.nordvpn.com/Connectivity/Proxy/1401143382/Proxy-setup-on-Vuze.htm
# https://api.nordvpn.com/v1/servers doesn't list socks proxies
# and HTTP(s) proxies listed on the API doesn't seem to work anymore
hosts = [
    'amsterdam.nl.socks.nordhold.net',
    'atlanta.us.socks.nordhold.net',
    'dallas.us.socks.nordhold.net',
    'dublin.ie.socks.nordhold.net',
    'ie.socks.nordhold.net',
    'los-angeles.us.socks.nordhold.net',
    'nl.socks.nordhold.net',
    'se.socks.nordhold.net',
    'stockholm.se.socks.nordhold.net',
    'us.socks.nordhold.net'
]


# 1st, make a request without VPN
r_no_vpn = requests.get('http://ip-api.com/json/')
json_response_no_vpn = json.loads(r_no_vpn.text)
print(json_response_no_vpn)
print("Info IP without VPN")
print("Country: {}".format(json_response_no_vpn['country']))
print("City: {}".format(json_response_no_vpn['city']))
print("ISP: {}".format(json_response_no_vpn['isp']))
print("IP: {}".format(json_response_no_vpn['query']))
print()


# Randomly select a host among all possible hosts
host = random.choice(hosts)

print("Selected host = {}".format(host))
proxy = {
    'https': "socks5://{}:{}@{}:1080".format(username, password, host),
    'http': "socks5://{}:{}@{}:1080".format(username, password, host)
}

# 2nd, make a request with VPN
r_with_vpn = requests.get('http://ip-api.com/json/', proxies=proxy, timeout=35)
json_response_with_vpn = json.loads(r_with_vpn.text)
print("Info IP with VPN")
print("Country: {}".format(json_response_with_vpn['country']))
print("City: {}".format(json_response_with_vpn['city']))
print("ISP: {}".format(json_response_with_vpn['isp']))
print("IP: {}".format(json_response_with_vpn['query']))
print()

print("Start crawling HN using Nord VPN...")
headers = {
    "accept-language": "en-US;q=0.8,en;q=0.7",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"
    # Add any header you want
}

url = 'https://news.ycombinator.com/news?p'
NUM_PAGES_TO_CRAWL = 5

results = []

for idx_page in range(1, NUM_PAGES_TO_CRAWL + 1):
    print("Crawling page {}/{}".format(idx_page, NUM_PAGES_TO_CRAWL))
    r = requests.get("{}={}".format(url, idx_page), headers=headers, proxies=proxy)
    html_content = r.text
    soup = BeautifulSoup(html_content, 'html.parser')
    for link in soup.select('a.storylink'):
        results.append('{};{}'.format(link.get('href'), link.text))

print(results)
