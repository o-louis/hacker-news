<template>
  <div id="app">
    <Header />
    <main>
      <Posts />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";

export default {
  name: 'App',
  components: {
    Header,
    Posts
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-Box;
    font-family: Roboto;
    list-style: none;
    text-decoration: none;
  }

  body {
    font-size: 62.5%;
  }

  #app {
    position: relative;
  }

  main {
    padding: 130px 1em 0px;
  }
</style>
