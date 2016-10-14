import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import api from '../api';

function getEmptyGuildData() {
    return {
        name: '',
        realm: '',
        members: []
    };
}

export default new Vuex.Store({
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
                    level: element.character.level,
                    avatar: '//render-api-eu.worldofwarcraft.com/static-render/eu/' + element.character.thumbnail,
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
        },

        clearGuildData: function (state) {
            state.guild = getEmptyGuildData();
        }
    },

    actions: {
        updateGuild: function (context, payload) {
            api.getGuild(payload.realm, payload.name, function(data) {
                context.commit('updateGuild', data);
            });
        },

        updateMember: function(context, payload) {
            var member = context.state.guild.members.filter(function(x) { return (x.name === payload.name) })[0];
            if(member.averageItemLevelEquipped === 0) {
                api.getMember(payload.realm, payload.name, function(data) {
                        context.commit('updateMember', data);
                });
            }
        }
    }
});
