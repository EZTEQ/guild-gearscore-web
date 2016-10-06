var Vue = require('vue/dist/vue.js');
var VueRouter = require('vue-router');

Vue.use(VueRouter);

var routes = [
    { path: '/', component: require('../views/HomeView') },
    { path: '/guild/:realm/:guild', component: require('../views/GuildView') },
    { path: '/guild/not-found', component: require('../views/GuildNotFoundView') },
    { path: '*', redirect: '/' }
];

module.exports = new VueRouter({
    routes
});