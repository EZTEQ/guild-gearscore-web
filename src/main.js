import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';
import App from './App';
import router from './router';
import store from './store';

Vue.use(VueResource);
Vue.use(VueLazyload);

/* eslint-disable no-new */
new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App),
});
