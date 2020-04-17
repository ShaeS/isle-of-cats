<template>
  <div id="app">
    <h1>The Isle Of Cats: Remote Edition</h1>
    <Boat />
    <div class="container">
      <div class="info-wrap">
        <ActiveLessons class="lessons" />
        <Specials class="specials" />
      </div>
    </div>
  </div>
</template>

<script>
import Boat from "./components/Boat.vue";
import ActiveLessons from "./components/ActiveLessons.vue";
import Specials from "./components/Specials.vue";

export default {
  name: "App",
  components: {
    Boat,
    ActiveLessons,
    Specials,
  },
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
  --var-green: rgb(31, 161, 60);
  --var-orange: rgb(182, 118, 23);
  --var-purple: rgb(143, 77, 153);
  --var-red: rgb(171, 48, 62);
  --var-blue: rgb(104, 179, 204);
  --var-common: rgb(243, 216, 128);
  --var-rare: rgb(231, 190, 4);
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
  margin-bottom: 48px;
}

.info-wrap {
  display: grid;
  align-items: start;
  margin-top: 32px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
}

.lessons {
  grid-column: span 2;
}
</style>
