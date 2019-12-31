<template>
<div class="container">
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
        <div class="col-lg-8 col-xl-8">
            <div class="jumbotron">
                <div class="card mb-4" v-for="(item, index) in questions" :key="index">
                    <div class="card-body">
                        <p class="card-text">Question {{index+1}}</p>
                        <p class="card-text">
                            {{item.q_name}}
                            <span class="required" v-if="item.is_required">*</span>
                        </p>
                        <p class="card-text mt-2">
                            <LongText v-if="item.qtype=='longText'" :setter="false" @sendValue="getAnswer($event, index)" :answer="responses[index].answer"/>
                            <ShortText v-else-if="item.qtype=='shortText'"  :setter="false" @sendValue="getAnswer($event, index)"/>
                            <Dropdown v-else-if="item.qtype=='dropdown'" :choices="item.qchoices"  :setter="false" @sendValue="getAnswer($event, index)"/>
                            <Radio v-else-if="item.qtype=='radio'" :choices="item.qchoices"  :setter="false" @sendValue="getAnswer($event, index)" :answer="responses[index].answer"/>
                            <!-- <Radio v-else-if="item.qtype=='radio'" :choices="item.qchoices" :required="item.is_required"  :setter="false" @sendValue="getAnswer($event, index)"/> -->
                        </p>
                    </div>
                </div>
                <button @click.prevent="responseSaveUpdate">{{buttonText}}</button>
            </div>
        </div>
        <div class="col-lg-3 col-xl-3">
            {{responses}}
        </div>
    </div>
</div>
</template>

<script>
import {url} from '@/urls';
import {service} from '@/services';
import * as _ from 'underscore';
import { validators } from '@/services/validators';
import { CheckBox, Date, Dropdown, LongText, Radio, Rating, ShortText, Time } from './../QTypes';

export default {
    components:{
        CheckBox, Date, Dropdown, LongText, Radio, Rating, ShortText, Time
    },
    data() {
        return {
            survey: {},
            questions:[],
            responses: [],
            enableToast: false,
            loader: false,
            toastText: 'asa',
            buttonText: 'Save',
            error: ""
        };
    },
    mounted () {
        this.getSingleSurvey();
        this.getQuestions();
    },
    methods: {
        getAnswer($event, index){
            this.responses[index].answer = $event
        },
        getResponse(){
            this.loader = true;
            let body = { slug:this.$route.params.survey }
            service.onPost(url.response_get_by_id, body)
            .then(result => {
                this.loader = false;
                if (result.data) {
                    this.responses = JSON.parse(result.data.fullresponse);
                } else {
                    this.questions.forEach((item)=>{
                        this.responses.push({question:item.q_name});
                    })
                }
            }).catch(error => {
                console.log(error)
            })
        },
        getQuestions(){
            this.loader = true;
            let body = { slug:this.$route.params.survey }
            service.onPost(url.questions_get_by_id, body)
            .then(result => {
                this.loader = false;
                if (result.data) {
                    this.questions = JSON.parse(result.data.fullquestion);
                }
                this.getResponse();
            }).catch(error => {
                console.log(error)
            })
        },
        getSingleSurvey(){
            this.loader = true;
            let body = { slug:this.$route.params.survey }
            service.onPost(url.survey_get_by_id, body)
            .then(result => {
                this.loader = false;
                this.survey = result.data;
            }).catch(error => {
                console.log(error)
            })
        },
        responseSaveUpdate(){
            this.loader = true;
            let http_url;
            if (this.isUpdate) {
                http_url = url.response_update;
            } else {
                console.log(this.responses);
                http_url = url.response_save;
            }
            let body = {responses: JSON.stringify(this.responses), slug:this.$route.params.survey}
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
                this.toastText = "Response saved successfully."
                setTimeout( () => this.$router.push({name:'Survey Preview', params:{survey:this.$route.params.survey}}), 3000);
            }).catch(error => {
                console.log(error)
            })
		}
    }
};
</script>

<style scoped>
.required{
    color: red;
}
</style>