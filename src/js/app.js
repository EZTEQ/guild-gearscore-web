var App = Vue.extend({});

var router = new VueRouter();
router.map({
    '/': {
        component: HomeView
    },
    '/guild/:realm/:guild': {
        component: GuildView
    }
})

router.start(App, '#app');
