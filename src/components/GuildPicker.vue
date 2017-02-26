<template>
    <div class="ui centered grid">
        <div class="eight wide column">
            <form class="ui form" v-on:submit.prevent="navigateToGuild">
                <div class="two fields">
                    <div class="field">
                        <label>Realm</label>
                        <select v-model="realm">
                            <option v-for="option in realms">{{option}}</option>
                        </select>
                    </div>
                    <div class="field">
                        <label>Guild</label>
                        <input v-model="guild" type="text" placeholder="Your Epic Guild">
                    </div>
                </div>
                <input type="submit" class="ui fluid button" value="Let's find out!" >
            </form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            realm: '',
            guild: '',
            realms: this.$store.state.realms,
        };
    },

    beforeMount() {
        // Pick a random realm
        this.realm = this.realms[Math.floor(Math.random() * this.realms.length)];
    },

    methods: {
        navigateToGuild() {
            if (this.realm && this.guild) {
                this.$router.push({ name: 'Guild', params: { realm: this.realm, guild: this.guild } });
            }
        },
    },
};
</script>
<style src="semantic-ui-css/components/grid.min.css"></style>
<style src="semantic-ui-css/components/form.min.css"></style>
<style src="semantic-ui-css/components/input.min.css"></style>
<style src="semantic-ui-css/components/button.min.css"></style>
<style src="semantic-ui-css/components/item.min.css"></style>
