import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    count: 0,
    name: "Eduardo",
    isProcessing: false,
    processError: null,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    async sendChatMessage(history, message) {
      try {
        console.log("🤖 Sending chat message...", { message });

        // Format video analysis as text
        let chatHistory = "";
        const videoAnalysis = history[0]; // Since we're only passing videoAnalysis message
        if (videoAnalysis && videoAnalysis.type === "videoAnalysis") {
          chatHistory = `Here is the context about the video: ${videoAnalysis.content.briefOverview} ${videoAnalysis.content.summaryText} Key Points: ${videoAnalysis.content.takeaways.join(" ")} Transcript: ${videoAnalysis.content.transcript} Question: ${message} - Please respond to the question with concise answer.`;
        } else {
          chatHistory = message;
        }

        console.log("Sending chat history:", chatHistory);

        const response = await fetch(
          "https://um-hackathon.vercel.app/api/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              chat_history: chatHistory
            })
          }
        );

        if (!response.ok) {
          throw new Error(`Chat API error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("💥 Chat message failed:", {
          error: error.message,
          errorStack: error.stack,
        });
        throw error;
      }
    },
    async processVideo(url) {
      try {
        console.log("🚀 Starting video processing...", { url });

        this.isProcessing = true;
        this.processError = null;

        // REAL API REQUEST (commented out for now)
        console.log('📊 Updated processing state:', {
          isProcessing: this.isProcessing,
          processError: this.processError
        })

        console.log('📡 Sending API request to process video:', {
          endpoint: 'https://um-hackathon.vercel.app/api/shortok',
          method: 'POST',
          url
        })

        const response = await fetch('https://um-hackathon.vercel.app/api/shortok', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ url })
        })

        console.log('📥 Received API response:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        })

        if (!response.ok) {
          console.error('❌ Process video error:', {
            url,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries([...response.headers])
          })
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        console.log('🔄 Parsing response data...')
        const data = await response.json()
        return data

        // MOCK RESPONSE (for development)
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        // const mockResponse = {
        //   data: {
        //     channelName: "Stanford Online",
        //     channelSubscription: "729K subscribers",
        //     transcript:
        //       "[MUSIC PLAYING] It is my pleasure to welcome Dr. Andrew Ng, tonight...", // truncated for brevity
        //     transcriptWithTimestamps: [
        //       {
        //         text: "[MUSIC PLAYING]",
        //         timestamp: "0:00",
        //       },
        //       {
        //         text: "It is my pleasure to welcome Dr. Andrew Ng, tonight.",
        //         timestamp: "0:05",
        //       },
        //       // ... rest of timestamps
        //     ],
        //     url: url,
        //     videoPostDate: "Aug 29, 2023",
        //     videoTitle: "Andrew Ng: Opportunities in AI - 2023",
        //     views: "1,935,062 views",
        //   },
        //   status: "success",
        //   summary: {
        //     brief_overview:
        //       "This talk, delivered by AI expert Andrew Ng, explores the vast opportunities and challenges presented by artificial intelligence...",
        //     detailed_explanation:
        //       "Andrew Ng, a prominent figure in the AI industry, delivers a talk outlining the vast opportunities presented by artificial intelligence...",
        //     full_video_summary:
        //       "Andrew Ng's talk offers a compelling vision of AI's transformative potential, likening it to electricity due to its broad applicability...",
        //     important_timestamps_and_key_points: [
        //       {
        //         description:
        //           'Andrew Ng introduces the concept of AI as the "new electricity"',
        //         end_time: 139,
        //         justification:
        //           "This segment is crucial for understanding the transformative potential of AI",
        //         start_time: 75,
        //       },
        //       {
        //         description:
        //           "Ng explains supervised learning with real-world examples",
        //         end_time: 212,
        //         justification: "Clear explanation of fundamental AI concepts",
        //         start_time: 153,
        //       },
        //       // ... more timestamps
        //     ],
        //     key_points: [
        //       "AI as a general-purpose technology with broad applications",
        //       "Supervised learning as a powerful tool for pattern recognition",
        //       "Generative AI's role in content creation",
        //       "Challenges in AI adoption beyond the tech sector",
        //       "Addressing ethical considerations",
        //       "The importance of responsible AI development",
        //     ],
        //     key_takeaways: [
        //       "AI is a general-purpose technology like electricity",
        //       "Supervised and generative AI are powerful tools",
        //       "Democratizing AI through low-code solutions is crucial",
        //       "Responsible AI development is paramount",
        //     ],
        //     reflection_questions: [
        //       "How can we ensure responsible development of AI?",
        //       "What steps can we take to mitigate negative impacts?",
        //       "How can we effectively communicate AI capabilities?",
        //       "What are promising applications in healthcare and education?",
        //     ],
        //     summary_text:
        //       "In this talk, Andrew Ng discusses the vast opportunities presented by AI...",
        //   },
        // };

        // console.log("✅ Process video completed successfully:", {
        //   url,
        //   responseData: mockResponse,
        //   processingTime: "2000ms",
        // });

        // return mockResponse;
      } catch (error) {
        this.processError = error.message;
        console.error("💥 Process video failed:", {
          url,
          error: error.message,
          errorName: error.name,
          errorStack: error.stack,
          state: {
            isProcessing: this.isProcessing,
            processError: this.processError,
          },
        });
        throw error;
      } finally {
        this.isProcessing = false;
        console.log("🏁 Processing finished, state reset:", {
          isProcessing: this.isProcessing,
          processError: this.processError,
        });
      }
    },
  },
});
