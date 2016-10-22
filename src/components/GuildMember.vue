<template>
    <div class="item">
        <img class="ui rounded mini image" :src="character.avatar">
        <div class="content">
            <span class="header">{{name}}</span>
            <i>{{character.race}} - {{character.class}}</i>
        </div>
        <h3 class="ui right floated header">
            {{character.averageItemLevelEquipped}} 
        </h3>
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
    },

    mounted() {
        this.$store.dispatch('updateMember', { realm: this.character.realm, name: this.name });
    },
};
</script>

<style>
    .ui.right.floated.header {
        line-height: 36px;
    }
</style>
<style src="semantic-ui-css/components/label.min.css"></style>