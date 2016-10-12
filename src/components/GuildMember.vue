<template>
    <div class="item">
        <img class="ui rounded mini image" :src="avatar" @error="onAvatarError">
        <div class="content">
            <span class="header">{{name}}</span>
            {{character.averageItemLevelEquipped}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['name'],

    data: function() {
        return { avatarError: false };
    },

    computed: {
        character: function() {
            return this.$store.state.guild.members.filter(function(x) {
                return (x.name === this.name);
            }, this)[0];
        },
        avatar: function() {
            return this.avatarError ? '' : this.character.avatar;
        }
    },

    mounted: function() {
        this.$store.dispatch('updateMember', { realm: this.character.realm, name: this.name });
    },

    methods: {
        onAvatarError: function() {
            this.avatarError = true;
        }
    }
};
</script>