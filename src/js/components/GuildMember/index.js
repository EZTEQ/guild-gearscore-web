var Vue = require('vue/dist/vue.js');

module.exports = {
    props: ['realm', 'name'],

    computed: {
        averageItemLevelEquipped: function() {
            return this.$store.state.guild.members.filter(function(x) {
                return (x.name === this.name)
            }, this)[0].averageItemLevelEquipped;
        }
    },

    mounted: function() {
        this.$store.dispatch('updateMember', { realm: this.realm, name: this.name })
    },

    template: require('./template.html')
};