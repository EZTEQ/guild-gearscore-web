<template>
    <div class="ui container">
        <div class="ui dimmer" :class="{ active: this.guild.name === ''}">
            <div class="ui text loader">Loading</div>
        </div>
        <div class="ui segments">
            <div class="ui secondary segment">
                <p>Overview</p>
            </div>
            <div class="ui segment">
                <div class="ui two center aligned statistics">
                    <div class="statistic">
                        <div class="value" v-text="guild.name"></div>
                        <div class="label" v-text="guild.realm"></div>
                    </div>
                    <div class="statistic">
                        <div class="value" v-text="averageItemLevel"></div>
                        <div class="label">Average Item Level</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui mobile reversed  stackable two column centered grid">
            <div class="twelve wide column">
                <h4 class="ui horizontal divider header"><i class="users icon"></i>Members ({{members.length}})</h4>
                <div class="ui segment">
                    <div class="ui large middle aligned divided list">
                        <guild-member v-for="member in members" :name="member.name" :key="member.id">
                        </guild-member>
                    </div>
                </div>
            </div>
            <div class="four wide column">
                <h4 class="ui horizontal divider header"><i class="sort alphabet ascending icon"></i>Order By</h4>
                <div class="ui fluid vertical menu">
                    <a class="item" :class="{ active: sortBy == 'averageItemLevelEquipped' }" v-on:click="sort('averageItemLevelEquipped', 'name', $event)">
                        Item Level
                        <i class="dropdown icon" :class="{ 'vertically flipped': !sortReverse }" v-if="sortBy == 'averageItemLevelEquipped'"></i>
                    </a>
                    <a class="item" :class="{ active: sortBy == 'rank' }" v-on:click="sort('rank', 'name', $event)">
                        Guild Rank
                        <i class="dropdown icon" :class="{ 'vertically flipped': !sortReverse }" v-if="sortBy == 'rank'"></i>
                    </a>
                    <a class="item" :class="{ active: sortBy == 'name' }" v-on:click="sort('name', 'rank', $event)">
                        Name
                        <i class="dropdown icon" :class="{ 'vertically flipped': !sortReverse }" v-if="sortBy == 'name'"></i>
                    </a>
                </div>

                <h4 class="ui horizontal divider header"><i class="filter icon"></i>Filter</h4>
                <div class="ui segment">
                    <form class="ui form">
                        <div class="field">
                            <label>Name</label>
                            <input type="text" v-model="filterName">
                        </div>
                        <div class="field">
                            <label>Rank (Smaller is higher)</label>
                            <input type="number" min="0" v-model.number="filterRank">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GuildMember from '../components/GuildMember';

function sortByProperty(members, prop, secondprop, reverse) {
    const sortedMembers = members.sort((a, b) => {
        if (a[prop] < b[prop]) {
            return -1;
        } else if (a[prop] > b[prop]) {
            return 1;
        }
        // Equal - use second prop
        return (a[secondprop] < b[secondprop] ? -1 : 1);
    });
    return (reverse) ? sortedMembers.reverse() : sortedMembers;
}

const data = {
    sortBy: 'averageItemLevelEquipped',
    sortBySecond: 'name',
    sortReverse: true,
    filterName: '',
    filterRank: 10,
};

export default {

    data() {
        return data;
    },

    computed: {
        guild() {
            return this.$store.state.guild;
        },

        guildName() {
            return this.guild.name;
        },

        averageItemLevel() {
            let avg = 0;
            this.members.forEach(element => (avg += element.averageItemLevelEquipped));
            avg = Math.round(avg / this.members.length);
            return (typeof avg === 'number' && !isNaN(avg)) ? avg : 0;
        },

        members() {
            const guildMembers = this.guild.members;
            return sortByProperty(guildMembers, this.sortBy, this.sortBySecond, this.sortReverse)
                .filter(x => (x.name.toLowerCase().indexOf(this.filterName.toLowerCase()) !== -1), this)
                .filter(x => (x.rank <= this.filterRank), this);
        },
    },

    beforeMount() {
        if (!(this.guild.realm === this.$route.params.realm && this.guild.name === this.$route.params.guild)) {
            this.updateGuild(this.$route.params.realm, this.$route.params.guild);
        }
    },

    watch: {
        $route(target, current) {
            if (!(current.params.realm === target.params.realm && current.params.guild === target.params.guild)) {
                this.updateGuild(target.params.realm, target.params.guild);
            }
        },
        guildName() {
            if (this.guildName !== '' && !(this.guildName === this.$route.params.guild)) {
                this.$router.replace({ name: 'Guild', params: { realm: this.guild.realm, guild: this.guildName } });
            }
        },
    },

    methods: {

        addItemLevel(itemLevel) {
            this.itemLevels.push(itemLevel);
        },

        sort(prop, secondprop) {
            if (this.sortBy === prop && this.sortBySecond === secondprop) {
                this.sortReverse = !this.sortReverse;
            } else {
                this.sortBy = prop;
                this.sortBySecond = secondprop;
                this.sortReverse = false;
            }
        },

        updateGuild(realm, name) {
            this.$store.commit('clearGuildData');
            this.$store.dispatch('updateGuild', { realm, name })
                .catch(() => {
                    this.$router.push({ name: 'GuildNotFound' });
                });
        },
    },

    components: {
        'guild-member': GuildMember,
    },
};
</script>
<style src="semantic-ui-css/components/grid.min.css"></style>
<style src="semantic-ui-css/components/segment.min.css"></style>
<style src="semantic-ui-css/components/list.min.css"></style>
<style src="semantic-ui-css/components/statistic.min.css"></style>
<style src="semantic-ui-css/components/image.min.css"></style>
<style src="semantic-ui-css/components/input.min.css"></style>
<style src="semantic-ui-css/components/item.min.css"></style>
<style src="semantic-ui-css/components/checkbox.min.css"></style>
<style src="semantic-ui-css/components/dimmer.min.css"></style>
<style src="semantic-ui-css/components/loader.min.css"></style>
<style src="semantic-ui-css/components/icon.min.css"></style>
<style src="semantic-ui-css/components/header.min.css"></style>
<style src="semantic-ui-css/components/divider.min.css"></style>
