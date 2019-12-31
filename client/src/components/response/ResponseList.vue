<template>
<div class="container">
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
        <div class="col-12">
            <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Responder</th>
            <th>Email</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in responses" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.respondername }}</td>
            <td>{{ item.email }}</td>
            <td>
                <!-- <router-link tag="button" class="btn btn-primary btn-sm mr-3" :to="{name:'Survey Preview', params:{survey:item.slug}}">View</router-link> -->
                <router-link tag="button" class="btn btn-secondary btn-sm mr-3" :to="{name:'New Response', params:{survey:$route.params.survey}}">Give Response</router-link>
            </td>
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

export default {
    data() {
        return {
            responses: [{respondername:'boss', email:'boss@boss'}],
            enableToast: false,
            loader: false,
            toastText: 'asa',
            buttonText: 'Save',
            error: ""
        };
    },
    mounted () {
        this.getSurveys()
    },
    methods: {
        getSurveys(){
            this.loader = true;
            let body = {}
            service.onPost(url.survey_get_list, body)
            .then(result => {
                this.loader = false;
                this.surveys = result.data.rows;
                console.log(result);
                
            }).catch(error => {
                console.log(error)
            })
        },
    }
};
</script>

<style scoped>
</style>