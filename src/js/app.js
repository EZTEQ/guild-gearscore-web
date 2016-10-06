global.jQuery = require('jquery');

global.Vue = require('../../node_modules/vue/dist/vue.js');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

Vue.use(VueRouter);
Vue.use(VueResource);

var routes = [
    { path: '/', component: require('./views/HomeView') },
    { path: '/guild/:realm/:guild', component: require('./views/GuildView') },
    { path: '/guild/not-found', component: require('./views/GuildNotFoundView') },
    { path: '*', redirect: '/' }
];

var router = new VueRouter({
    routes
});

var app = new Vue({
    router
}).$mount('#app');
