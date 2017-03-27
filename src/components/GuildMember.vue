<template>
    <div class="tile">
        <div class="tile-icon">
            <figure class="avatar avatar-lg">
                <img v-lazy="character.avatar">
            </figure>
        </div>
        <div class="tile-content">
            <h5 class="tile-title mb-0">{{ name }}</h5>
            <p class="tile-subtitle">{{character.race}} - {{character.class}}</p>
        </div>
            <h3 class="float-right mt-0">
                {{character.averageItemLevelEquipped}}
            </h3>

        <div class="tile-action">
            <a :href="armoryUrl" target="_blank" class="armory"><button class="btn btn-link"><i class="icon-new-tab"></i></button></a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['name'],

    computed: {
        character() {
            return this.$store.state.guild.members.filter(x => (x.name === this.name), this)[0];
        },
        armoryUrl() {
            return `//eu.battle.net/wow/en/character/${this.character.realm}/${this.character.name}/`;
        },
    },

    methods: {
        openInBattleNet() {
            window.open(`//eu.battle.net/wow/en/character/${this.character.realm}/${this.character.name}/`, '_blank'); // eslint-disable-line
        },
    },
};
</script>

<style>
    .armory {
        line-height: 36px;
    }
</style>
