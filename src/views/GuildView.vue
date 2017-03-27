<template>
    <div class="container mw-900">
        <div class="ui dimmer" :class="{ hidden: this.guild.name !== ''}">
            <div class="ui text loader">Loading</div>
        </div>

        <div class="container">
            <div class="columns">
                <div class="col-9">
                    <div class="container text-center">
                        <div class="panel mb-10">
                            <div class="panel-body">
                                <div class="tile">
                                    <div class="tile-icon">
                                        <img class="guild-icon mb-0" :src="guild.emblem" :alt="guild.name">
                                    </div>
                                    <div class="tile-body fluid">
                                        <h1 class="mb-0">{{ guild.name }}</h1>
                                        {{ guild.realm }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="panel">
                            <div class="panel-header"></div>
                            <div class="panel-body">
                                <guild-member v-for="member in members" :name="member.name" :key="member.id"></guild-member>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="menu mb-10">
                        <div class="text-center">
                            <h1 class="mb-0" v-text="averageItemLevel"></h1>
                            <h6>Average Item Level</h6>
                        </div>
                    </div>

                    <!-- ORDER BY MENU -->
                    <div class="menu mb-10">
                        <div class="menu-item">
                            <div class="tile tile-centered">
                                <div class="tile-icon">
                                    <i class="icon-sort"></i>
                                </div>
                                <div class="tile-content">Order By</div>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="menu-item">
                            <a :class="{ active: sortBy == 'averageItemLevelEquipped' }" v-on:click="sort('averageItemLevelEquipped', 'name', $event)">
                                Item Level
                                <i class="float-right" :class="[sortReverse ? 'icon-arrow-down' : 'icon-arrow-up']" v-if="sortBy == 'averageItemLevelEquipped'"></i>
                            </a>
                        </div>
                        <div class="menu-item">
                            <a :class="{ active: sortBy == 'rank' }" v-on:click="sort('rank', 'name', $event)">
                                Guild Rank
                                <i class="float-right" :class="[sortReverse ? 'icon-arrow-down' : 'icon-arrow-up']" v-if="sortBy == 'rank'"></i>
                            </a>
                        </div>
                        <div class="menu-item">
                            <a :class="{ active: sortBy == 'name' }" v-on:click="sort('name', 'rank', $event)">
                                Name
                                <i class="float-right" :class="[sortReverse ? 'icon-arrow-down' : 'icon-arrow-up']" v-if="sortBy == 'name'"></i>
                            </a>
                        </div>
                    </div>

                    <!-- FILTER MENU -->
                    <div class="menu">
                        <div class="menu-item">
                            <div class="tile tile-centered">
                                <div class="tile-icon">
                                    <i class="icon-filter"></i>
                                </div>
                                <div class="tile-content">Filter</div>
                            </div>
                        </div>
                        <div class="divider"></div>
                        <div class="menu-item mb-10">
                            <form>
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <input type="text" class="form-input" v-model="filterName">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Rank (Smaller is higher)</label>
                                    <input type="number" class="form-input" min="0" v-model.number="filterRank">
                                </div>
                            </form>
                        </div>
                    </div>
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

        guildNameInitials() {
            let initials = this.guild.name.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            return initials;
        },

        averageItemLevel() {
            let avg = 0;
            this.members.forEach(element => (avg += element.averageItemLevelEquipped));
            avg = Math.round(avg / this.members.length);
            return (typeof avg === 'number' && !isNaN(avg)) ? avg : 0;
        },

        members() {
            const guildMembers = this.guild.members;
            setTimeout(() => this.$Lazyload.lazyLoadHandler(), 0);
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

<style>
.guild-icon {
    height: 84px;
}
</style>

<style src="../styles/icons.css"></style>
