var Vue = require('vue/dist/vue.js');

var endpoint = 'http://localhost:3000';

module.exports = {
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