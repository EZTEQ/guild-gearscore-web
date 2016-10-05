global.jQuery = require('jquery');

global.Vue = require('../../node_modules/vue/dist/vue.js');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

Vue.use(VueRouter);
Vue.use(VueResource);

var routes = [
    { 
        path: '/',
        component: require('./components/HomeView')
    },
    { 
        path: '/guild/:realm/:guild',
        component: require('./components/GuildView')
    },
    { 
        path: '/guild/not-found',
        component: require('./components/GuildNotFoundView')
    }
];
var router = new VueRouter({
    routes
});

var app = new Vue({
    router
}).$mount('#app');
