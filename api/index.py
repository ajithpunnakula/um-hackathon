from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import logging
from apify_client import ApifyClient
import requests
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Get Apify API token from environment variables
APIFY_API_TOKEN = os.getenv('APIFY_API_TOKEN')

def generate_ai_summary(input_text):
    """
    Generate an AI summary using Google's Gemini API.
    
    Args:
        input_text (str): The text to append to the base prompt
        
    Returns:
        dict: Generated JSON summary or None if error occurs
    """
    # Get API key and project ID from environment variables
    API_KEY = os.environ.get("GOOGLE_AI_STUDIO_API_KEY")
    PROJECT_ID = os.environ.get("GOOGLE_AI_STUDIO_PROJECT_ID")

    # Check if API key and project ID are set
    if not API_KEY or not PROJECT_ID:
        raise ValueError("Please set the GOOGLE_AI_STUDIO_API_KEY and GOOGLE_AI_STUDIO_PROJECT_ID environment variables.")

    # Define the prompt prefix
    prompt_prefix = """You are an advanced summary generator. Imagine your audience is a student who wants to learn from the video. You will be provided with a transcript of a video where timestamps are noted in the format [mm:ss]. Your tasks are:
Convert Timestamps to Seconds

For each timestamp in the transcript (e.g., [01:15] to [01:27]), convert them to the total number of seconds from the start of the video (e.g., 75 to 87).
Identify and Highlight Important Timestamps

Focus on 5–8 key moments in the video. Use the following criteria to decide which segments are "important" for learning:
Major topic changes.
Demonstrations of new or crucial information (e.g., code examples, important explanations).
Clear thematic or conceptual shifts (e.g., "Now, let's move on to…," "This is the key takeaway…").
Notable points that help a learner better understand or apply the material.
For each important timestamp range, be sure to:
Convert the timestamp to seconds.
Provide a short description of what happens.
Give a brief justification of why it is significant for student learning.
Create Educational Summaries for Each Segment

In the "summary" array of your final JSON, include entries for each major segment or clip of the video.
Each entry should contain:
A "start" time (in seconds),
An "end" time (in seconds),
A short "title" that identifies the segment,
A student-focused "clip_summary" field that:
Clearly explains the key ideas or skills demonstrated,
Highlights how these ideas or skills connect to the broader topic,
Shows how this segment fits into the context of the entire video to enhance understanding,
Uses straightforward language or examples to help the student learn effectively.
Produce a Single JSON Output

Your final JSON must include all of the following fields (merge the requirements from both sets of instructions):
{
"status": "success",
"summary_text": "<A concise summary of the video in three paragraphs or less, focusing on the main learning points>",
"key_points": [
"<Key point 1>",
"<Key point 2>",
...
],
"summary": [
{
"start": <start time in seconds>,
"end": <end time in seconds>,
"title": "<title for the section>",
"clip_summary": "<an educational summary that places the segment in the context of the video>"
},
...
],
"brief_overview": "<2-3 sentence high-level purpose of the snippet, emphasizing the learning outcome>",
"full_video_summary": "<Broader overview of the entire video and how the snippet supports learning>",
"important_timestamps_and_key_points": [
{
"start_time": "<timestamp in seconds>",
"end_time": "<timestamp in seconds>",
"description": "<short summary of what happens>",
"justification": "<brief reason why this timestamp is important for learning>"
},
...
],
"detailed_explanation": "<In-depth explanation, including any code blocks (in Markdown) or formulas (using LaTeX if needed). Be sure to escape content properly so the JSON remains valid.>",
"reflection_questions": [
"<Open-ended question 1>",
"<Open-ended question 2>",
"<Open-ended question 3>",
"<Open-ended question 4>"
],
"key_takeaways": [
"<Most important lesson or insight 1>",
"<Most important lesson or insight 2>",
...
]
}
Formatting Requirements

Return only valid JSON—no Markdown headers or extra text outside the JSON object.
Ensure all code blocks and any LaTeX formulas are properly escaped (for example, using \\n for line breaks within a JSON string, and backslashes or double backslashes where needed).
The "status" field must be set to "success".
The "summary_text" field should be no more than three paragraphs and centered on helping a learner grasp the material.
Include approximately 8 key sections in the "summary" array, each with the required "start", "end", "title", and "clip_summary" fields.
The "reflection_questions" array must have exactly four questions.
You may reference or quote parts of the transcript within "detailed_explanation", but ensure the entire JSON remains valid and properly escaped.
Example of Converting Timestamps

For [01:15] to [01:27] (75 to 87 seconds), an entry in "summary" might look like:
"summary": [
{
"start": 75,
"end": 87,
"title": "Introduction to AI Opportunities",
"clip_summary": "The speaker explains why AI is considered 'the new electricity' and how it can be applied across industries. This segment highlights the broad transformative power of AI, setting the stage for deeper exploration."
}
]
What to Include in Your Final Output

A concise, student-focused summary of the video (3 paragraphs or less) in "summary_text".
A list of key points in "key_points".
A structured breakdown of the video in "summary", using the converted timestamps, with educational explanations in the "clip_summary" field that also place each segment in the context of the overall video.
The additional fields specified above:
"brief_overview"
"full_video_summary"
"important_timestamps_and_key_points" (5–8 key moments with short justifications)
"detailed_explanation"
"reflection_questions"
"key_takeaways"
Return Your Answer

As valid JSON with all required fields—nothing more, nothing less.

Here is the transcript to analyze:
"""

    # Combine the prefix with the input text
    prompt = prompt_prefix + input_text

    # Construct the API request
    API_ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-001:generateContent?key={API_KEY}"

    request_body = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.9,  # Adjust for creativity
            "topP": 1,
            "topK": 1,
            "maxOutputTokens": 8192,
            "response_mime_type": "application/json"
        },
        "safetySettings": [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
    }

    try:
        # Send the request
        response = requests.post(API_ENDPOINT, json=request_body)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Parse the JSON response
        response_json = response.json()

        # Extract the generated text
        generated_text = response_json['candidates'][0]['content']['parts'][0]['text']

        # Try to parse the generated text as JSON
        try:
            generated_json = json.loads(generated_text)
            return generated_json
        except json.JSONDecodeError:
            logger.error("Error: The generated text is not valid JSON.")
            logger.error(f"Generated Text: {generated_text}")
            return None

    except requests.exceptions.RequestException as e:
        logger.error(f"Request failed: {e}")
        return None
    except (KeyError, IndexError) as e:
        logger.error(f"Error processing the response: {e}")
        logger.error(f"Raw Response: {response.text}")
        return None
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        return None

def generate_ai_chat_response(chat_history):
    """
    Generate an AI summary using Google's Gemini API.
    
    Args:
        chat_history (list): A list of dictionaries, where each dictionary contains a 'role' and 'content' key.
        
    Returns:
        dict: Generated JSON summary or None if error occurs
    """
    # Get API key and project ID from environment variables
    API_KEY = os.environ.get("GOOGLE_AI_STUDIO_API_KEY")
    PROJECT_ID = os.environ.get("GOOGLE_AI_STUDIO_PROJECT_ID")

    # Check if API key and project ID are set
    if not API_KEY or not PROJECT_ID:
        raise ValueError("Please set the GOOGLE_AI_STUDIO_API_KEY and GOOGLE_AI_STUDIO_PROJECT_ID environment variables.")

    # Define the prompt prefix

    # Combine the prefix with the input text
    prompt = chat_history

    # Construct the API request
    API_ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-001:generateContent?key={API_KEY}"

    request_body = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.9,  # Adjust for creativity
            "topP": 1,
            "topK": 1,
            "maxOutputTokens": 500,
            "response_mime_type": "application/json"
        },
        "safetySettings": [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
    }

    try:
        # Send the request
        response = requests.post(API_ENDPOINT, json=request_body)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Parse the JSON response
        response_json = response.json()

        # Extract the generated text
        generated_text = response_json['candidates'][0]['content']['parts'][0]['text']

        # Try to parse the generated text as JSON
        try:
            generated_json = json.loads(generated_text)
            return generated_json
        except json.JSONDecodeError:
            logger.error("Error: The generated text is not valid JSON.")
            logger.error(f"Generated Text: {generated_text}")
            return None

    except requests.exceptions.RequestException as e:
        logger.error(f"Request failed: {e}")
        return None
    except (KeyError, IndexError) as e:
        logger.error(f"Error processing the response: {e}")
        logger.error(f"Raw Response: {response.text}")
        return None
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        return None


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

@app.route("/api/youtube", methods=['POST', 'OPTIONS'])
def get_youtube_data():
    # Handle preflight request
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        return response

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
        # Run the actor and wait for it to finish
        run = client.actor("fWIyRKfnKlxB1r5CX").call(run_input=run_input)

        # Fetch results from the actor's default dataset
        logger.info("Fetching results from dataset")
        items = []
        for item in client.dataset(run["defaultDatasetId"]).iterate_items():
            items.append(item)

        if not items:
            logger.error("No data returned from Apify")
            return jsonify({"error": "No data found for the provided URL"}), 404

        logger.info("Successfully fetched YouTube data")
        response = jsonify({
            "status": "success",
            "data": items[0]  # Return the first item since we're only scraping one video
        })
        
        # Add CORS headers to the response
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        return response

    except Exception as e:
        logger.error(f"Error in get_youtube_data: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/shortok", methods=['POST', 'OPTIONS'])
def get_shortok():
    # Handle preflight request
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        return response

    try:
        logger.info("Received request to /api/shortok")
        
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
        # Run the actor and wait for it to finish
        run = client.actor("fWIyRKfnKlxB1r5CX").call(run_input=run_input)

        # Fetch results from the actor's default dataset
        logger.info("Fetching results from dataset")
        items = []
        for item in client.dataset(run["defaultDatasetId"]).iterate_items():
            items.append(item)

        if not items:
            logger.error("No data returned from Apify")
            return jsonify({"error": "No data found for the provided URL"}), 404

        # Get the video data
        video_data = items[0]

        # Generate AI summary
        logger.info("Generating AI summary")
        summary = generate_ai_summary(json.dumps(video_data))
        
        if summary is None:
            logger.error("Failed to generate AI summary")
            return jsonify({
                "status": "error",
                "message": "Failed to generate AI summary",
                "data": video_data
            }), 500

        # Return both the video data and AI summary
        logger.info("Successfully processed video and generated summary")
        response = jsonify({
            "status": "success",
            "data": video_data,
            "summary": summary
        })
        
        # Add CORS headers to the response
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        return response

    except Exception as e:
        logger.error(f"Error in get_shortok: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/chat", methods=['POST', 'OPTIONS'])
def get_chat_response():
    # Handle preflight request
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        return response

    try:
        logger.info("Received request to /api/chat")
        
        # Get text from request
        data = request.get_json()
        if not data or 'chat_history' not in data:
            logger.error("No chat history provided in request")
            return jsonify({"error": "Chat history is required"}), 400
            
        chat_history = data['chat_history']
        logger.info("Processing chat history input")

        # Generate AI summary
        logger.info("Generating AI Chat response")
        chat_response = generate_ai_chat_response(chat_history=chat_history)
        
        if chat_response is None:
            logger.error("Failed to generate AI Chat response")
            return jsonify({
                "status": "error",
                "message": "Failed to generate AI Chat response"
            }), 500

        # Return the summary
        logger.info("Successfully generated Chat response")
        response = jsonify({
            "status": "success",
            "chat_response": chat_response
        })
        
        # Add CORS headers to the response
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        return response

    except Exception as e:
        logger.error(f"Error in summarize_text: {str(e)}")
        return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=6000)