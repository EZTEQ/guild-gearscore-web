<template>
    <form class="form-horizontal centered" v-on:submit.prevent="navigateToGuild">
        <div class="form-group">
            <div class="col-2">
                <label class="form-label">Realm</label>
            </div>
            <div class="col-10">
                <select class="form-select select-lg fluid" v-model="realm">
                    <option v-for="option in realms">{{option}}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <div class="col-2">
                <label class="form-label">Guild</label>
            </div>
            <div class="col-10">
                <input class="form-input input-lg" v-model="guild" type="text" placeholder="Your Epic Guild">
            </div>
        </div>
        <div class="form-group">
            <div class="col-2"></div>
            <div class="col-10">
                <button type="submit" class="btn btn-lg btn-primary fluid">Let's find out!</button>
            </div>
        </div>
    </form>
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
