<template>
    <div class="ui center aligned container">
        <div class="ui red secondary inverted segment">
            The guild you are searching for has not been found.
        </div>
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
<style src="semantic-ui-css/components/segment.min.css"></style>
