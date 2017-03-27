import Vue from 'vue';
import normalizer from '../helper/realmnormalizer';

const endpoint = '/api';

export default {
    getGuild(realm, name) {
        const nRealm = normalizer.get(realm);
        const nGuild = name.toLowerCase();
        return Vue.http.get(`${endpoint}/guildgear/${nRealm}/${nGuild}`);
    },
};
