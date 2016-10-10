var Vue = require('vue/dist/vue.js');
var Vuex = require('vuex');

Vue.use(Vuex);

var api = require('../api');

module.exports = new Vuex.Store({
    state: {
        guild: {
            name: '',
            realm: '',
            members: []
        }
    },

    mutations: {
        updateGuild: function (state, data) {
            var guild = {
                name: data.name,
                realm: data.realm,
                members: []
            };
            data.members.forEach(function(element) {
                guild.members.push({
                    name: element.character.name,
                    realm: element.character.realm,
                    rank: element.rank,
                    averageItemLevelEquipped: 0
                });
            }, this);
            state.guild = guild;
        },

        updateMember: function (state, data) {
            for (var i = 0; i < state.guild.members.length; i++) {
                if (data.name == state.guild.members[i].name) {
                    Vue.set(state.guild.members[i], 'averageItemLevelEquipped', data.items.averageItemLevelEquipped);
                }
            }
        }
    },

    actions: {
        updateGuild: function (context, payload) {
            api.getGuild(payload.realm, payload.name, function(data) {
                context.commit('updateGuild', data);
            });
        },

        updateMember: function(context, payload) {
            api.getMember(payload.realm, payload.name, function(data) {
                context.commit('updateMember', data);
            });
        }
    }
});
