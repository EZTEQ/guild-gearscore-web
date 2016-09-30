Vue.component('guild-member', {
    props: ['realm', 'name'],

    data: {
        member: null,
    },

    ready: function() {
        this.getGearScore(this.realm, this.name);
    },

    methods: {
        getGearScore: function(realm, name) {
            this.$http.get('http://localhost/character/' + this.realm + '/' + this.name + '/items')
                .then(function(response) {
                    this.$set('member', response.data);
                });
        }
    },

    template: '<div>{{member.items.averageItemLevelEquipped}} - {{name}}-{{realm}}</div>'
});