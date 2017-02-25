import Vue from 'vue';

const endpoint = '/api';

export default {
    getGuild(realm, name) {
        return Vue.http.get(`${endpoint}/guildgear/${realm}/${name}`);
    },
};
