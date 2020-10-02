<template>
    <main v-if="article && comments.length">
        <Comments :article="article" :comments="comments" />
    </main>
</template>

<script>
import Comments from '../components/Comments/Comments';
import { fetchId, fetchData } from '../api/index';

export default {
  name: 'Detail',
  props: {
      id: String,
  },
  components: {
    Comments
  },
  data: function () {
      return {
          article: {},
          comments: []
      }
  },
  created() {
    fetchId(this.id).then(response => {
        this.article = response;
        fetchData(response.kids).then(data => {
            this.comments = data;
        });
    })
  }
}
</script>