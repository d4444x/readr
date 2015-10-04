from flask import Flask, request
import timetotommy
import getwords
app = Flask(__name__)

app.debug = True

@app.route("/get_time", methods=['POST'])
def get_info():
    try:
        user_id = request.json[0]['user_id']
        url = request.json[0]['url']
	index = request.json[0]['index']
    except Exception, e:
        return str(e)
    content = getwords.get_words(url)
    t = timetotommy.calculate_time(content, user_id)
    return jsonify({"time": str(t),"index": index})

@app.route("/record_time", methods=['POST'])
def save_info():
    try:
        user_id = request.form['user_id']
        url = request.form['url']
        actual_time = request.form['time']
    except Exception, e:
        return str(e)
    content = getwords.get_words(url)
    t = timetotommy.save_metrics(content, user_id, actual_time)
    return str(t)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
