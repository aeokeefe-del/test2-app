<script>
import { questions } from './questions.js';
import QuestionCard from "./components/QuestionCard.vue";
import ScoreBoard from "./components/ScoreBoard.vue";

export default {
  name: "App",

  components: {
    QuestionCard,
    //ScoreBoard
  },

  data() {
    return {
      questions,
      currentIndex: 0,
      score: 0,
      gameState: 'playing', // "start" / "playing" / "end"
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
  },
};
//<QuestionCard :question="testQuestion" />
</script>

<template>
  <div v-if="currentState == 'playing'">
    <QuestionCard :question="currentQuestion" @answer="onAnswer" />
  </div>
  <div v-else-if ="currentState == 'end'">
    <ScoreBoard/>
  </div>
</template>
