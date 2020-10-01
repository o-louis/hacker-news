<template>
    <main>
        <div class="comment-detail" v-if="article.title">
            <h2 class="comment-detail__title">
                <a :href="article.url" target="__blank">{{article.title}} <span>({{getBaseUrlLink(article.url)}})</span></a>
            </h2>
            <p class="comment-detail__infos">
                <span class="comment-detail__points">
                    {{article.score}} points
                </span>
                by {{article.by}} 
                <time-ago :datetime="new Date(article.time * 1000)" long />
                <span v-if="article.descendants" > | {{article.descendants}} comments</span>
            </p>

            <div class="comment-detail-container">
                <h4>Comments</h4>
                <div class="comments-list">
                    <div class="comments-list__item" v-for="item in comments" :key="item.id">
                        <div class="comments-list__author">
                            <span>{{item.by}}</span>
                            <div class="comments-list__time">
                                <time-ago :datetime="new Date(item.time * 1000)" long />
                            </div>
                        </div>

                        <div class="comments-list__description" v-html="item.text" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import TimeAgo from 'vue2-timeago';
const COMMENT_DETAIL = "https://hacker-news.firebaseio.com/v0/item/:id.json?print=pretty"
export default {
  name: 'CommentDetail',
  props: {
      id: String,
  },
  components: {
    TimeAgo
  },
  data: function () {
      return {
          article: {},
          comments: []
      }
  },
  created() {
    this.getData().then(response => {
        this.article = response;

        console.log(response)
        this.getComments(response.kids).then(data => {
            this.comments = data;
        })
    })
  },
  methods: {
      async getComments(ids) {
        const data = Promise.all(
            ids.map(async (item) => {
                let url = COMMENT_DETAIL.replace(':id', item);
                const storyResponse = await fetch(url);
                const storyData = await storyResponse.json();
                return storyData;
            })
        )
        return data;
      },

      async getData() {
        const url = COMMENT_DETAIL.replace(':id', this.id)
        const response = await fetch(url);
        const data = await response.json();
        return data;
      },
      getBaseUrlLink(url) {
        let baseUrl = url;
        if (url) {
            baseUrl = url.split('/')[2];
            baseUrl = baseUrl.split('www.');
            baseUrl = baseUrl.slice(baseUrl.length-1)[0];
        }
        return baseUrl;
      }
  }
}
</script>

<style lang="scss">
$orange: #FF6600;
$black: black;
$grey: #9B9B9B;
$white: #FFFFFF;
$lightgrey: #eeeeee;

.comment-detail {
    
    &__title {
        text-align: center;
        padding: 20px 0px 10px;
        font-size: 1.9em;
        a {
            color: black;
        }
        span {
            font-size: 0.7em;
        }
    }

    &__infos {
        font-size: 1.1em;
    }

    &-container {
        padding-top: 20px;
        h4 {
            font-size: 1.8em;
            color: $orange;
        }
    }

    .comments-list {
        margin-top: 10px;
        grid-row-gap: 10px;
        width: 100%;
        &__item {
            padding: 10px;
            margin-bottom: 10px;
            font-size: 1.4em;
            background-color:$lightgrey;
            width: 100%;
        }

        &__author {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 0.8em;
            & > span {
                font-weight: bold;
            }
        }

        &__description {
            font-size: 1.1em;
            width: 100%;
            overflow-wrap: break-word;
            line-height: 1.25;
        }
    }

    .v-time-ago__text {
        color: unset;
        font-size: unset;
        font-family: unset;
    }
}

</style>
