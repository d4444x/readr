from flask import Flask, request
app = Flask(__name__)
app.debug = True

@app.route("/get_time", methods=['POST'])
def get_info():
	try:
		user_id = request.form['user_id']
		url = request.form['url']
	except Exception, e:
		return str(e)
    return "Hello World!"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)