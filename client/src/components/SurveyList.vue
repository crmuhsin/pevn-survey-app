<template>
<div class="container">
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
        <div class="col-12 table-responsive mt-3">
            <h2 class="text-center">Please participate on one of our many surveys!</h2>
            <div class="float-right form-inline mb-3">
                <input class="form-control form-control-sm" type="search" placeholder="Search" v-model="searchText" @input="searchTable">
            </div>
            <table class="table table-bordered table-striped text-center">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Survey Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody v-if="surveys.length>0" class="canvas">
                    <tr v-for="(item, index) in surveys" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.surveyname }}</td>
                        <td>
                            <router-link tag="a" class="fixed-width mr-3" :to="{name:'New Response', params:{survey:item.slug}}">Give Response</router-link>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="4">Nothing to show.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" v-if="enableToast">
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
import { searchFn } from '@/services/search';

export default {
    data() {
        return {
            surveys: [],
            searchSurveys: [],
            enableToast: false,
            loader: false,
            toastText: 'asa',
            buttonText: 'Save',
            error: "",
            searchText:''
        };
    },
    mounted () {
        this.getSurveys()
    },
    methods: {
        getSurveys(){
            this.loader = true;
            let body = {}
            service.onPost(url.survey_get_list_unauth, body)
            .then(result => {
                this.loader = false;
                this.surveys = result.data.rows;
                this.searchSurveys = this.surveys;
            }).catch(error => {
                console.log(error)
            })
        },
        searchTable() {
            this.surveys = searchFn.mySearch(this.searchText, this.searchSurveys);
        }
    }
};
</script>

<style scoped>
.fixed-width {
  width: 100px;
}
.btn-new {
  width: 115px;
}
.canvas{
    overflow-y: auto;
}
@media (max-width: 768px) {
  .fixed-width{
    width: 100%;
  }
}
</style>