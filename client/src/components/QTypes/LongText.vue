<template>
<span>
    <textarea class="form-control col-6" cols="50" rows="3" readonly v-if="setter">Long Text</textarea>
    <textarea class="form-control col-6" cols="50" rows="3" v-else></textarea>
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