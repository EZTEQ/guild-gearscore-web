<template>
    <div id="app">
        <div class="container mw-900 mt-10 mb-10" id="navigation" v-if="this.$route.path != '/'">
            <div class="navbar">
                <section class="navbar-primary">
                    <figure class="avatar mr-10" data-initial="GGS" style="background-color: #5764c6;"></figure>
                    Guild GearScore
                </section>
                <section class="navbar-section">
                    <router-link class="btn btn-link" to="/">Go back to start</router-link>
                </section>
            </div>
        </div>
            <router-view></router-view>
    </div>
</template>
    
<style>
    .hidden {
        display: none !important;
    }
    .mw-900 {
        max-width: 900px;
    }
    .mw-400 {
        max-width: 400px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .fluid {
        width: 100%
    }
    .mb-0 {
        margin-bottom: 0;
    }
</style>
<style src="spectre.css/dist/spectre.min.css" />
<style src="spectre.css/dist/spectre-exp.min.css" />
