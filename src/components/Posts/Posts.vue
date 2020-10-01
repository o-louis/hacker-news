<template>
    <div class="posts-container" v-if="posts.data.length">

        <div class="posts-container__item" v-for="(item, index) in posts.data" :key="index">
            <div class="posts-container__rank">{{index+1}}</div>
            <div class="posts-container__infos">
                <div class="posts-container__row">
                    <a :href="item.url" target="__blank" class="posts-container__title">
                        {{item.title}}
                        <span class="posts-container__link" >({{getBaseUrlLink(item.url)}})</span>
                    </a>
                </div>

                <div class="posts-container__row">
                    <p>  
                        <span class="posts-container__points">
                            {{item.score}} points
                        </span>
                        by {{item.by}} 
                        <time-ago :datetime="new Date(item.time * 1000)" long />
                        | {{item.descendants}} comments
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
    import TimeAgo from 'vue2-timeago';

    export default {
        name: 'Posts',
        components: {
            TimeAgo
        },
        props: {
            posts: Object
        },
        methods: {
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
    @import './Posts.scss'
</style>
