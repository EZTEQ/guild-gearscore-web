import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api';

Vue.use(Vuex);

function getEmptyGuildData() {
    return {
        name: '',
        realm: '',
        members: [],
    };
}

export default new Vuex.Store({
    state: {
        guild: {
            name: '',
            realm: '',
            members: [],
        },
    },

    mutations: {
        /* eslint no-param-reassign: ["error", { "props": false }] */
        updateGuild(state, data) {
            const guild = {
                name: data.name,
                realm: data.realm,
                members: [],
            };
            data.members.forEach((element) => {
                guild.members.push({
                    name: element.character.name,
                    realm: element.character.realm,
                    rank: element.rank,
                    level: element.character.level,
                    avatar: `//render-api-eu.worldofwarcraft.com/static-render/eu/${element.character.thumbnail}`,
                    averageItemLevelEquipped: 0,
                });
            }, this);
            state.guild = guild;
        },

        updateMember(state, data) {
            for (let i = 0; i < state.guild.members.length; i += 1) {
                if (data.name === state.guild.members[i].name) {
                    Vue.set(state.guild.members[i], 'averageItemLevelEquipped', data.items.averageItemLevelEquipped);
                }
            }
        },

        clearGuildData(state) {
            state.guild = getEmptyGuildData();
        },
    },

    actions: {
        updateGuild(context, payload) {
            api.getGuild(payload.realm, payload.name, (data) => {
                context.commit('updateGuild', data);
            });
        },

        updateMember(context, payload) {
            const member = context.state.guild.members.filter(x => (x.name === payload.name))[0];
            if (member.averageItemLevelEquipped === 0) {
                api.getMember(payload.realm, payload.name, data => context.commit('updateMember', data));
            }
        },
    },
});
