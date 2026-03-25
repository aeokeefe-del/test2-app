<template>
  <div>
    <h2 class="score">Your score: {{ score }} / 10</h2>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    score: {
      type: Number,
      required: true
    }
  }
};

</script>