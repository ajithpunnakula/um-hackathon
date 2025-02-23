import requests
import json
import os  # Import the os module

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
            print("Error: The generated text is not valid JSON.")
            print(f"Generated Text: {generated_text}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None
    except (KeyError, IndexError) as e:
        print(f"Error processing the response: {e}")
        print(f"Raw Response: {response.text}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

if __name__ == "__main__":
    # Example usage: Read from input.txt and generate summary
    try:
        with open("/Users/aj/code/um-hackathon/api/input.txt", "r") as file:
            input_text = file.read()
        
        result = generate_ai_summary(input_text)
        if result:
            print(json.dumps(result, indent=2))
    except Exception as e:
        print(f"Error reading input file: {e}")