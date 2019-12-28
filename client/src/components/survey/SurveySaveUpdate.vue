<template>
<div class="container">
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
        <div class="col-lg-8 col-xl-8">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">New Survey</h5>
					<form class="form">
						<div class="alert alert-danger" v-if="error">
							<span>{{error}}</span>
						</div>
						<div class="form-label-group mb-2">
							<label for="inputSurveyname">Survey Name</label>
							<input type="text" id="inputSurveyname" class="form-control" placeholder="Survey Name" v-model="survey.surveyname" autocomplete="off">
						</div>
						<div class="form-label-group mb-2">
							<label for="inputSurveyslug">Survey Slug</label>
							<input type="text" id="inputSurveyslug" class="form-control" placeholder="Survey Slug" v-model="survey.surveyslug" autocomplete="off">
						</div>
						<button class="btn btn-primary mx-auto col-2" type="submit" @click.prevent="checkUniqueSlugAndSave()">{{ buttonText }}</button>
					</form>
				</div>
			</div>
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
import { validators } from '@/services/validators';

export default {
    data() {
        return {
            survey: {},
            enableToast: false,
            loader: false,
            toastText: '',
            buttonText: 'Save',
            error: ''
        };
    },
    mounted () {
        if(this.$route.params.survey){
            this.getSurveys()
            this.buttonText = 'Update'
        }
    },
    methods: {
        checkUniqueSlugAndSave(){
            this.error = validators.surveyForm(this.survey);
            if (this.error === '') {
                let body = _.clone(this.survey);
                service.onPost(url.survey_check_slug, body)
                .then(result => {
                    if (result.data.rowCount > 0 ) {
                        this.error = "There is a slug already.";
                        return;
                    }
                    this.surveySaveUpdate();
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        surveySaveUpdate(){
			if (this.error === '') {
                this.loader = true;
                let body = _.clone(this.survey);
				service.onPost(url.survey_save, body)
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
                    setTimeout(() => {
                        this.enableToast = false;
                    }, 3000);
					// setTimeout( () => this.$router.push({name:'Survey View', params:{survey:this.survey.surveyslug}}), 3000);
				}).catch(error => {
					console.log(error)
				})
			}
		}
    }
};
</script>

<style scoped>
</style>