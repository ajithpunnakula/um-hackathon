from flask import Flask, jsonify, request
import os


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


from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs
from googleapiclient.discovery import build
from datetime import datetime
import os

    # Get API key from environment variables
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')

def get_video_id(youtube_url):
    """Extract video ID from YouTube URL"""
    parsed_url = urlparse(youtube_url)
    
    if parsed_url.hostname in ('youtu.be', 'www.youtu.be'):
        return parsed_url.path[1:]
    if parsed_url.hostname in ('youtube.com', 'www.youtube.com'):
        query_params = parse_qs(parsed_url.query)
        return query_params.get('v', [None])[0]
    return None

def get_video_details(video_id):
    """Get video details using YouTube Data API"""
    try:
        youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
        
        request = youtube.videos().list(
            part="snippet,contentDetails,statistics",
            id=video_id
        )
        response = request.execute()

        if not response['items']:
            return None

        video_data = response['items'][0]
        return {
            'title': video_data['snippet']['title'],
            'channel': video_data['snippet']['channelTitle'],
            'published_at': video_data['snippet']['publishedAt'],
            'view_count': video_data['statistics']['viewCount'],
            'like_count': video_data['statistics'].get('likeCount', 'N/A'),
            'description': video_data['snippet']['description']
        }
    except Exception as e:
        print(f"Error fetching video details: {str(e)}")
        return None

def get_transcript_with_timestamps(youtube_url):
    """Get transcript with timestamps and video details"""
    try:
        video_id = get_video_id(youtube_url)
        if not video_id:
            return "Invalid YouTube URL"

        # Get video details
        video_details = get_video_details(video_id)
        if not video_details:
            return "Could not fetch video details"

        # Get transcript
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Format output
        output = []
        output.append(f"Title: {video_details['title']}")
        output.append(f"Channel: {video_details['channel']}")
        output.append(f"Published: {datetime.fromisoformat(video_details['published_at'].replace('Z', '+00:00')).strftime('%Y-%m-%d')}")
        output.append(f"Views: {video_details['view_count']}")
        output.append(f"Likes: {video_details['like_count']}")
        output.append("\nTranscript:")
        
        # Format transcript with timestamps
        for entry in transcript:
            time_in_seconds = int(entry['start'])
            minutes = time_in_seconds // 60
            seconds = time_in_seconds % 60
            timestamp = f"{minutes:02d}:{seconds:02d}"
            
            output.append(f"[{timestamp}] {entry['text']}")
        
        return "\n".join(output)
    
    except Exception as e:
        return f"Error: {str(e)}"

# def main():
#     if not YOUTUBE_API_KEY:
#         print("Error: YouTube API key not found in environment variables")
#         return

#     youtube_url = input("Enter YouTube video URL: ")
#     result = get_transcript_with_timestamps(youtube_url)
#     print("\nVideo Information and Transcript:")
#     print(result)

# if __name__ == "__main__":
#     main()


if __name__ == '__main__':
    app.run()