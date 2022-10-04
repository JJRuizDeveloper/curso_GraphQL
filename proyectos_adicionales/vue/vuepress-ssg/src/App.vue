<template>
  <div id="app">
    <p-button bgColor="red" />
  </div>
</template>

<script>
import PButton from './components/PButton.vue'

export default {
  name: 'app',
  components: {
    PButton
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
