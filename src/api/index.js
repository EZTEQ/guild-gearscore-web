import Vue from 'vue';

const endpoint = '/api';

export default {
    getGuild(realm, name, callback) {
        Vue.http.get(`${endpoint}/guild/${realm}/${name}/members`)
              .then((response) => {
                  callback(response.data);
              })
              .catch(() => {
                  // Todo
                  callback({});
              });
    },

    getMember(realm, name, callback) {
        Vue.http.get(`${endpoint}/character/${realm}/${name}/items`)
              .then((response) => {
                  callback(response.data);
              })
              .catch(() => {
                  // Todo
                  callback({});
              });
    },
};
