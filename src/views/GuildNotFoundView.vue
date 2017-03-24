<template>
    <div class="container mw-900">
        <div class="toast toast-danger text-center">
            The guild you are searching for has not been found.
        </div>
        <div class="container mw-400">
            <guild-picker></guild-picker>
        </div>
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
