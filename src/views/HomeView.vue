<template>
    <div class="ui center aligned container">
        <h1>Guild GearScore</h1>
        <div class="ui centered grid">
            <div class="eight wide column">
                <form class="ui form">
                    <div class="fields">
                        <div class="eight wide field">
                            <label>Realm</label>
                            <input v-model="realm" type="text" placeholder="Mal'Ganis">
                        </div>
                        <div class="eight wide field">
                            <label>Guild</label>
                            <input v-model="guild" type="text" placeholder="Aeonic">
                        </div>
                    </div>
                    <input type="button" v-on:click.prevent="navigateToGuild" class="ui fluid button" value="Let's find out!" >
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            realm: "",
            guild: ""
        }
    },

    methods: {
        navigateToGuild: function() {
            this.$router.push({ name: 'Guild', params: { realm: this.realm, guild: this.guild } });
        }
    }
};
</script>