<template>
<span>
    <span v-if="setter">
        <span id="parentradio" v-for="(item, index) in choices" :key="index">
            <span class="form-check col-6">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" disabled name="optradio">
                    <span class="radio-text">
                        <h6 class="check-title">{{item.r_name||item.r_name_placeholder}}</h6>
                        <input type="text" class="form-control col-6" v-model="item.r_name" placeholder="OptionText">
                    </span>
                </label>
                <i class="fas fa-trash float-right" @click="deleteItem(choices, index)"></i>
            </span>
        </span>
        <i class="fas fa-plus" @click="addItem(choices)"></i>
    </span>
    <span v-else>
        <span id="parentradio" v-for="(item, index) in choices" :key="index">
            <span class="form-check col-6">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" :value="item.r_name" v-model="send_value">
                    <h6>{{item.r_name}}</h6>
                </label>
            </span>
        </span>
    </span>
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
        choices: {
            type: Array,
            required: true,
            note: 'Choice Array',
        },
    },    
    data(){
        return {
            send_value: ''
        }
    },
    methods:{
        addItem(item) {
            item.push({
                r_name_placeholder: "OptionText", 
                r_name: ""
            });
        },
        deleteItem(choices, index) { 
            choices.splice(index, 1); 
        },
    },
    watch:{
        send_value(){
            this.$emit("sendValue", this.send_value);
        }
    }
}
</script>

<style>
.radio-text > .check-title {
    display: block;
}
.radio-text:hover > .check-title {
    display: none;
}
.check-title+input[type="text"] {
    display: none;
}
.radio-text:hover > .check-title+input[type="text"]  {
    display: block;
}
</style>