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
                    v-for="(item, index) in sections"
                    :key="index" @click="changeSection(index)">
                    <router-link to="/"> {{item.section}} </router-link>
                </li>
            </ul>
            <input type="text" placeholder="Search..." />
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        changeSection: Function,
        currentIndex: Number,
        sections: Array
    },
}
</script>

<style lang="scss">
    @import './Header.scss'
</style>
