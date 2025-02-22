<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="pi pi-youtube text-purple-600 text-xl"></i>
          <h1 class="text-xl font-bold text-gray-900">ShortForm AI</h1>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <div class="space-y-6">
        <!-- URL Input -->
        <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-4">
          <div class="flex gap-2">
            <InputText
              v-model="url"
              type="url"
              placeholder="Paste YouTube URL here..."
              class="flex-1"
              required
            />
            <Button
              type="submit"
              :loading="isProcessing"
              :disabled="isProcessing"
              severity="primary"
            >
              {{ isProcessing ? 'Processing...' : 'Transform' }}
            </Button>
          </div>
        </form>

        <!-- Message Thread -->
        <div class="space-y-6">
          <div v-for="message in messages" :key="message.id" class="animate-fade-in">
            <!-- Video Message -->
            <Card v-if="message.type === 'video'" class="hover:shadow-md transition-shadow">
              <template #content>
                <div class="relative">
                  <img :src="message.content.thumbnail" :alt="message.content.title" class="w-full h-48 object-cover rounded-lg" />
                  <div class="absolute inset-0 flex items-center justify-center">
                    <i class="pi pi-play text-white text-4xl opacity-80"></i>
                  </div>
                </div>
                <h3 class="mt-3 text-lg font-semibold text-gray-900">{{ message.content.title }}</h3>
                <p class="mt-1 text-sm text-gray-500">{{ message.content.url }}</p>
              </template>
            </Card>

            <!-- Video Analysis -->
            <Card v-if="message.type === 'videoAnalysis'" class="bg-white">
              <template #content>
                <TabView>
                  <TabPanel header="Key Takeaways">
                    <div class="bg-purple-50 rounded-lg p-4">
                      <h3 class="text-lg font-semibold text-purple-900">Key Points</h3>
                      <ul class="mt-2 space-y-2">
                        <li v-for="(point, index) in message.content.takeaways" :key="index" class="text-purple-700">
                          • {{ point }}
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                  
                  <TabPanel header="Summary">
                    <div class="p-4">
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">Full Summary</h3>
                      <p class="text-gray-700 whitespace-pre-line">{{ message.content.summary }}</p>
                    </div>
                  </TabPanel>
                  
                  <TabPanel header="Transcript">
                    <div class="p-4">
                      <h3 class="text-lg font-semibold text-gray-900 mb-3">Full Transcript</h3>
                      <div class="max-h-96 overflow-y-auto">
                        <p class="text-gray-700 whitespace-pre-line">{{ message.content.transcript }}</p>
                      </div>
                    </div>
                  </TabPanel>
                </TabView>
              </template>
            </Card>

            <!-- Shorts Message -->
            <div v-if="message.type === 'shorts'" class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Generated Shorts</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                <!-- Play Shorts Overlay -->
                <div 
                  v-if="!isPlayingShorts" 
                  class="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10 cursor-pointer"
                  @click="startPlayingShorts(message.content)"
                >
                  <div class="text-center">
                    <i class="pi pi-play-circle text-white text-6xl mb-2"></i>
                    <div class="text-white text-xl font-semibold">Play Shorts</div>
                  </div>
                </div>
                
                <Card v-for="(short, index) in message.content" :key="index" class="hover:shadow-md transition-shadow">
                  <template #content>
                    <div class="relative aspect-video">
                      <iframe
                        :src="`https://www.youtube.com/embed/${getVideoId(short.videoUrl)}?enablejsapi=1`"
                        class="w-full h-full rounded-t-lg"
                        :class="{'opacity-50': isPlayingShorts && currentShortIndex !== index}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        @load="setupYouTubePlayer($event, index)"
                      ></iframe>
                    </div>
                    <div class="p-3">
                      <div class="flex items-center text-sm text-gray-500 mb-2">
                        <i class="pi pi-clock mr-1"></i>
                        {{ formatDuration(short.startTime, short.endTime) }}
                      </div>
                      <h4 class="font-medium text-gray-900">{{ short.title }}</h4>
                    </div>
                  </template>
                </Card>
              </div>
            </div>

            <!-- User Message -->
            <div v-if="message.type === 'user'" class="flex justify-end">
              <div class="bg-purple-600 text-white rounded-lg p-3 max-w-[80%]">
                <p class="text-sm">{{ message.content }}</p>
              </div>
            </div>

            <!-- Assistant Message -->
            <div v-if="message.type === 'assistant'" class="flex justify-start">
              <div class="bg-gray-100 text-gray-900 rounded-lg p-3 max-w-[80%]">
                <p class="text-sm">{{ message.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input - Only show when processing is complete and we have messages -->
        <form 
          v-if="messages.length && !isProcessing" 
          @submit.prevent="handleSendMessage" 
          class="sticky bottom-0 bg-white rounded-lg shadow-md p-4 animate-fade-in"
        >
          <div class="flex gap-2">
            <InputText
              v-model="newMessage"
              placeholder="Ask about the video content..."
              class="flex-1"
            />
            <Button type="submit" severity="primary">
              <i class="pi pi-send"></i>
            </Button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { useMainStore } from '../stores/main'

const url = ref('')
const isProcessing = ref(false)
const messages = ref([])
const newMessage = ref('')
const store = useMainStore()

// Add these new refs
const isPlayingShorts = ref(false)
const currentShortIndex = ref(0)
const players = ref([])

const handleSubmit = async () => {
  if (!url.value.trim()) return

  // Clear previous messages when submitting new URL
  messages.value = []

  // Add URL message in purple bubble
  messages.value.push({
    id: Date.now().toString(),
    type: 'user',
    content: url.value,
  })

  const videoUrl = url.value
  url.value = ''
  isProcessing.value = true

  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Add video card
    messages.value.push({
      id: Date.now().toString(),
      type: 'video',
      content: {
        title: 'How to Build a Successful Startup',
        thumbnail: 'https://i.ytimg.com/vi/sample/maxresdefault.jpg',
        url: videoUrl
      }
    })

    // Add video analysis with tabs
    messages.value.push({
      id: Date.now().toString(),
      type: 'videoAnalysis',
      content: {
        takeaways: [
          'Start with a clear problem statement',
          'Focus on customer validation early',
          'Build a minimum viable product',
          'Iterate based on user feedback',
          'Maintain a sustainable growth rate'
        ],
        summary: 'This comprehensive guide covers the essential steps to building a successful startup, from initial ideation to scaling. The video emphasizes the importance of customer-focused development and iterative improvement based on real feedback. The presenter walks through each stage of startup development, highlighting common pitfalls to avoid and sharing practical strategies for success.',
        transcript: `
00:00 - Introduction to startup fundamentals
02:15 - Identifying market opportunities
  - Understanding customer pain points
  - Market size evaluation
  - Competitive analysis
05:30 - Customer validation techniques
  - Interview strategies
  - Feedback collection methods
  - Iterative learning process
08:45 - Building MVP strategies
  - Feature prioritization
  - Development timeline
  - Resource allocation
12:00 - Growth and scaling approaches
  - Marketing channels
  - Team building
  - Investment strategies
15:30 - Common pitfalls to avoid
  - Premature scaling
  - Ignoring customer feedback
  - Poor market fit
18:45 - Conclusion and key takeaways
        `.trim()
      }
    })

    // Add shorts suggestions
    messages.value.push({
      id: Date.now().toString(),
      type: 'shorts',
      content: [
        {
          title: 'First Segment Highlight',
          videoUrl: 'https://www.youtube.com/watch?v=wzFLZPE_gNk',
          startTime: 30,
          endTime: 40
        },
        {
          title: 'Second Segment Analysis',
          videoUrl: 'https://www.youtube.com/watch?v=wzFLZPE_gNk',
          startTime: 100,
          endTime: 110
        },
        {
          title: 'Key Insights',
          videoUrl: 'https://www.youtube.com/watch?v=wzFLZPE_gNk',
          startTime: 150,
          endTime: 160
        },
        {
          title: 'Final Thoughts',
          videoUrl: 'https://www.youtube.com/watch?v=wzFLZPE_gNk',
          startTime: 200,
          endTime: 210
        }
      ]
    })

  } catch (error) {
    messages.value.push({
      id: Date.now().toString(),
      type: 'assistant', 
      content: 'Sorry, there was an error processing the video.'
    })
  } finally {
    isProcessing.value = false
  }
}

const handleSendMessage = () => {
  if (!newMessage.value.trim()) return


  const userMessage = {
    id: Date.now().toString(),
    type: 'user',
    content: newMessage.value,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  newMessage.value = ''

  // Simulate AI response
  setTimeout(() => {
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: "Based on the video content, I can explain more about that topic...",
      timestamp: new Date()
    }
    messages.value.push(aiMessage)
  }, 1000)
}

const getVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const formatDuration = (start, end) => {
  return `${Math.round(end - start)} seconds`;
}

const startPlayingShorts = (shorts) => {
  isPlayingShorts.value = true
  currentShortIndex.value = 0
  // Start playing the first short
  const firstPlayer = players.value[0]
  if (firstPlayer) {
    firstPlayer.seekTo(shorts[0].startTime)
    firstPlayer.playVideo()
  }
}

const setupYouTubePlayer = (event, index) => {
  // Only setup if not already done
  if (!players.value[index]) {
    const iframe = event.target
    const short = messages.value.find(m => m.type === 'shorts').content[index]
    
    const player = new YT.Player(iframe, {
      videoId: getVideoId(short.videoUrl),
      playerVars: {
        start: short.startTime,
        controls: 1,
        modestbranding: 1,
        disablekb: 1,
        rel: 0,
        autoplay: isPlayingShorts.value && currentShortIndex.value === index ? 1 : 0
      },
      events: {
        'onReady': (event) => onPlayerReady(event, index),
        'onStateChange': (event) => handlePlayerStateChange(event, index)
      }
    })
    players.value[index] = player
  }
}

const onPlayerReady = (event, index) => {
  if (isPlayingShorts.value && currentShortIndex.value === index) {
    event.target.seekTo(messages.value.find(m => m.type === 'shorts').content[index].startTime)
    event.target.playVideo()
    checkEndTime(event.target, index)
  }
}

const checkEndTime = (player, index) => {
  const short = messages.value.find(m => m.type === 'shorts').content[index]
  const interval = setInterval(() => {
    if (player.getCurrentTime() >= short.endTime) {
      player.stopVideo()
      clearInterval(interval)
      // Move to next short after a brief pause
      setTimeout(() => {
        if (currentShortIndex.value < messages.value.find(m => m.type === 'shorts').content.length - 1) {
          currentShortIndex.value++
          const nextPlayer = players.value[currentShortIndex.value]
          if (nextPlayer) {
            nextPlayer.seekTo(messages.value.find(m => m.type === 'shorts').content[currentShortIndex.value].startTime)
            nextPlayer.playVideo()
          }
        } else {
          // Reset when all shorts are played
          isPlayingShorts.value = false
          currentShortIndex.value = 0
        }
      }, 1000)
    }
  }, 500)
}

const handlePlayerStateChange = (event, index) => {
  if (event.data === YT.PlayerState.PLAYING && isPlayingShorts.value && currentShortIndex.value === index) {
    checkEndTime(event.target, index)
  }
}

// Add YouTube API script
onMounted(() => {
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }
})

// Cleanup
onUnmounted(() => {
  players.value.forEach(player => {
    if (player && player.destroy) {
      player.destroy()
    }
  })
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Add custom styles for tabs if needed */
:deep(.p-tabview-nav) {
  background: transparent;
  border-bottom: 1px solid #e2e8f0;
}

:deep(.p-tabview-nav-link) {
  color: #4b5563;
}

:deep(.p-tabview-selected .p-tabview-nav-link) {
  color: #7c3aed;
}

.opacity-50 {
  opacity: 0.5;
  transition: opacity 0.3s ease;
}
</style>
