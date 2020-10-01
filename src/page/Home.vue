<template>
  <main v-if="sections[currentIndex].data.length">
      <Posts :posts="sections[currentIndex]" />
  </main>
</template>

<script>
import Posts from "../components/Posts/Posts";
export default {
  name: 'Home',
  components: {
    Posts
  },
  props: {
    sections: Array,
    currentIndex: Number
  }
}
</script>

<style lang="scss">
</style>
