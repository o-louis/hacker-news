<template>
    <div class="posts-container" v-if="data.length">

        <div class="posts-container__item" v-for="(item, index) in data" :key="index">
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

    const TOP_STORIES = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
    const STORY = "https://hacker-news.firebaseio.com/v0/item/:id.json?print=pretty"
    const LIMIT_STORIES = 30;

    export default {
        name: 'Posts',
        components: {
            TimeAgo
        },
        data() {
            return {
                allStoriesIDs: [],
                data: []
            }
        },
        async created() {
            this.fetchTopStories().then(data => {
                this.data = data;
            });
        },
        methods: {
            async fetchTopStories() {
                // Retrieve top stories ids
                const response = await fetch(TOP_STORIES);
                const data = await response.json();
                this.allStoriesIDs = data;

                // Retrieve data for every id
                const storiesIDs = data.slice(0, LIMIT_STORIES);
                const stories = Promise.all(
                    storiesIDs.map(async (item) => {
                        let url = STORY.replace(':id', item);
                        const storyResponse = await fetch(url);
                        const storyData = await storyResponse.json();
                        return storyData;
                    })
                )
                return stories;
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

    /*

    */
</script>

<style lang="scss">
    @import './Posts.scss'
</style>
