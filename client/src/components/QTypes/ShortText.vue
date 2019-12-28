<template>
<span>
    <input type="text" class="form-control col-6" readonly placeholder="Short Text" v-if="setter">
    <input type="text" class="form-control col-6" v-else>
</span>
</template>

<script>
export default {
    props: {
        setter: {
            type: Boolean,
            required: true,
            note: 'is Setter or is Getter',
        },
    },
}
</script>

<style>

</style>