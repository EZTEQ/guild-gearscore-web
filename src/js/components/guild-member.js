Vue.component('guild-member', {
    props: ['realm', 'name'],

    data: {
        member: null,
        isLoading: true
    },

    ready: function() {
        this.getGearScore(this.realm, this.name);
    },

    methods: {
        getGearScore: function(realm, name) {
            console.log('isLoading: true');
            this.$set('isLoading', true);
            this.$http.get('http://localhost/character/' + this.realm + '/' + this.name + '/items')
                .then(function(response) {
                    this.$set('member', response.data);
                    console.log('isLoading: false');
                    this.$set('isLoading', false);
                });
        }
    },

    template: 
        '<div class="ui segment" v-bind:class="{ hidden: isLoading }">' +
            '<div class="ui mini horizontal statistic"><div class="value">{{member.items.averageItemLevelEquipped}}</div><div class="label">{{name}}</div></div>' +
        '</div>'
});