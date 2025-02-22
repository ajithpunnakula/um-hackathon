import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({ 
        count: 0, 
        name: 'Eduardo',
        isProcessing: false,
        processError: null
    }),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
      increment() {
        this.count++
      },
      async processVideo(url) {
        try {
          this.isProcessing = true
          this.processError = null
          
          console.log('🎥 Processing video:', { url })
          
          const response = await fetch('https://um-hackathon.vercel.app/api/process-video', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
          })
          
          if (!response.ok) {
            console.error('❌ Process video error:', { 
              url,
              status: response.status,
              statusText: response.statusText 
            })
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          console.log('✅ Process video success:', { 
            url,
            responseData: data 
          })
          
          return data
        } catch (error) {
          this.processError = error.message
          console.error('💥 Process video exception:', { 
            url,
            error: error.message 
          })
          throw error
        } finally {
          this.isProcessing = false
        }
      }
    },
  })