<template>
  <div id="app">
    <div class="title-wrap">
      <h1>The Isle Of Cats: Remote Edition</h1>
      <button @click="resetGame" class="reset">Reset Game</button>
    </div>
    <Boat />
    <div class="container">
      <div class="info-wrap">
        <ActiveLessons class="lessons" />
        <Specials class="specials" />
      </div>
      <div class="info-wrap second">
        <Notes />
        <Score />
      </div>
    </div>
  </div>
</template>

<script>
import Boat from "./components/Boat.vue";
import ActiveLessons from "./components/ActiveLessons.vue";
import Specials from "./components/Specials.vue";
import Notes from "./components/Notes.vue";
import Score from "./components/Score.vue";

export default {
  name: "App",
  components: {
    Boat,
    ActiveLessons,
    Specials,
    Notes,
    Score,
  },
  methods: {
    resetGame() {
      window.location.reload();
      this.$store.dispatch('newGame')
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f3f3f3;
  min-height: 100vh;
  padding: 32px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --var-green: #1fa13c;
  --var-green-dark: #0e7a26;
  --var-orange: #b67617;
  --var-purple: #8f4d99;
  --var-red: #ab303e;
  --var-red-dark: #8f1826;
  --var-blue: #68b3cc;
  --var-blue-dark: #3e98b6;
  --var-common: #929292;
  --var-rare: #e7be04;
}

button,
input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}

h1 {
  text-align: center;
  font-weight: 900;
  font-size: 3rem;
}

.title-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
}

.reset {
  position: absolute;
  right: 0;
  margin-left: 48px;
  background: var(--var-red);
  color: white;
  padding: 8px 16px;
  border: 0;
  font-size: 16px;
  border-radius: 100px;
  cursor: pointer;
  font-weight: bold;
}

.reset:hover {
  background: var(--var-red-dark);
}

.reset:focus {
  outline: none;
}

.info-wrap {
  display: grid;
  align-items: start;
  margin-top: 32px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
}

.info-wrap.second {
  align-items: stretch;
  grid-template-columns: repeat(2, 1fr);
}

.lessons {
  grid-column: span 2;
}
</style>
