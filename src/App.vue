<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify Demo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        class="mr-2"
        @click="goToDemo"
      >
        <v-icon left>mdi-view-dashboard</v-icon>
        Демо компоненты
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="mt-4 elevation-6">
              <v-card-text class="text-center">
                <div v-if="showBalance" class="balance-display text-center mb-6">
                  <h2 class="text-h3 font-weight-bold">
                    У вас на счету: <span class="balance-amount">{{ formattedBalance }}</span>
                  </h2>
                </div>

                <v-row justify="center">
                  <v-col cols="12" sm="10">
                    <v-btn
                      color="success"
                      size="large"
                      @click="handleClick"
                      block
                      class="click-me-button"
                    >
                      <v-icon left>mdi-party-popper</v-icon>
                      Нажми меня
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      
      <!-- Canvas for confetti animation -->
      <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
    </v-main>

    <v-footer app class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} Vuetify Integration</div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import confetti from 'canvas-confetti'

const router = useRouter()

// Initial balance is 1,000,000 and increases by 500,000 with each click
const balance = ref(1000000)
const showBalance = ref(false) // Show balance only after first click

// Format the balance with thousand separators
const formattedBalance = computed(() => {
  return balance.value.toLocaleString('ru-RU') + '$'
})

const handleClick = () => {
  // Show balance after first click
  if (!showBalance.value) {
    showBalance.value = true
    // For the first click, just show the initial balance without incrementing
    balance.value = 1000000
  } else {
    // Increase balance by 500,000 on subsequent clicks
    balance.value += 500000
  }
  
  // Trigger sound effect
 playSoundEffect()
  
  // Trigger confetti animation
  triggerConfetti()
}

const playSoundEffect = () => {
  // Create audio context and generate a "moan" sound
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
 const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.type = 'sine'
  // Create a sound that starts low and increases in frequency (moaning effect)
  oscillator.frequency.setValueAtTime(100, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.8)

  // Control the volume to create a moaning effect
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8)

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.start()
 oscillator.stop(audioContext.currentTime + 0.8)
}

const triggerConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
    shapes: ['circle', 'square']
  })
}

const goToDemo = () => {
  router.push('/vuetify-demo')
}
</script>

<style lang="scss" scoped>
/* Vuetify provides its own styling, so we can keep minimal custom styles */
#app {
  font-family: 'Roboto', sans-serif;
}

.balance-display {
  .balance-amount {
    color: #4caf50;
    text-shadow: 0 8px rgba(76, 175, 80, 0.5);
  }
}

.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10000;
}

.click-me-button {
  font-size: 1.2rem;
  padding: 12px 24px;
}
</style>