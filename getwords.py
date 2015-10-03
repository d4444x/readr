import requests
from bs4 import BeautifulSoup
import re
import unicodedata
import redis

# EXPIRE_TIME = 20 # in seconds
# r = redis.Redis()

def get_words(url):
	# Returns the string of content of the page

	# cached = redis.get(url)
	# if cached:
		# return cached
		
    html = requests.get(url).text.encode('ascii', 'ignore')
    html = html.encode('ascii', 'ignore')
    soup = BeautifulSoup(html)
    texts = soup.findAll(text=True)

    def visible(element):        
        if element.parent.name in ['style', 'script', '[document]', 'head', 'title']:
            return False
        elif element[:4] == '<!--' and element[-3:] == '-->':
            return False
        return True
    visible_texts = filter(visible, texts)
    text = ''.join(visible_texts).replace('\n', ' ')
    words = re.sub( '\s+', ' ', text ).strip()
    words = re.sub('[^A-Za-z0-9\.\-\?\!\~\s]+', '', words)
    # r.set(url, words)
    # r.expire(url, EXPIRE_TIME)
    return words.lower().encode('ascii', 'ignore')
