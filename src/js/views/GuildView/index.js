var Vue = require('vue/dist/vue.js');

function sortByProperty(members, prop, reverse) {
    var sortedMembers = members.sort(function(a, b) { return(a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0 });
    return (reverse) ? sortedMembers.reverse() : sortedMembers;
}

var data = {
    sortBy: 'rank',
    sortReverse: false
}

module.exports = {

    data: function () {
        return data;
    },

    computed: {
        guild: function() {
            return this.$store.state.guild;
        },
        
        averageItemLevel: function() {
            var avg = 0;
            this.$store.state.guild.members.forEach(function(element) {
                avg += element.averageItemLevelEquipped;
            });
            avg = Math.round(avg / this.$store.state.guild.members.length);
            return (typeof avg === 'number' && !isNaN(avg)) ? avg : 0;
        },

        members: function() {
            var guildMembers = this.guild.members;
            return sortByProperty(guildMembers, this.sortBy, this.sortReverse);
        }
    },

    mounted: function() {
        this.$store.dispatch('updateGuild', { realm: this.$route.params.realm, name: this.$route.params.guild});
    },

    methods: {

        addItemLevel: function(itemLevel) {
            this.itemLevels.push(itemLevel);
        },

        sort: function(param, $event) {
            if (this.sortBy === param) {
                this.sortReverse = !this.sortReverse;
            } else {
                this.sortReverse = false;
                this.sortBy = param;
            }
        }
    },

    template: require('./template.html'),

    components: {
        'guild-member': require('../../components/GuildMember')
    }
};