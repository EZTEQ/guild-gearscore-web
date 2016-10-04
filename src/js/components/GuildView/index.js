module.exports = {
    
    props: ['realm', 'name'],

    data: {
        guild: null,
        members: null
    },

    mounted: function() {
        this.$nextTick(function() {
            this.getGuild(this.realm, this.name);
        });
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
                            if(a.rank < b.rank) return 0;
                        });
                    this.$set('guild', response.data);
                    this.$set('members', filteredMembers);
                });
        }
    },

    template: require('./template.html'),

    components: {
        guildMember: require('../GuildMember')
    }
};