var Vue = require('vue/dist/vue.js');

function sortByProperty(members, prop, secondprop, reverse) {
    var sortedMembers = members.sort(function(a, b) { 
        if (a[prop] < b[prop]) {
            return -1
        } else if (a[prop] > b[prop]) {
            return 1
        } else {
            //Equal - use second prop
            return (a[secondprop] < b[secondprop] ? -1 : 1);
        }
    });
    return (reverse) ? sortedMembers.reverse() : sortedMembers;
}

var data = {
    sortBy: 'rank',
    sortBySecond: 'name',
    sortReverse: false,
    filterName: ''
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
            return sortByProperty(guildMembers, this.sortBy, this.sortBySecond, this.sortReverse)
                .filter(function(x) {
                    return (x.name.indexOf(this.filterName) !== -1)
                }, this);
        }
    },

    mounted: function() {
        this.$store.dispatch('updateGuild', { realm: this.$route.params.realm, name: this.$route.params.guild});
    },

    methods: {

        addItemLevel: function(itemLevel) {
            this.itemLevels.push(itemLevel);
        },

        sort: function(prop, secondprop, $event) {
            if (this.sortBy === prop && this.sortBySecond === secondprop) {
                this.sortReverse = !this.sortReverse;
            } else {
                this.sortBy = prop;
                this.sortBySecond = secondprop;
                this.sortReverse = false;
            }
        }
    },

    template: require('./template.html'),

    components: {
        'guild-member': require('../../components/GuildMember')
    }
};