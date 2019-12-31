<template>
<div class="container">
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
        <div class="col-12">
            <router-link tag="button" class="btn btn-warning float-right" :to="{name:'Questions', params:{survey:$route.params.survey}}">Edit</router-link>
            <div class="col-8">
                <label>Survey Name</label>
                <h3><p>{{survey.surveyname}}</p></h3>
            </div>
            
        </div>
        <hr>
        <div class="col-12">
            {{questions}}
        </div>
        <hr>
        <div class="col-12">
            <h2>Preview</h2>
            <div class="jumbotron">
                <div class="card mb-4" v-for="(item, index) in questions" :key="index">
                    <div class="card-body">
                        <p class="card-text">Question {{index+1}}</p>
                        <p class="card-text">
                            {{item.q_name}}
                            <span class="required" v-if="item.is_required">*</span>
                        </p>
                        <p class="card-text mt-2">
                            <LongText v-if="item.qtype=='longText'" :setter="false"/>
                            <ShortText v-else-if="item.qtype=='shortText'"  :setter="false"/>
                            <Dropdown v-else-if="item.qtype=='dropdown'" :choices="item.qchoices"  :setter="false"/>
                            <Radio v-else-if="item.qtype=='radio'" :choices="item.qchoices"  :setter="false"/>
                        </p>
                    </div>
                </div>
            </div>
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