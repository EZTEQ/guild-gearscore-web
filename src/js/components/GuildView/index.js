module.exports = {
    
    data: function() {
        return {
            guild: {
                name: "",
                realm: "",
                members: []
            },
            members: [],
            itemLevels: [],
        }
    },

    computed: {
        averageItemLevel: function() {
            if (this.itemLevels.length > 0) {
                return Math.round((this.itemLevels.reduce(function(a, b) {
                    return a + b;
                }, 0) / this.itemLevels.length));
            }
            return 0;
        },
        progress: function() {
            if (this.itemLevels.length > 0 && this.members.length > 0) {
                return Math.round((this.itemLevels.length / this.members.length) * 100);
            }
            return "";
        },
        finished: function() {
            return (this.itemLevels.length === this.members.length);
        }
    },

    mounted: function() {
        this.$nextTick(function() {
            this.getGuild(this.realm, this.name);
        });
    },

    created: function () {
        this.$root.$on('add-item-level', this.addItemLevel)
    },
    beforeDestroy: function () {
        this.$root.$off('add-item-level', this.addItemLevel)
    },

    methods: {

        getGuild: function(realm, name) {
            this.$http.get('/api/guild/' + this.$route.params.realm + '/' + this.$route.params.guild + '/members')
                .then(function(response) {
                    var filteredMembers = response.data.members
                        .filter(function(member) {
                            if (member.character.level === 110) return true;
                        })
                        .sort(function(a, b) {
                            if(a.rank < b.rank) return -1;
                            if(a.rank > b.rank) return 1;
                            if(a.rank == b.rank) return 0;
                        });
                    Vue.set(this, 'guild', response.data);
                    Vue.set(this, 'members', filteredMembers);
                })
                .catch(function() {
                    this.$router.push('/guild/not-found');
                });
        },

        addItemLevel: function(itemLevel) {
            this.itemLevels.push(itemLevel);
        }
    },

    template: require('./template.html'),

    components: {
        'guild-member': require('../GuildMember')
    }
};