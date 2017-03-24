<template>
    <div class="container mw-400 landing">
        <div class="container">
            <h1 class="text-center">Guild GearScore</h1>
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

<style scoped>
    .landing {
        height: 90vh;
        display: flex;
        align-items: center;
    }
</style>
