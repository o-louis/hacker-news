<template>
    <div class="comment-detail" v-if="article.title">
        <h2 class="comment-detail__title">
            <a :href="article.url" target="__blank">
                {{article.title}} 
                <span>({{link(article.url)}})</span>
            </a>
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
</template>

<script>
import TimeAgo from 'vue2-timeago';
import { filterLink } from "../../utils/filter";

export default {
  name: 'Comments',
  components: {
      TimeAgo
  },
  props: {
      article: Object,
      comments: Array
  },
  methods: {
      link(url) {
        return filterLink(url);
      }
  }
}
</script>

<style lang="scss">
    @import './Comments.scss'
</style>
