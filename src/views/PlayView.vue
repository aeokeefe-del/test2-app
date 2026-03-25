<template>
  <div class="play-view">
    <div v-if="isFinished">
      <ScoreBoard :score="score" :total="questions.length" />
      <button @click="resetGame">Play Again</button>
    </div>
    <div v-else>
      <QuestionCard :key="currentIndex" :question="currentQuestion" @answer="onAnswer" />
    </div>
  </div>
</template>

<script>
import QuestionCard from "../components/QuestionCard.vue";
import ScoreBoard from "../components/ScoreBoard.vue";
import { questions } from "../questions";

export default {
  name: "PlayView",

  components: {
    QuestionCard,
    ScoreBoard,
  },

  data() {
    return {
      questions,
      currentIndex: 0,
      score: 0,
    };
  },

  computed: {
    // Derived from questions + currentIndex — no need for a separate prop or state field
    currentQuestion() {
      return this.questions[this.currentIndex];
    },

    // Replaces getCurrentState() — no side effects, safe to use in the template
    isFinished() {
      return this.currentIndex >= this.questions.length;
    },
  },

  methods: {
    onAnswer(isCorrect) {
      // Handle the game loop here — this component owns score and currentIndex
      if (isCorrect) this.score++;
      this.currentIndex++;
    },

    resetGame() {
      // Fix: was writing to this.gameState (undefined) instead of resetting owned data
      this.currentIndex = 0;
      this.score = 0;
    },
  },
};
</script>