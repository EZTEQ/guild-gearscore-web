global.jQuery = require('jquery');

var Vue = require('vue/dist/vue.js');
var VueResource = require('vue-resource');

Vue.use(VueResource);

var router = require('./router');
var store = require('./store');

var app = new Vue({
    router,
    store
}).$mount('#app');
