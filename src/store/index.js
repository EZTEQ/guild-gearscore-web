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
            members: [],
        },
        realms,
    },

    mutations: {
        /* eslint no-param-reassign: ["error", { "props": false }] */
        updateGuild(state, data) {
            const guild = {
                name: data.name,
                realm: data.realm,
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
                    avatar: `//render-api-eu.worldofwarcraft.com/static-render/eu/${element.character.thumbnail}
?alt=wow/static/images/2d/avatar/${element.character.race}-${element.character.gender}.jpg`,
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
