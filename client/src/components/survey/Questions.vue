<template>
<div class="container">
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
        <div class="col-8">
            <div class="card mb-4" v-for="(item, index) in questions" :key="index">
                <div class="card-header">
                    Question No {{index+1}}
                    <div class="dropdown float-right">
                        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Choose Question Type
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" v-for="(types, index) in qtypeList" :key="index" @click="item.qtype=types.qtype, item.qchoices=types.choices">{{ types.title }}</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <span class="question-text">
                        <h5 class="card-title">{{item.q_name||item.q_name_placeholder}}</h5>
                        <input type="text" class="form-control col-6" v-model="item.q_name" placeholder="Enter Survey Question">
                    </span>
                    <p class="card-text mt-2">
                        <LongText v-if="item.qtype=='longText'" :setter="true"/>
                        <ShortText v-else-if="item.qtype=='shortText'" :setter="true"/>
                        <Dropdown v-else-if="item.qtype=='dropdown'" :choices="item.qchoices" :setter="true"/>
                        <Radio v-else-if="item.qtype=='radio'" :choices="item.qchoices" :setter="true"/>
                    </p>
                </div>
                <div class="card-footer">
                    <div class="custom-control custom-switch float-right">
                        <input type="checkbox" class="custom-control-input" v-model="item.is_required" :id="'customSwitch'+index">
                        <label class="custom-control-label" :for="'customSwitch'+index">Required</label>
                    </div>
                    <i class="fas fa-trash mr-4 float-right" @click="deleteItem(questions, index)"></i>
                    <i class="fas fa-plus mr-4 float-right" @click="addItem(questions)"></i>
                </div>
            </div>
            <i class="fas fa-plus mr-4 float-right" @click="addItem(questions)"></i>
            <button class="btn btn-primary mx-auto col-2" type="submit" @click.prevent="questionSaveUpdate()">{{ buttonText }}</button>
        </div>

        <div class="col-4">
            {{questions}}
        </div>
        <div class="toast show" :style="'background-color:'+color" role="alert" aria-live="assertive" aria-atomic="true" v-if="enableToast">
            <div class="toast-body">
                {{ toastText }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {url} from '@/urls';
import {service} from '@/services';
import * as _ from 'underscore';
import { CheckBox, Date, Dropdown, LongText, Radio, Rating, ShortText, Time } from './../QTypes';
export default {
    components:{
        CheckBox, Date, Dropdown, LongText, Radio, Rating, ShortText, Time
    },
    data(){
        return {
            questions:[],
            qtypeList: [
                { qtype:'shortText', title:'Short Text', choices: ''},
                { qtype:'longText', title:'Long Text', choices: ''},
                { qtype:'radio', title:'Multiple Choice', choices: []},
                { qtype:'dropdown', title:'Dropdown', choices: []},
            ],
            enableToast: false,
            loader: false,
            toastText: 'asa',
            buttonText: 'Save',
            error: "",
            isUpdate: false,
        }
    },
    mounted(){
        this.getQuestions();
    },
    methods:{
        addItem(item) {
            item.push({
                q_name_placeholder: "Enter Survey Question", 
                q_name: "",
                qtype: "radio",
                qchoices: [],
                is_required: true
            });
        },
        deleteItem(questions, index) { 
            questions.splice(index, 1); 
        },
        getQuestions(){
            this.loader = true;
            let body = { slug:this.$route.params.survey }
            service.onPost(url.questions_get_by_id, body)
            .then(result => {
                this.loader = false;
                if (result.data) {
                    this.questions = JSON.parse(result.data.fullquestion);
                    this.isUpdate = true;
                    this.buttonText = "Update"
                }
            }).catch(error => {
                console.log(error)
            })
        },
        questionSaveUpdate(){
            this.loader = true;
            let http_url;
            if (this.isUpdate) {
                http_url = url.questions_update;
            } else {
            console.log(this.isUpdate);
                http_url = url.questions_save;
            }
            let body = {questions: JSON.stringify(this.questions), slug:this.$route.params.survey}
            body = _.clone(body);
            service.onPost(http_url, body)
            .then(result => {
                this.loader = false;
                this.enableToast = true;
                if (result.status != 200){
                    this.color = "red"; 
                    this.toastText =  "Something Went wrong";
                    return;
                }
                this.color = "green"; 
                this.toastText = "Survey saved successfully."
                setTimeout( () => this.$router.push({name:'Survey View', params:{survey:this.$route.params.survey}}), 3000);
            }).catch(error => {
                console.log(error)
            })
		}
    }
}
</script>

<style>
.question-text > .card-title {
    display: block;
}
.question-text:hover > .card-title {
    display: none;
}
.card-title+input[type="text"] {
    display: none;
}
.question-text:hover > .card-title+input[type="text"]  {
    display: block;
}
/* .display{
    display: block;
}
.not-display{
    display: none;
} */
</style>
