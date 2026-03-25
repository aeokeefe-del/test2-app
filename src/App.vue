<script>
import { questions } from './questions.js';
import QuestionCard from "./components/QuestionCard.vue";
import ScoreBoard from "./components/ScoreBoard.vue";
import router from './router/index.js';

export default {
  name: "App",

  components: {
    QuestionCard,
    ScoreBoard
  },

  data() {
    return {
      questions,
      currentIndex: 0,
      score: 0,
      gameState: 'start', // "start" / "playing" / "end"
      //testQuestion: {
        //question: "What does CSS stand for?",
        //answers: ["Cascading Style Sheets", "Computer Style System", "Creative Sheet Syntax", "Coded Style Script"],
       // correct: 0
      //}
    }
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    },

    currentState() {
      if (this.currentIndex >= this.questions.length) {
        this.gameState = 'end';
      }
      return this.gameState;
    },
  },

  methods: {
    onAnswer(isCorrect) {
      if (isCorrect) this.score++;
      this.currentIndex++;
    },
    buttonPressed() {
      this.gameState = 'playing';
      router.push('/play');
    }
  },
};
</script>

<template>
  <RouterView />
  <div v-if="currentState === 'start'">
    <h1>Welcome to the Quiz Game!</h1>
    <button @click="buttonPressed">Start Game</button>
  </div>
</template>
