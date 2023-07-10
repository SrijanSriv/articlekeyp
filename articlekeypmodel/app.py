from flask import Flask, request
from flask_cors import CORS
from script import Model

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "nice try ;)"

@app.route("/api", methods=['POST'])
def api_call():
    article_url = request.form.get('url')

    if article_url == None:
        return request.form
    
    m1 = Model(article_url)

    return  m1.find_keywords()

if __name__ == '__main__':
    app.run()