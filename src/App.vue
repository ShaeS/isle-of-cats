<template>
  <div id="app">
    <Boat />
  </div>
</template>

<script>
import Boat from './components/Boat.vue'

export default {
  name: 'App',
  components: {
    Boat
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
