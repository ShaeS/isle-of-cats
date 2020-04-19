<template>
  <div class="card">
    <h2>Scoring</h2>
    <div class="scoring-wrap">
      <div>
        <div v-for="score in scores" :key="score.label" class="score">
          <input type="text" v-model="score.value" />
          <p>{{ score.label }}</p>
        </div>
      </div>
      <div class="right">
        <div>
          <h3>Families</h3>
          <ul class="list">
            <li>3 = 8</li>
            <li>4 = 11</li>
            <li>5 = 15</li>
            <li>6 = 20</li>
            <li>7 = 25</li>
            <li>8 = 30</li>
            <li>9 = 35</li>
            <li>10 = 40</li>
          </ul>
        </div>
        <div>
          <h3>Total</h3>
          <p class="total">{{ total }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    scores: {
      get() {
        return this.$store.state.scores;
      },
      set(value) {
        this.$store.commit("updateScores", value);
      },
    },
    total() {
      return this.scores.reduce((acc, cur) => {
        if (!isNaN(+cur.value)) {
          return acc + +cur.value;
        } else {
          return acc;
        }
      }, 0);
    },
  },
};
</script>

<style scoped>
.card {
  border-left: 6px solid var(--var-green);
  border-radius: 3px;
  padding: 24px 32px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

h2 {
  margin-bottom: 12px;
}

.scoring-wrap {
  display: flex;
}

.scoring-wrap > div {
  flex: 1;
}

.scoring-wrap > div:first-child {
  flex: 2;
}

.score {
  display: flex;
  align-items: center;
  padding: 6px 0;
}

.score p {
  font-size: 18px;
  font-weight: bold;
  margin-left: 12px;
}

.score input {
  text-align: center;
  width: 68px;
  border-radius: 3px;
  border: 0;
  padding: 8px 12px;
  font-size: 18px;
  background: rgb(243, 243, 243);
}

h3 {
  display: inline-block;
  border-bottom: 2px solid #777;
  margin-bottom: 12px;
}

.list {
  list-style-type: none;
}

.list li {
  padding: 2px 0;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.total {
  color: var(--var-green);
  font-size: 60px;
  line-height: 1;
  font-weight: 900;
}
</style>
