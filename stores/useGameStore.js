import { defineStore } from 'pinia'
import { questions as questionBank } from '../questions.js'

export const useGameStore = defineStore('game', {

  state: () => ({
    questions: [],
    currentIndex: 0,
    score: 0,
    gameState: 'start',   // 'start' | 'playing' | 'end'
    selectedAnswer: null, // index of the button the player clicked, or null
  }),

  getters: {
    currentQuestion: (state) => state.questions[state.currentIndex],

    isLastQuestion: (state) => state.currentIndex >= state.questions.length - 1,

    progress: (state) => ({
      current: state.currentIndex + 1,
      total: state.questions.length,
    }),
  },

  actions: {
    startGame() {
      this.questions = [...questionBank]
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'playing'
      this.selectedAnswer = null
    },

    submitAnswer(answerIndex) {
      if (this.selectedAnswer !== null) return
      this.selectedAnswer = answerIndex
      const isCorrect = answerIndex === this.currentQuestion.correct
      if (isCorrect) this.score++
    },

    nextQuestion() {
      this.selectedAnswer = null
      if (this.isLastQuestion) {
        this.gameState = 'end'
      } else {
        this.currentIndex++
      }
    },

    resetGame() {
      this.questions = []
      this.currentIndex = 0
      this.score = 0
      this.gameState = 'start'
      this.selectedAnswer = null
    },
  },
})