<template>
    <div class="item">
        <img class="ui avatar image">
        <div class="content">
            <span class="header">{{name}}</span>
            {{averageItemLevelEquipped}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['realm', 'name'],

    computed: {
        averageItemLevelEquipped: function() {
            return this.$store.state.guild.members.filter(function(x) {
                return (x.name === this.name)
            }, this)[0].averageItemLevelEquipped;
        }
    },

    mounted: function() {
        this.$store.dispatch('updateMember', { realm: this.realm, name: this.name })
    }
};
</script>