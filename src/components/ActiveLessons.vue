<template>
  <div class="card">
      <h2>Active Lessons</h2>
      <div class="lesson-list">
          <p>Pick a colour. 1 point per cat of the chosen colour touching the edge of your boat.</p>
          <p>Pick a colour. 1 point per cat of the chosen colour touching the edge of your boat.</p>
          <p>Pick a colour. 1 point per cat of the chosen colour touching the edge of your boat.</p>
          <p>Pick a colour. 1 point per cat of the chosen colour touching the edge of your boat.</p>
          <p>Pick a colour. 1 point per cat of the chosen colour touching the edge of your boat.</p>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.card {
    border-left: 6px solid var(--var-blue);
    border-radius: 3px;
    padding: 24px 32px;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
}

h2 {
    margin-bottom: 8px;
}

.lesson-list {
    column-count: 2;
}

.lesson-list p {
    padding: 8px 0;
}

.lesson-list p:before {
    content: "";
    display: inline-block;
    background: var(--var-blue);
    border-radius: 50%;
    height: 10px;
    width: 10px;
    margin-right: 8px;
}
</style>
