import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomeView from '../views/HomeView.vue';
import GuildView from '../views/GuildView.vue';
import GuildNotFoundView from '../views/GuildNotFoundView.vue';

var routes = [
    { path: '/', component: HomeView },
    { path: '/guild/:realm/:guild', component: GuildView },
    { path: '/guild/not-found', component: GuildNotFoundView },
    { path: '*', redirect: '/' }
];

export default new VueRouter({
    routes
});