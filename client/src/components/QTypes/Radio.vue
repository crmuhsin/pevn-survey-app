<template>
<span>
    <span v-if="setter">
        <span class="row ml-2">
            <span class="form-check col-6" v-for="(item, index) in choices" :key="index">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" disabled>
                    <span class="radio-text">
                        <h6 class="check-title text-wrap" style="max-width: 200px;">{{item.r_name||r_name_placeholder}}</h6>
                        <input type="text" class="form-control form-control-sm" v-model="item.r_name" @keyup="checkDuplicate" placeholder="OptionText">
                    </span>
                </label>
                <i class="fas fa-trash ml-3" @click="deleteItem(index)"></i>
            </span>
        </span>
        <div class="alert alert-danger" v-if="error">
            <span>{{error}}</span>
        </div>
        <i class="fas fa-plus" @click="addItem()"></i>
    </span>
    <span v-else>
        <span class="row ml-2">
            <span class="form-check col-6"  v-for="(item, index) in choices" :key="index">
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
        answer: {
            type: Array,
            required: false,
            note: 'answer',
        }
    },    
    data(){
        return {
            send_value: '',
            error: '',
            r_name_placeholder: "OptionText", 
            button_disable: false
        }
    },
    created(){  
        this.checkDuplicate()
    },
    methods:{
        addItem() {
            this.choices.push({r_name: ""});
            this.checkDuplicate()
        },
        deleteItem(index) { 
            this.choices.splice(index, 1); 
            this.checkDuplicate()
        },
        checkDuplicate(){
            let result = this.choices.map(function(item) {return item.r_name;});
            if (result.length == 0) {
                this.error = 'At least one item needed';
                this.button_disable = true;
            }
            else if(result.includes('')){
                this.error = 'Enter a value';
                this.button_disable = true;
            }
            else if((new Set(result)).size != result.length){
                this.error = 'Cannot input duplicate entry.';
                this.button_disable = true;
            } else {
                this.error = '';
                this.button_disable = false;
            }
        }
    },
    watch:{
        send_value(){
            if (this.answer) {
                let string = ''
                this.answer.forEach(element => {
                    string.push(element);
                });
                this.send_value = string;
            }      
            this.$emit("sendValue", this.send_value);
        },
        button_disable(){
            this.$emit("buttonDisable", this.button_disable);
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