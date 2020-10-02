<template>
  <main v-if="sections[currentIndex].data.length || search">
      <Posts :posts="search ? sections[5] : sections[currentIndex]" />
  </main>
</template>

<script>
import Posts from "../components/Posts/Posts";
import { fetchSections, fetchData } from "../api/index";

export default {
  name: 'Home',
  components: {
    Posts
  },
  props: {
    sections: Array,
    currentIndex: Number,
    search: Boolean
  },
  created(){
    fetchSections().then(data => {
      for (let i = 0; i < this.sections.length-1; i++) {
        const ids = data[i].slice(0, 30);
        fetchData(ids).then(response => {
          this.sections[i].ids = data[i];
          this.sections[i].data = response;
        });
      }
    })
  }
}
</script>
