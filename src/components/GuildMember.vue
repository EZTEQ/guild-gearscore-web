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

    data() {
        return { avatarError: false };
    },

    computed: {
        character() {
            return this.$store.state.guild.members.filter(x => (x.name === this.name), this)[0];
        },
        avatar() {
            return this.avatarError ? '' : this.character.avatar;
        },
    },

    mounted() {
        this.$store.dispatch('updateMember', { realm: this.character.realm, name: this.name });
    },

    methods: {
        onAvatarError() {
            this.avatarError = true;
        },
    },
};
</script>
