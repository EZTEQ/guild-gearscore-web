module.exports = {
    props: ['realm', 'name'],

    data: function() {
        return {
            member: {
                items: {
                    averageItemLevelEquiped: null
                }
            },
            isLoading: true,
            avatar: ''
        }
    },

    mounted: function() {
        this.$nextTick(function() {
            this.getGearScore(this.realm, this.name);
        });
    },

    methods: {
        getGearScore: function(realm, name) {
            Vue.set(this, 'isLoading', true);
            this.$http.get('/api/character/' + this.realm + '/' + this.name + '/items')
                .then(function(response) {
                    Vue.set(this, 'member', response.data);
                    Vue.set(this, 'isLoading', false);
                    Vue.set(this, 'avatar', '//render-api-eu.worldofwarcraft.com/static-render/eu/' + response.data.thumbnail);
                    this.$root.$emit('add-item-level', response.data.items.averageItemLevelEquipped);
                });
        }
    },

    template: require('./template.html')
};