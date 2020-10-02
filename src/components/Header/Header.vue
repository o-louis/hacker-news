<template>
    <header>
        <!-- Logo -->
        <div class="logo-container">
            <div class="logo-container__icon">
                <span>Y</span>
            </div>
            <h1 class="logo-container__title">
                Hacker News
            </h1>
        </div>

        <!-- Nav -->
        <nav>
            <ul class="menu" >
                <li :class="[index === currentIndex ? 'menu__section selected' : 'menu__section']"
                    v-for="(item, index) in newSections"
                    :key="index" @click="changeSection(index)" >
                    <router-link to="/"> {{item.section}} </router-link>
                </li>
            </ul>
            <input type="text" placeholder="Search..." v-model="input" />
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        changeSection: Function,
        currentIndex: Number,
        sections: Array,
        getSearchResult: Function
    },
    data: function() {
        return {
            input: "",
            newSections: []
        }
    },
    watch: {
        input(val) {
            this.getSearchResult(val);
        }
    },
    mounted: function() {
        this.newSections = this.sections.filter((item, index) => index !== this.sections.length - 1 )
    }
}
</script>

<style lang="scss">
    @import './Header.scss'
</style>
