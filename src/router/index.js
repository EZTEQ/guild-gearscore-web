import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomeView from '../views/HomeView.vue';
import GuildView from '../views/GuildView.vue';
import GuildNotFoundView from '../views/GuildNotFoundView.vue';

var routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/guild/:realm/:guild', name: 'Guild', component: GuildView },
    { path: '/guild/not-found', name: 'GuildNotFound', component: GuildNotFoundView },
    { path: '*', redirect: '/' }
];

export default new VueRouter({
    routes
});