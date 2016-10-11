import Vue from 'vue';

var endpoint = '/api';

export default {
    getGuild: function(realm, name, callback) {
        Vue.http.get(endpoint + '/guild/' + realm + '/' + name + '/members')
                .then(function(response) {
                    callback(response.data);
                })
                .catch(function() {
                    //Todo
                    callback({});
                });
    },

    getMember: function(realm, name, callback) {
        Vue.http.get(endpoint + '/character/' + realm + '/' + name + '/items')
                .then(function(response) {
                    callback(response.data);
                })
                .catch(function() {
                    //Todo
                    callback({});
                });
    },
}