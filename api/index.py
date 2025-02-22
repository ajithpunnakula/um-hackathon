from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/api", methods=['GET'])
def home():
    return jsonify({"message": "Hello from Flask on Vercel!"})

@app.route("/", methods=['GET'])
def root():
    return jsonify({"message": "Welcome to the API"})

if __name__ == '__main__':
    app.run()