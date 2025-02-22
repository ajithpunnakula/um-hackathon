from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Hello from Flask on Vercel!"})

def handler(event, context):
    return app(event, context)