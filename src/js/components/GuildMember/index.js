module.exports = {
    props: ['realm', 'name'],

    data: function() {
        return {
            member: {
                items: {
                    averageItemLevelEquiped: null
                }
            },
            isLoading: true
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
                    this.$root.$emit('add-item-level', response.data.items.averageItemLevelEquipped);
                });
        }
    },

    template: require('./template.html')
};