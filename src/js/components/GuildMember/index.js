module.exports = {
    props: ['realm', 'name'],

    data: {
        member: null,
        isLoading: true
    },

    mounted: function() {
        this.$nextTick(function() {
            this.getGearScore(this.realm, this.name);
        });
    },

    methods: {
        getGearScore: function(realm, name) {
            console.log('isLoading: true');
            this.$set('isLoading', true);
            this.$http.get('/api/character/' + this.realm + '/' + this.name + '/items')
                .then(function(response) {
                    this.$set('member', response.data);
                    console.log('isLoading: false');
                    this.$set('isLoading', false);
                });
        }
    },

    template: require('./template.html')
};