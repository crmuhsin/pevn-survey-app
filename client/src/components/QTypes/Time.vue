<template>
<span>
    <input type="time" class="form-control form-control-sm col-6" placeholder="Time" v-if="setter">
    <input type="time" class="form-control form-control-sm col-6" v-model="send_value" v-else>
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
    data(){
        return {
            send_value: ''
        }
    },
    watch:{
        send_value(){
            this.$emit("sendValue", this.send_value);
        }
    }
}
</script>

<style>

</style>