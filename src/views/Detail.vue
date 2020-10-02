<template>
    <main>
        <Comments  v-if="article && comments.length" :article="article" :comments="comments" />
        <div v-if="err" class="detail-not-found">Sorry item not found</div>
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
          comments: [],
          err: false
      }
  },
  created() {
    fetchId(this.id).then(response => {
        this.article = response;
        fetchData(response.kids).then(data => {
            this.comments = data;
        });
    }).catch(err => {
        this.err=true;
        console.error(err);
    });
  }
}
</script>