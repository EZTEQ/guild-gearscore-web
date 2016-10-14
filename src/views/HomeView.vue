<template>
    <div class="ui center aligned container">
        <h1>Guild GearScore</h1>
        <div class="ui centered grid">
            <div class="eight wide column">
                <form class="ui form">
                    <div class="fields">
                        <div class="eight wide field">
                            <label>Realm</label>
                            <select v-model="realm" class="ui search dropdown">
                                <option v-for="option in realms">{{option}}</option>
                            </select>
                        </div>
                        <div class="eight wide field">
                            <label>Guild</label>
                            <input v-model="guild" type="text" placeholder="Your Epic Guild">
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
    data() {
        return {
            realm: '',
            guild: '',
            realms: this.$store.state.realms,
        };
    },

    beforeMount() {
        // Pick random realm
        this.realm = this.realms[Math.floor(Math.random() * this.realms.length)];
    },

    methods: {
        navigateToGuild() {
            this.$router.push({ name: 'Guild', params: { realm: this.realm, guild: this.guild } });
        },
    },
};
</script>