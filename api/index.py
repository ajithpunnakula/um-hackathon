from flask import Flask, jsonify, request
from .video_transcript import get_transcript_with_timestamps

app = Flask(__name__)

@app.route("/api", methods=['GET'])
def home():
    return jsonify({"message": "Hello from Flask on Vercel!"})

@app.route("/", methods=['GET'])
def root():
    return jsonify({"message": "Welcome to the API"})

@app.route("/api/url", methods=['POST'])
def process_url():
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({"error": "URL is required"}), 400
        
    url = data['url']
    
    # Return the processed URL
    return jsonify({
        "status": "success",
        "url": url,
        "message": f"Successfully received URL: {url}"
    })

@app.route("/api/transcript", methods=['POST'])
def get_transcript():
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({"error": "YouTube URL is required"}), 400
        
    youtube_url = data['url']
    transcript = get_transcript_with_timestamps(youtube_url)
    
    if isinstance(transcript, str) and transcript.startswith("Error"):
        return jsonify({"error": transcript}), 400
    
    return jsonify({
        "status": "success",
        "transcript": transcript
    })

if __name__ == '__main__':
    app.run()