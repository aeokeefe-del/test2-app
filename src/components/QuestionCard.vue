<template>
  <div class="question-card">
    <div class="question-header">
      <span class="question-label">
        QUESTION {{ store.progress.current }} / {{ store.progress.total }}
      </span>

      <div class="timer-bar-wrap">
        <div
          class="timer-bar-fill"
          :style="{ width: timerPercent + '%' }"
          :class="timerBarClass"
        />
      </div>

      <span class="timer-value" :class="{ 'timer-value--urgent': timeLeft <= 5 }">
        {{ timeLeft }}s
      </span>
    </div>

    <p class="question-text">{{ store.currentQuestion.question }}</p>

    <div class="answers">
      <button
        v-for="(answer, index) in store.currentQuestion.answers"
        :key="index"
        :disabled="store.selectedAnswer !== null"
        :class="[
          'answer-btn',
          {
            correct: store.selectedAnswer !== null && index === store.currentQuestion.correct,
            wrong:   store.selectedAnswer === index && index !== store.currentQuestion.correct,
            idle:    store.selectedAnswer === null,
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useGameStore } from '../stores/useGameStore.js'

const TIMER_SECONDS = 5

export default {
  name: 'QuestionCard',

  setup() {
    const store = useGameStore()
    const letters = ['A', 'B', 'C', 'D']

    // ── Timer state ──────────────────────────────────────────
    const timeLeft = ref(TIMER_SECONDS)
    let timerId = null

    function startTimer() {
      stopTimer()
      timeLeft.value = TIMER_SECONDS
      timerId = setInterval(() => {
        if (timeLeft.value > 0) {
          timeLeft.value--
        } else {
          // Time's up — submit -1 (never matches a valid answer index)
          handleAnswer(-1)
        }
      }, 1000)
    }

    function stopTimer() {
      if (timerId !== null) {
        clearInterval(timerId)
        timerId = null
      }
    }

    // ── Answer handler ───────────────────────────────────────
    function handleAnswer(index) {
      stopTimer()
      store.submitAnswer(index)
      // Give QuestionCard 1 s to show correct/wrong highlight,
      // then tell the store to advance — keeping setTimeout out of the store.
      setTimeout(() => {
        store.nextQuestion()
        // nextQuestion() resets selectedAnswer, so restart timer for the new question
        // unless the game just ended
        if (store.gameState === 'playing') {
          startTimer()
        }
      }, 1000)
    }

    // ── Restart timer whenever the question index changes ────
    // (covers edge cases like external resets)
    watch(
      () => store.currentIndex,
      () => {
        if (store.gameState === 'playing') startTimer()
      }
    )

    onMounted(startTimer)
    onUnmounted(stopTimer) // always clean up on unmount

    // ── Computed helpers for the template ───────────────────
    const timerPercent = computed(() => (timeLeft.value / TIMER_SECONDS) * 100)

    const timerBarClass = computed(() => {
      if (timeLeft.value > 10) return 'bar--safe'
      if (timeLeft.value > 5)  return 'bar--warn'
      return 'bar--danger'
    })

    return {
      store,
      letters,
      timeLeft,
      timerPercent,
      timerBarClass,
      handleAnswer,
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500&display=swap');

.question-card {
  font-family: 'Barlow', sans-serif;
  background: #0f1117;
  border: 2px solid #2a2d3a;
  border-radius: 16px;
  padding: 2rem;
  max-width: 680px;
  margin: 0 auto;
  box-shadow: 0 0 0 1px #1e2130, 0 24px 64px rgba(0,0,0,0.6);
}

/* ── Header row ───────────────────────────────────────────── */
.question-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.question-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #4a90e2;
  white-space: nowrap;
}

/* ── Timer bar ────────────────────────────────────────────── */
.timer-bar-wrap {
  height: 4px;
  background: #2a2d3a;
  border-radius: 99px;
  overflow: hidden;
}

.timer-bar-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 1s linear, background 0.3s;
}

.bar--safe   { background: #22c55e; }
.bar--warn   { background: #f59e0b; }
.bar--danger { background: #ef4444; }

.timer-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #8892b0;
  white-space: nowrap;
  transition: color 0.3s;
}

.timer-value--urgent { color: #ef4444; }

/* ── Question text ────────────────────────────────────────── */
.question-text {
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.5;
  color: #f0f2f8;
  margin-bottom: 1.75rem;
}

/* ── Answer grid ──────────────────────────────────────────── */
.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

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
}

.answer-btn.idle:hover:not(:disabled) {
  background: #1e2235;
  border-color: #4a90e2;
  transform: translateY(-2px);
}

.answer-btn:disabled { cursor: not-allowed; }

.answer-letter {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
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

.answer-text {
  font-size: 0.975rem;
  font-weight: 500;
  color: #c8cfe0;
  line-height: 1.35;
}

.answer-btn.correct {
  background: #0d2b1a;
  border-color: #22c55e;
  animation: pulse-correct 0.35s ease;
}
.answer-btn.correct .answer-letter { background: #22c55e; color: #fff; }
.answer-btn.correct .answer-text   { color: #86efac; }

.answer-btn.wrong {
  background: #2b0d0d;
  border-color: #ef4444;
  animation: shake 0.35s ease;
}
.answer-btn.wrong .answer-letter { background: #ef4444; color: #fff; }
.answer-btn.wrong .answer-text   { color: #fca5a5; }

@keyframes pulse-correct {
  0%  { transform: scale(1); }
  40% { transform: scale(1.03); }
  100%{ transform: scale(1); }
}

@keyframes shake {
  0%  { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-4px); }
  100%{ transform: translateX(0); }
}

@media (max-width: 480px) {
  .answers { grid-template-columns: 1fr; }
  .question-text { font-size: 1.15rem; }
}
</style>