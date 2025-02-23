from flask import Flask, jsonify, request
import os
import logging
from apify_client import ApifyClient

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Get Apify API token from environment variables
APIFY_API_TOKEN = os.getenv('APIFY_API_TOKEN')

@app.route('/api')
def hello():
    return jsonify({"message": "Welcome to YouTube Transcript API!"})

@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route("/api/url", methods=['POST'])
def process_url():
    url = request.json.get('url')
    if not url:
        return jsonify({
            "error": "URL is required"
        }), 400
    return jsonify({
        "message": f"Successfully received URL: {url}"
    })

@app.route("/api/youtube", methods=['POST'])
def get_youtube_data():
    try:
        logger.info("Received request to /api/youtube")
        
        if not APIFY_API_TOKEN:
            logger.error("Apify API token not found in environment variables")
            return jsonify({"error": "Apify API token not configured"}), 500

        # Get URL from request
        data = request.get_json()
        if not data or 'url' not in data:
            logger.error("No URL provided in request")
            return jsonify({"error": "YouTube URL is required"}), 400
            
        youtube_url = data['url']
        logger.info(f"Processing URL: {youtube_url}")

        # Initialize the ApifyClient with your API token
        client = ApifyClient(APIFY_API_TOKEN)

        # Prepare the actor input
        run_input = {
            "video_urls": [{"url": youtube_url}]
        }

        logger.info("Starting Apify actor run")
        # Run the actor with a timeout
        from concurrent.futures import ThreadPoolExecutor, TimeoutError
        from functools import partial

        def run_apify():
            run = client.actor("fWIyRKfnKlxB1r5CX").call(run_input=run_input)
            items = []
            for item in client.dataset(run["defaultDatasetId"]).iterate_items():
                items.append(item)
            return items

        # Set timeout to 50 seconds (leaving 10 seconds buffer for Vercel's 60-second limit)
        with ThreadPoolExecutor() as executor:
            future = executor.submit(run_apify)
            try:
                items = future.result(timeout=50)
            except TimeoutError:
                logger.error("Operation timed out")
                return jsonify({"error": "Operation timed out. Please try again."}), 504

        if not items:
            logger.error("No data returned from Apify")
            return jsonify({"error": "No data found for the provided URL"}), 404

        logger.info("Successfully fetched YouTube data")
        return jsonify({
            "status": "success",
            "data": items[0]  # Return the first item since we're only scraping one video
        })

    except Exception as e:
        logger.error(f"Error in get_youtube_data: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run