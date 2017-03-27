<template>
    <div class="container">
        <!-- :class="{ hidden: this.guild.name !== ''}" -->
        <div class="container text-center mw-900" v-if="isLoading">
            <div class="empty-icon">
                <h2><i class="icon-avg-item-level spinner"></i></h2>
            </div>
            <h4 class="empty-title">Loading Guild Data</h4>
            <p class="empty-subtitle">This may take up to 30 seconds.</p>
        </div>

        <div class="container mw-900" v-if="!isLoading">
            <div class="container">
                <div class="columns">
                    <div class="col-9">
                        <div class="container text-center mb-10">
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
                        <div class="container">
                            <div class="divider"></div>
                        </div>
                        <div class="container">                    
                            <guild-member v-for="member in members" :name="member.name" :key="member.id"></guild-member>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="container text-center">
                            <h1 class="mb-0" v-text="averageItemLevel"></h1>
                            <h6 class="inline-block tooltip tooltip-bottom" data-tooltip="Average of top 20 players">
                                Average Item Level
                            </h6>
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
    averageItemLevel: '-',
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
            // return this.guild.name;
        },

        guildNameInitials() {
            let initials = this.guild.name.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
            return initials;
        },

        members() {
            const guildMembers = this.guild.members;
            setTimeout(() => this.$Lazyload.lazyLoadHandler(), 0);
            this.averageItemLevel = this.getAverageItemLevel();
            return sortByProperty(guildMembers, this.sortBy, this.sortBySecond, this.sortReverse)
                .filter(x => (x.name.toLowerCase().indexOf(this.filterName.toLowerCase()) !== -1), this)
                .filter(x => (x.rank <= this.filterRank), this);
        },

        isLoading() {
            return this.guild.name === '';
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
    },

    methods: {

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

        getAverageItemLevel() {
            const guildMembers = this.guild.members;

            const top20 = sortByProperty(guildMembers, 'averageItemLevelEquipped', 'name', true)
                .slice(0, 20);
            let avg = 0;

            top20.forEach(element => (avg += element.averageItemLevelEquipped));
            avg = Math.round(avg / top20.length);
            return (typeof avg === 'number' && !isNaN(avg)) ? avg : 0;
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
@keyframes rotation {
    from{
        -webkit-transform: rotate(0deg);
    }
    to{
        -webkit-transform: rotate(90deg);
    }
}

@keyframes anim-rotate {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}
.spinner {
    display: inline-block;
	animation: anim-rotate 3s infinite linear;
}
</style>

<style src="../styles/icons.css"></style>
