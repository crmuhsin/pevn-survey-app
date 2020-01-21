<template>
<div class="container">
    <div class="row mb-1">
        <div class="col-12">
            <router-link tag="button" class="btn btn-sm btn-warning float-left" :to="{name:'Dashboard'}">Back</router-link>
            <ShareSurvey @shareData="updateToast"/>
            <router-link tag="button" class="btn btn-sm btn-outline-success float-right mr-2" :to="{name:'Questions', params:{survey:$route.params.survey}}">Edit</router-link>
        </div>
    </div>
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
        <div class="col-sm-12 col-lg-9 mx-auto">
            <h3><p><label>Survey Name</label></p></h3>
            <span v-if="updateSurvey" class="row mx-auto">
                <input type="text" id="inputSurveyname" class="form-control col-8" v-model="survey.surveyname" autocomplete="off" autofocus @blur="updateSurvey=false">
                <button class="btn btn-secondary btn-sm ml-1 col-2" type="submit" @click.prevent="saveUpdateSurvey()">Update</button>
            </span>
            <span v-else>
                <h4 class="text-muted float-left" @click="updateSurvey=true">{{survey.surveyname}}</h4>
                <i class="fas fa-edit ml-5 float-left" @click="updateSurvey=true"></i>
            </span>
            <br><hr>
            <h2>Preview</h2>
            <div class="jumbotron canvas">
                <div class="card mb-4" v-for="(item, index) in questions" :key="index">
                    <div class="card-body">
                        <span class="card-text">Question {{index+1}}</span>
                        <span class="card-text">
                            {{item.q_name}}
                            <span class="required" v-if="item.is_required">*</span>
                        </span>
                        <span class="card-text">
                            <LongText v-if="item.qtype=='longText'" :setter="false"/>
                            <ShortText v-else-if="item.qtype=='shortText'"  :setter="false"/>
                            <CheckBox v-else-if="item.qtype=='checkBox'" :choices="item.qchoices"  :setter="false"/>
                            <Radio v-else-if="item.qtype=='radio'" :choices="item.qchoices"  :setter="false"/>
                            <Rating v-else-if="item.qtype=='rating'" :choices="item.qchoices" :setter="false"/>
                            <Date v-else-if="item.qtype=='date'" :setter="false"/>
                            <Time v-else-if="item.qtype=='time'" :setter="false"/>
                        </span>
                    </div>
                </div>
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
import ShareSurvey from './ShareSurvey';

export default {
    components:{
        CheckBox, Date, LongText, Radio, Rating, ShortText, Time, ShareSurvey
    },
    data() {
        return {
            survey: {},
            questions:[],
            surveyname: '',
            enableToast: false,
            loader: false,
            toastText: '',
            buttonText: 'Save',
            error: "",
            color: '',
            updateSurvey: false
        };
    },
    mounted () {
        this.getSingleSurvey();
        this.getQuestions();
    },
    methods: {
        updateToast(variable){
            this.enableToast = true;
            this.color = variable.color;
            this.toastText = variable.toastText;
            setTimeout(() => {
                this.enableToast = false;
            }, 1000);
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
        saveUpdateSurvey(){
            this.updateSurvey = false;
            this.loader = true;
            let body = _.clone(this.survey);
            console.log(body);
            service.onPost(url.survey_update, body)
            .then(result => {
                this.loader = false;
                this.enableToast = true;
                if (result.status != 200){
                    this.color = "red"; 
                    this.toastText =  "Something Went wrong";
                    setTimeout(() => {this.enableToast = false;}, 3000);
                    return;
                }
                this.color = "green"; 
                this.toastText = "Survey updated successfully."
                setTimeout(() => {
                    this.enableToast = false;
                    this.getSingleSurvey();
                }, 1000);
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
.canvas{
    height: 50vh;
    overflow-y: auto; 
}
</style>