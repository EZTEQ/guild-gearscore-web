<template>
    <div class="ui center aligned container">
        <h1>Guild GearScore</h1>
        <guild-picker></guild-picker>
    </div>
</template>

<script>
import GuildPicker from '../components/GuildPicker';

export default {
    components: {
        'guild-picker': GuildPicker,
    },
};
</script>
<style src="semantic-ui-css/components/grid.min.css"></style>
