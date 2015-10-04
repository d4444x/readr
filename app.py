from flask import Flask, request, jsonify
import timetommy
import getwords

from flask.ext.cors import CORS
from OpenSSL import SSL
context = SSL.Context(SSL.SSLv23_METHOD)
context.use_privatekey_file('ssl.key')
context.use_certificate_file('ssl.cert')
context = ('ssl.cert', 'ssl.key')
app = Flask(__name__)

app.debug = True

@app.route('/')
def hello():
    return 'hello'

@app.route("/get_time", methods=['POST'])
def get_info():
    try:
        user_id = request.json[0]['user_id']
        url = request.json[0]['url']
	index = request.json[0]['index']
    except Exception, e:
        return str(e)
    content = getwords.get_words(url)
    t = timetommy.calculate_time(content, user_id)
    print jsonify({"time": str(t),"index": index})
    return jsonify({"time": str(t),"index": index})

@app.route("/record_time", methods=['POST'])
def save_info():
    try:
        user_id = request.json['user_id']
        url = request.json['url']
        actual_time = request.json['time']
    except Exception, e:
        return str(e)
    content = getwords.get_words(url)
    t = timetommy.save_metrics(content, user_id, actual_time)
    return str(t)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, ssl_context = context)
