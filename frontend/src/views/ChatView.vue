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

            <!-- Shorts Message -->
            <div v-if="message.type === 'shorts'" class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Generated Shorts</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card v-for="(short, index) in message.content" :key="index" class="hover:shadow-md transition-shadow">
                  <template #content>
                    <img :src="short.thumbnail" :alt="short.title" class="w-full h-32 object-cover rounded-t-lg" />
                    <div class="p-3">
                      <div class="flex items-center text-sm text-gray-500 mb-2">
                        <i class="pi pi-clock mr-1"></i>
                        {{ short.duration }}
                      </div>
                      <h4 class="font-medium text-gray-900">{{ short.title }}</h4>
                      <p class="mt-1 text-sm text-gray-500">{{ short.summary }}</p>
                    </div>
                  </template>
                </Card>
              </div>
            </div>

            <!-- Summary Message -->
            <Card v-if="message.type === 'summary'" class="bg-purple-50">
              <template #content>
                <h3 class="text-lg font-semibold text-purple-900">{{ message.content.title }}</h3>
                <ul class="mt-2 space-y-2">
                  <li v-for="(point, index) in message.content.points" :key="index" class="text-purple-700">
                    • {{ point }}
                  </li>
                </ul>
              </template>
            </Card>

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
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useMainStore } from '../stores/main'

const url = ref('')
const isProcessing = ref(false)
const messages = ref([])
const newMessage = ref('')
const store = useMainStore()

const handleSubmit = async () => {
  if (!url.value.trim()) return

  const message = url.value
  url.value = ''
  messages.value.push({ role: 'user', content: message })

  // Start both processes in parallel
  const [mockResponse, apiResponse] = await Promise.all([
    // Your existing mock delay
    new Promise(resolve => {
      setTimeout(() => {
        resolve("This is a mock response")
      }, 2000)
    }),
    // Actual API call
    store.processVideo(message)
  ])

  // Handle both responses
  messages.value.push({ role: 'assistant', content: mockResponse })
  console.log('API Response:', apiResponse)
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
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
