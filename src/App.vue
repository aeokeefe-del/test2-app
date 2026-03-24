<script>
import QuestionCard from "./components/QuestionCard.vue";
//import ScoreBoard from "./components/ScoreBoard.vue";

export default {
  name: "App",

  components: {
    QuestionCard,
    //ScoreBoard
  },

  data() {
  return {
    testQuestion: {
      question: "What does CSS stand for?",
      answers: ["Cascading Style Sheets", "Computer Style System", "Creative Sheet Syntax", "Coded Style Script"],
      correct: 0
    }
  }
}
};
</script>

<template>
  <QuestionCard :question="testQuestion" />
</template>
