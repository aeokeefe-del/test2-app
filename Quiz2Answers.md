## Q1

D



## Q2

Code snippet: 
// store/game.js
export const useGameStore = defineStore('game', {
  state: () => ({
    currentIndex: 0,
    score: 0,
    gameState: 'playing',
    lastAnswerCorrect: null // default (no answer yet)
  }),
  actions: {
    submitAnswer(index) {
      const isCorrect =
        index === this.questions[this.currentIndex].correct;

      this.lastAnswerCorrect = isCorrect; // update feedback state

      if (isCorrect) {
        this.score++;
      }
      this.nextQuestion();
    }
  }
});

Explanation: Adding lastAnswerCorrect to the store lets any component (like QuestionCard) read it directly without passing it down from App.vue. If it were passed as a prop, you’d have to thread it through intermediate components, causing prop drilling. By keeping it in the store, components stay more decoupled and focused, and state remains centralized and easier to manage.



## Q3

C




## Q4

Part A: The mistake is that App.vue is missing <router-view>. Vue Router can match the URL /play to GameView, but without <router-view>, it has nowhere in the template to actually render the matched route component. Instead, the template is manually showing GameView only when gameState === 'playing', which bypasses the router and prevents route-based rendering from controlling the page.

Part B: 
code snippet: 
<template>
  <div>
    <h1>QuizBlitz</h1>
    <router-view />
  </div>
</template>

<router-view> is the outlet where Vue Router renders the component that matches the current route. When the user navigates to /, it renders StartScreen; when they navigate to /play, it renders GameView. This replaces the manual v-if approach and lets routing determine which screen appears.

## Q5

B



## Q6

Explanation: The error occurs because after the last question, currentIndex is set to state.questions.length. Arrays are zero-indexed, so the last valid index is length - 1. Accessing state.questions[state.questions.length] returns undefined, and then trying to read currentQuestion.text throws an error.

code fix: 
nextQuestion() {
  if (this.currentIndex < this.questions.length - 1) {
    this.currentIndex++;
  } else {
    this.gameState = 'finished'; // or whatever end state you use
  }
}

reasoning: Fixing this in nextQuestion is better because it prevents the store from ever entering an invalid state. The getter should assume valid data; otherwise, you risk hiding bugs and spreading defensive checks across components.


## Q7

B


## Q8





## Q9

B



## Q10






