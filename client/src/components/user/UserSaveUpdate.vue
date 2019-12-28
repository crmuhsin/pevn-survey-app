<template>
<div class="container">
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
        <form class="form col-6">
            <div class="form-group">
                <label>User Name</label>
                <input type="text" class="form-control" placeholder="User Name" v-model="user.username">
            </div>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control" placeholder="Full Name" v-model="user.fullname">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" placeholder="Email" v-model="user.email">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="text" class="form-control" placeholder="Password" v-model="user.password">
            </div>
            <button class="btn btn-primary" @click.prevent="userSaveUpdate">{{ buttonText }}</button>
        </form>
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" v-if="enableToast">
            <div class="toast-body">
                {{ toastText }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {surl} from '../../urls';
import axios from 'axios';
import _ from 'underscore';
export default {
    data() {
        return {
            user: {},
            enableToast: false,
            loader: false,
            toastText: 'asa',
            buttonText: 'Save',
        };
    },
    created() {
    },
    mounted () {
        if(this.$route.params.id){
            this.getUser()
            this.buttonText = 'Update'
        }
    },
    methods: {
        getUser(){
            let http_url = surl.baseUrl+ surl.user_get_by_id;
            let body = { userid: this.$route.params.id }
            axios({
                    url: http_url,
                    headers: { 'Content-Type': 'application/json'},
                    data: body,
                    method: "post"
                }).then(response => {
                    this.user = response.data;
                })
        },
        userSaveUpdate() {
            if (this.user.username && this.user.fullname && this.user.email && this.user.password){
                this.loader = true;
                let http_url = '';
                if(this.$route.params.id){
                    http_url = surl.baseUrl+ surl.user_update;
                    this.user.userid = this.$route.params.id;
                } else{
                    http_url = surl.baseUrl+ surl.user_save;
                }
                
                let body = _.clone(this.user);
                axios({
                    url: http_url,
                        headers: { 'Content-Type': 'application/json'},
                        data: body, 
                        method: "post"
                }).then(response => {
                    this.toastText = response.data;
                    this.enableToast = true;
                    this.loader = false;
                    setTimeout(() => {
                        this.enableToast = false;
                    }, 2000);
                }).catch(error => {
                    this.$log.error(error)
                })
                // this.user = {}
            }
        },
    }
};
</script>

<style scoped>
</style>