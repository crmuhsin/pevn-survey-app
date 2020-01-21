<template>
<div class="container">
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
        <div class="col-lg-9 col-sm-12 mx-auto">
            <div class="banner gradient-1 ">
                <div class="message alfa-3d">Provide your responses!</div>
            </div>
            <div class="banner my-1 required-text">
                <h2>{{survey.surveyname}}</h2>
                <h6 class="required">* Required</h6>
            </div>
            <div class="jumbotron" v-if="details">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Please fill the form below first to complete the survey.</h5>
                        <div class="alert alert-danger" v-if="error">
                            <span>{{error}}</span>
                        </div>
                        <div class="form-label-group mb-2">
                            <label>Name<span class="required"> *</span></label>
                            <input type="text" class="form-control" placeholder="Name" v-model="responder.name" autocomplete="off">
                        </div>
                        <div class="form-label-group mb-2">
                            <label>Email<span class="required"> *</span></label>
                            <input type="email" class="form-control" placeholder="Email" v-model="responder.email" autocomplete="off">
                        </div>
                        <button class="btn btn-primary mx-auto col-2" type="submit" @click="disableDetails">Save</button>
                    </div>
                </div>
            </div>
            <div class="jumbotron" v-else>
                <div class="card mb-4 br-10" v-for="(item, index) in questions" :key="index">
                    <div class="card-body">
                        <p class="card-text">Question {{index+1}}</p>
                        <p class="card-text">
                            {{item.q_name}}
                            <span class="required" v-if="item.is_required">*</span>
                        </p>
                        <p class="card-text mt-2">
                            <LongText v-if="item.qtype=='longText'" :setter="false" @sendValue="getAnswer($event, index)"/>
                            <ShortText v-else-if="item.qtype=='shortText'"  :setter="false" @sendValue="getAnswer($event, index)"/>
                            <CheckBox v-else-if="item.qtype=='checkBox'" :choices="item.qchoices"  :setter="false" @sendValue="getAnswer($event, index)"/>
                            <Radio v-else-if="item.qtype=='radio'" :choices="item.qchoices"  :setter="false" @sendValue="getAnswer($event, index)"/>
                            <Rating v-else-if="item.qtype=='rating'" :choices="item.qchoices" :setter="false" @sendValue="getAnswer($event, index)"/>
                            <Date v-else-if="item.qtype=='date'" :setter="false" @sendValue="getAnswer($event, index)"/>
                            <Time v-else-if="item.qtype=='time'" :setter="false" @sendValue="getAnswer($event, index)"/>
                        </p>
                    </div>
                </div>
                <button class="btn btn-success" @click.prevent="responseSaveUpdate">{{buttonText}}</button>
            </div>
        </div>
    </div>
    <div class="toast show" :style="'background-color:'+color" role="alert" aria-live="assertive" aria-atomic="true" v-if="enableToast">
        <div class="toast-body">
            {{ toastText }}
        </div>
    </div>
</div>
</template>

<script>
import {url} from '@/urls';
import {service} from '@/services';
import * as _ from 'underscore';
import { validators } from '@/services/validators';
import { CheckBox, Date, LongText, Radio, Rating, ShortText, Time } from './../QTypes';

export default {
    components:{
        CheckBox, Date, LongText, Radio, Rating, ShortText, Time
    },
    data() {
        return {
            survey: {},
            questions:[],
            responses: [],
            responder: {},
            enableToast: false,
            loader: false,
            toastText: 'asa',
            buttonText: 'Save',
            error: "",
            requiredError: [],
            isUpdate:false,
            details: true,
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
        disableDetails(){
            this.error = validators.responseMail(this.responder);
			if (this.error === '')
                this.details = false;
            else 
                this.details = true;
        },
        getQuestions(){
            this.loader = true;
            let body = { slug:this.$route.params.survey }
            service.onPost(url.questions_get_by_id, body)
            .then(result => {
                this.loader = false;
                if (result.data) {
                    this.questions = JSON.parse(result.data.fullquestion);
                    this.questions.forEach((item)=>{
                        this.responses.push({question:item.q_name});
                        this.requiredError.push(false);
                    })
                }
                this.checkRequired()
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
                this.survey.surveyname = this.survey.surveyname.charAt(0).toUpperCase() + this.survey.surveyname.slice(1)
            }).catch(error => {
                console.log(error)
            })
        },
        checkRequired(){
            let result = this.questions.map(function(item) {return item.is_required;});
            result.forEach((item, index)=>{
                if (item && this.responses[index].answer || item == false) {
                    this.requiredError[index] = false;
                } else {
                    this.requiredError[index] = true;
                    this.toastText =  "Some Required fields are not filled yet.";
                }
            });
            console.log(this.responses);
            console.log(this.requiredError);
        },
        responseSaveUpdate(){
            this.checkRequired();
            if (this.requiredError.includes(true)) {
                this.enableToast = true;
                this.color = "red"; 
                setTimeout(() => { this.enableToast = false; }, 2000);
                return;
            } else {
                this.loader = true;
                let http_url = url.response_save;
                let body = {
                    responses: JSON.stringify(this.responses), 
                    slug:this.$route.params.survey,
                    responder:this.responder.name, 
                    email:this.responder.email
                }
                body = _.clone(body);
                service.onPost(http_url, body)
                .then(result => {
                    this.loader = false;
                    this.enableToast = true;
                    if (result.status != 200){
                        this.color = "red"; 
                        this.toastText =  "Something Went wrong";
                        setTimeout(() => {this.enableToast = false;}, 1000);
                        return;
                    }
                    this.toastText = "Response saved successfully."
                    this.color = "green"; 
                    setTimeout(() => {
                        this.enableToast = false;
                        this.$router.push({name:'Survey List'})
                    }, 2000);
                }).catch(error => {
                })
            }
		}
    }
};
</script>

<style scoped>
.required{
    color: red;
}
.canvas{
    height: 80vh;
    overflow-y: auto; 
}
.banner {
  width: 100%;
  height: 100px;
  text-align: center;
  border-radius: 10px;
    padding: 20px;
}

.message {
    margin: 0 auto;
  position: relative;
  color: #fff;
  font-size: 3em;
  width: 400px;
  top: 50%;
}

.alfa-3d { 
    font-family: 'Alfa Slab One', cursive;
    transform: translateY(-50%) rotate(-10deg);
  text-align: center;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, .1), 0 0 5px rgba(0, 0, 0, .1), 0 1px 3px rgba(0, 0, 0, .3), 0 3px 5px rgba(0, 0, 0, .2), 0 5px 10px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .2), 0 20px 20px rgba(0, 0, 0, .15);
}

.gradient-1 {
    background: linear-gradient(to right, #5d4157, #a8caba); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.required-text{
    text-align: left;
    border: silver 1px solid;
}
.br-10{
    border-radius: 1rem;
}
.jumbotron{
    padding-top: 2rem;
    padding-bottom: 2rem;
}
</style>