Vue.component('view-guild', {
    
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
            this.$http.get('http://localhost/guild/' + this.realm + '/' + this.name + '/members')
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
        '<h1 v-text="guild.name"></h1>' +
        '<p v-text="guild.realm"></p>' +
        '<guild-member v-for="member in members" :realm="member.character.realm" :name="member.character.name"></guild-member>'
});