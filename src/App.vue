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

        <router-view></router-view>
    </div>
</template>

<style src="semantic-ui-css/semantic.min.css"></style>
