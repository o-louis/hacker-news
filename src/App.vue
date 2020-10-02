<template>
  <div id="app">
    <Header 
      :changeSection="changeSection"
      :currentIndex="currentIndex"
      :sections="sections"
      :getSearchResult="getSearchResult"
    />

    <router-view
      :sections="sections"
      :currentIndex="currentIndex"
      :search="sections[5].active"
    ></router-view>
  </div>
</template>

<script>
import Header from "./components/Header/Header";

import { fetchSearch } from "./api/index";

export default {
  name: 'App',
  components: {
    Header
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
        },
        {
          section: "search",
          active: false,
          data: [],
          ids: []
        }
      ],
      currentIndex: 0
    }
  },
  methods: {
    changeSection(index) {
      this.currentIndex = index;
    },
    getSearchResult(input) {
      if (input.length >= 2) {
        fetchSearch(input).then(data => {
          this.sections[5].active = true;
          this.sections[5].data = data;
        });
      } else if (input.length === 0) {
        this.sections[5].active = false;
      }
    }
  },
  watch: {
    currentIndex: {
      immediate: true,
      handler(newIndew, oldIndex) {
        if (oldIndex) this.sections[oldIndex].selected = false;
        if (newIndew) this.sections[newIndew].selected = true;
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
    font-family: 'Roboto';
    list-style: none;
    text-decoration: none;
  }

  body {
    font-size: 62.5%;
  }

  a {
    color: inherit;
  }

  #app {
    position: relative;
  }

  main {
    padding: 130px 1em 0px;
    max-width: 1100px;
    @media (min-width: 480px) {
        width: 80%;
        margin: 0 auto;
    }
    @media (min-width: 768px) {
        padding-top: 110px;
    }

    .detail-not-found {
      font-size: 1.8em;
      padding: 50px 0;
      margin-top: 20px;
      color: #9B9B9B;
      background-color: #eeeeee;
      text-align: center;
    }
  }
</style>
