# Shortok - AI-Powered Video Learning Assistant

🚀 **Try it now: [shortok.xyz](https://shortok.xyz/)**  
📺 **Watch Demo: [YouTube Demo](https://youtu.be/c4-i-kFc3SQ)**

Transform long videos into bite-sized, interactive learning experiences. Our AI-powered tool helps you extract key insights and engage with educational content more effectively.

# Inspiration
We noticed that many busy professionals and students often stop watching long tutorials or online courses halfway through. Our idea was to create a solution that highlights the most important parts of these videos, helping people quickly find and learn the key insights without getting overwhelmed or losing interest.

# What it does
Our tool automatically transforms long educational videos into bite-sized summaries. It pulls the transcript, identifies the important sections, and presents them with clear summaries and time-stamped markers. That way, learners can jump straight to the topics they care about the most and absorb the content more efficiently.

# How we built it
We integrated the YouTube Data API to obtain transcripts and timestamps. Then, we used Gemini to format the content into structured JSON. We analyzed the transcript to pinpoint the essential moments and synchronized those with timestamps to create short clips. On the development side, we combined Node.js, Vue.js, Firebase Hosting, Firestore, Gemini API, Apify, and Vercel for seamless functionality and deployment.

# Challenges we ran into
We faced a major issue with YouTube not working as expected in production, which slowed down our video processing. Additionally, we had to overcome rate limits when using Gemini, which required optimizing how we handled our requests.

# Accomplishments that we're proud of
We successfully tackled the rate limit problems, ensuring the tool could handle larger batches of video transcripts. We also integrated a feature that allows users to chat with the material for further insights, making the learning experience more interactive.

# What we learned
Throughout the process, we discovered how to efficiently convert long-form content into short, focused highlights. We also deepened our understanding of using Gemini to produce clean, structured JSON outputs for better organization and data handling.

# What's next for Shortok
Looking ahead, we plan to implement asynchronous requests to handle videos even more quickly and efficiently. We also aim to offer live Spanish audio versions of the highlights, making the learning experience accessible to a multilingual audience.

## Technical Details

### Architecture
- **Frontend**: Vue.js application hosted on Firebase
- **Backend**: Flask API deployed on Vercel
- **APIs**: YouTube Data API, Gemini AI, Apify
- **Database**: Firebase Firestore

### Features
- YouTube video transcript extraction
- AI-powered content summarization
- Interactive chat with video content
- Timestamp-based navigation
- Structured JSON responses for better organization

### Prerequisites
- Python 3.8+
- Node.js and npm
- Firebase account
- Required API keys:
  - Google AI Studio API key
  - Google AI Studio Project ID
  - Apify API token
  - Firebase configuration

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shortok.git
   cd shortok
   ```

2. Set up Python virtual environment:
   ```bash
   python -m venv hackathon
   source hackathon/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   export GOOGLE_AI_STUDIO_API_KEY="your_key"
   export GOOGLE_AI_STUDIO_PROJECT_ID="your_project_id"
   export APIFY_API_TOKEN="your_token"
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

### API Endpoints
- `POST /api/shortok`: Process YouTube video and generate summary
- `POST /api/chat`: Interactive chat with video content

### Deployment
The application is deployed using:
- Frontend: Firebase Hosting
- Backend: Vercel
- Database: Firebase Firestore

Configure deployment settings in:
- `firebase.json`: Firebase configuration
- `vercel.json`: Vercel deployment settings
- `.firebaserc`: Firebase project settings

#### Automated Deployment with GitHub Actions
The project uses GitHub Actions for automated deployment to Vercel. The workflow is configured in `.github/workflows/deploy.yml`:

1. Triggers:
   - Automatic deployment on push to the `main` branch

2. Setup Requirements:
   - Vercel account
   - Vercel project token
   - Repository secrets:
     - `VERCEL_TOKEN`: Your Vercel deployment token

3. Workflow Steps:
   ```yaml
   - Checkout repository
   - Install Vercel CLI
   - Pull Vercel environment information
   - Deploy to production
   ```

4. To set up automated deployment:
   - Create a Vercel project and get your deployment token
   - Add the token to your GitHub repository secrets as `VERCEL_TOKEN`
   - Push to the main branch to trigger deployment

The deployment workflow will automatically:
- Pull the latest environment variables
- Deploy to Vercel's production environment
- Provide deployment status and logs in GitHub Actions

### Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### License
This project is open source and available under the MIT License.
