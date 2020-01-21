<template>
<span>
    <textarea class="form-control form-control-sm col-6" cols="50" rows="3" readonly v-if="setter">Long Text</textarea>
    <textarea class="form-control form-control-sm col-6" cols="50" rows="3" v-model="send_value" v-else></textarea>
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
        answer: {
            type: String,
            required: false,
            note: 'answer',
        },
    },
    created(){
        if (this.answer) {
            this.send_value = this.answer;
        }
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