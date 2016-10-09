var Vue = require('vue/dist/vue.js');
var Vuex = require('vuex');

Vue.use(Vuex);

module.exports = new Vuex.Store({
    guild: {
        members: []
    }
})