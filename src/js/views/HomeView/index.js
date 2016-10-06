module.exports = {
    data: function() {
        return {
            realm: "",
            guild: ""
        }
    },

    computed: {
        urlToGo: function() {
            return '#/guild/' + this.realm + '/' + this.guild;
        }
    },

    template: require('./template.html')
};