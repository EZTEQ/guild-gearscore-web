global.jQuery = require('jquery');

var Vue = require('vue/dist/vue.js');
var VueResource = require('vue-resource');

Vue.use(VueResource);

var router = require('./router');

var app = new Vue({
    router
}).$mount('#app');
