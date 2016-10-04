var GuildView = Vue.component('view-guild', {
    
    props: ['realm', 'name'],

    data: {
        guild: null,
        members: null
    },

    ready: function() {
        this.getGuild(this.realm, this.name);
    },

    methods: {
        getGuild: function(realm, name) {
            this.$http.get('http://localhost/guild/' + this.$route.params.realm + '/' + this.$route.params.guild + '/members')
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

    template:
        '<div class="ui tall stacked segment">' +
            '<h1 class="header" v-text="guild.name"></h1>' +
            '<span class="description" v-text="guild.realm"></p>' +
        '</div>' +            
        '<div class="ui segments">' +
            '<guild-member v-for="member in members" :realm="member.character.realm" :name="member.character.name"></guild-member>' +
        '</div>'
});