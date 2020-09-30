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
            <ul class="menu">
                <li class="menu__section selected">Home</li>
                <li class="menu__section">New</li>
                <li class="menu__section">Comments</li>
                <li class="menu__section">Ask</li>
                <li class="menu__section">Show</li>
                <li class="menu__section">Jobs</li>
            </ul>
            <input type="text" placeholder="Search..." />
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss">
    @import './Header.scss'
</style>
