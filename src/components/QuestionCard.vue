<template>
  <div class="question-card">
    <div class="question-header">
      <span class="question-label">QUESTION</span>
      <p class="question-text">{{ question.question }}</p>
    </div>

    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :disabled="answered"
        :class="[
          'answer-btn',
          `answer-btn--${letters[index]}`,
          {
            correct: resultState !== null && index === question.correct,
            wrong: resultState === 'wrong' && index === selectedIndex,
            idle: resultState === null,
          },
        ]"
        @click="handleAnswer(index)"
      >
        <span class="answer-letter">{{ letters[index] }}</span>
        <span class="answer-text">{{ answer }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',

  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  emits: ['answer'],

  data() {
    return {
      answered: false,
      selectedIndex: null,
      resultState: null,
      letters: ['A', 'B', 'C', 'D'],
    };
  },

  methods: {
    handleAnswer(index) {
      if (this.answered) return;

      const isCorrect = index === this.question.correct;

      this.answered = true;
      this.selectedIndex = index;
      this.resultState = isCorrect ? 'correct' : 'wrong';

      setTimeout(() => {
        this.$emit('answer', isCorrect);
        this.reset();
      }, 1000);
    },

    reset() {
      this.answered = false;
      this.selectedIndex = null;
      this.resultState = null;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500&display=swap');

/* ── Card shell ───────────────────────────────────────────── */
.question-card {
  font-family: 'Barlow', sans-serif;
  background: #0f1117;
  border: 2px solid #2a2d3a;
  border-radius: 16px;
  padding: 2rem;
  max-width: 680px;
  margin: 2rem auto;
  box-shadow:
    0 0 0 1px #1e2130,
    0 24px 64px rgba(0, 0, 0, 0.6);
}

/* ── Question header ──────────────────────────────────────── */
.question-header {
  margin-bottom: 1.75rem;
}

.question-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #4a90e2;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.6rem;
}

.question-text {
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.5;
  color: #f0f2f8;
  margin: 0;
}

/* ── Answer grid ──────────────────────────────────────────── */
.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

/* ── Base button ──────────────────────────────────────────── */
.answer-btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.9rem 1.1rem;
  background: #181b26;
  border: 2px solid #2a2d3a;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
  position: relative;
  overflow: hidden;
}

.answer-btn.idle:hover:not(:disabled) {
  background: #1e2235;
  border-color: #4a90e2;
  transform: translateY(-2px);
}

.answer-btn:disabled {
  cursor: not-allowed;
}

/* ── Letter badge ─────────────────────────────────────────── */
.answer-letter {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #2a2d3a;
  color: #8892b0;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}

.answer-btn.idle:hover:not(:disabled) .answer-letter {
  background: #4a90e2;
  color: #fff;
}

/* ── Answer label ─────────────────────────────────────────── */
.answer-text {
  font-size: 0.975rem;
  font-weight: 500;
  color: #c8cfe0;
  line-height: 1.35;
  transition: color 0.15s;
}

.answer-btn.idle:hover:not(:disabled) .answer-text {
  color: #f0f2f8;
}

/* ── Correct state ────────────────────────────────────────── */
.answer-btn.correct {
  background: #0d2b1a;
  border-color: #22c55e;
  animation: pulse-correct 0.35s ease;
}

.answer-btn.correct .answer-letter {
  background: #22c55e;
  color: #fff;
}

.answer-btn.correct .answer-text {
  color: #86efac;
}

/* ── Wrong state ──────────────────────────────────────────── */
.answer-btn.wrong {
  background: #2b0d0d;
  border-color: #ef4444;
  animation: shake 0.35s ease;
}

.answer-btn.wrong .answer-letter {
  background: #ef4444;
  color: #fff;
}

.answer-btn.wrong .answer-text {
  color: #fca5a5;
}

/* ── Animations ───────────────────────────────────────────── */
@keyframes pulse-correct {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.03); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%   { transform: translateX(0); }
  25%  { transform: translateX(-6px); }
  50%  { transform: translateX(5px); }
  75%  { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 480px) {
  .answers {
    grid-template-columns: 1fr;
  }

  .question-text {
    font-size: 1.15rem;
  }
}
</style>