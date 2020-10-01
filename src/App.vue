<template>
  <div id="app">
    <Header 
      :changeSection="changeSection"
      :currentIndex="currentIndex"
      :sections="sections"
    />

    <main v-if="sections[currentIndex].data.length">
      <Posts :posts="sections[currentIndex]" />
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
  },
  data() {
    return {
      sections: [
        {
          section: "home",
          ids: [],
          data: [],
          selected: true
        },
        {
          section: "new",
          ids: [],
          data: [],
          selected: false
        },
        {
          section: "ask",
          ids: [],
          data: [],
          selected: false
        },
        {
          section: "show",
          ids: [],
          data: [],
          selected: false
        },
        {
          section: "jobs",
          ids: [],
          data: [],
          selected: false
        }
      ],
      currentIndex: 0
    }
  },
  created(){
    const homeStories = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    const newStories = "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
    const ask = "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty";
    const show = "https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty";
    const jobs = "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty";

    Promise.all([
      fetch(homeStories).then(res => res.ok && res.json() || Promise.reject(res)),
      fetch(newStories).then(res => res.ok && res.json() || Promise.reject(res)),
      fetch(ask).then(res => res.ok && res.json() || Promise.reject(res)),
      fetch(show).then(res => res.ok && res.json() || Promise.reject(res)),
      fetch(jobs).then(res => res.ok && res.json() || Promise.reject(res))
    ]).then(data => {
      for (let i = 0; i < this.sections.length; i++) {
        const ids = data[i].slice(0, 30);
        this.getData(ids).then(response => {
          this.sections[i].ids = data[i];
          this.sections[i].data = response;
        });
      }
    });
  },
  methods: {
    getData(ids) {
      const STORY = "https://hacker-news.firebaseio.com/v0/item/:id.json?print=pretty"
      const data = Promise.all(
          ids.map(async (item) => {
              let url = STORY.replace(':id', item);
              const storyResponse = await fetch(url);
              const storyData = await storyResponse.json();
              return storyData;
          })
      )
      return data;
    },
    changeSection(index) {
      this.currentIndex = index;
    },
    getSelectedSection() {
      return this.sections.findIndex((section) => section.selected === true);
    },

  },
  watch: {
    currentIndex: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        if (oldVal) this.sections[oldVal].selected = false;
        if (newVal) this.sections[newVal].selected = true;
      }
    }
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
