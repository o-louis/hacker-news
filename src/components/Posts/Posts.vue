<template>
    <div class="posts-container" v-if="posts.data.length">

        <div class="posts-container__item" v-for="(item, index) in posts.data" :key="index">
            <div class="posts-container__rank">{{index+1}}</div>
            <div class="posts-container__infos">
                <div class="posts-container__row">
                    <a :href="item.url" target="__blank" class="posts-container__title">
                        {{item.title}}
                        <span class="posts-container__link" v-if="item.url">({{link(item.url)}})</span>
                    </a>
                </div>

                <div class="posts-container__row">
                    <p>  
                        <span class="posts-container__points">
                            {{item.score}} points
                        </span>
                        by {{item.by}} 
                        <time-ago :datetime="new Date(item.time * 1000)" long />
                        <span v-if="item.descendants" > |</span>
                        <router-link
                            v-if="item.descendants" 
                            :to="{  name: 'Detail', 
                                    path: `/item/${item.id}`,
                                    params: { id: `${item.id}` }}">
                                     {{item.descendants}} comments
                          </router-link>
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    import TimeAgo from 'vue2-timeago';
    import { filterLink } from "../../utils/filter";

    export default {
        name: 'Posts',
        components: {
            TimeAgo
        },
        props: {
            posts: Object
        },
        methods: {
            link(url) {
                return filterLink(url)
            }
        }
    }
</script>

<style lang="scss">
    @import './Posts.scss'
</style>
