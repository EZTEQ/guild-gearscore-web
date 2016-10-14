import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeView from '../views/HomeView';
import GuildView from '../views/GuildView';
import GuildNotFoundView from '../views/GuildNotFoundView';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/guild/:realm/:guild', name: 'Guild', component: GuildView },
    { path: '/guild/not-found', name: 'GuildNotFound', component: GuildNotFoundView },
    { path: '*', redirect: '/' },
];

export default new VueRouter({
    routes,
});
