import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api';
import realms from '../data/realms';
import races from '../data/races';
import classes from '../data/classes';

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
            emblem: '',
            members: [],
        },
        realms,
    },

    mutations: {
        /* eslint no-param-reassign: ["error", { "props": false }] */
        updateGuild(state, data) {
            const iconMod = data.emblem.icon.toString().length === 1 ? '0' : '';

            const guild = {
                name: data.name,
                realm: data.realm,
                emblem: `//eu.battle.net/wow/static/images/guild/tabards/emblem_${iconMod + data.emblem.icon}.png`,
                members: [],
            };

            data.members.forEach((element, i) => {
                guild.members.push({
                    id: i, // for optimizing v-for loops
                    name: element.character.name,
                    realm: element.character.realm,
                    rank: element.rank,
                    level: element.character.level,
                    race: races.filter(x => (x.id === element.character.race), this)[0].name,
                    class: classes.filter(x => (x.id === element.character.class), this)[0].name,
                    avatar: `//render-eu.worldofwarcraft.com/character/${element.character.thumbnail}`,
                    averageItemLevel: element.character.averageItemLevel,
                    averageItemLevelEquipped: element.character.averageItemLevelEquipped,
                });
            }, this);
            state.guild = guild;
        },

        clearGuildData(state) {
            state.guild = getEmptyGuildData();
        },
    },

    actions: {
        updateGuild(context, payload) {
            return api.getGuild(payload.realm, payload.name)
                .then((response) => {
                    context.commit('updateGuild', response.data);
                });
        },

    },
});
