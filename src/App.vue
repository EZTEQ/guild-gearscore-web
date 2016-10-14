<template>
    <div id="app">
        <div class="ui container" id="navigation">
            <div class="ui large secondary pointing menu">
                <span class="active item">Guild GearScore</span>
                <div class="right menu">
                    <router-link class="item" to="/" v-if="this.$route.path != '/'">Go back to start</router-link>
                </div>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<style>
    .hidden {
        display: none !important;
    }
    #navigation {
        margin-bottom: 12px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .2s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>
<style src="semantic-ui-css/components/reset.min.css"></style>
<style src="semantic-ui-css/components/site.min.css"></style>
<style src="semantic-ui-css/components/container.min.css"></style>
<style src="semantic-ui-css/components/menu.min.css"></style>
