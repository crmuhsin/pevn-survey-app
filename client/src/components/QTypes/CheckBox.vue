<template>
<span>
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
</template>

<script>
export default {
    props: {
        choices: {
            type: Array,
            required: true,
            note: 'Choice Array',
        }
    },    
    data(){
        return {
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