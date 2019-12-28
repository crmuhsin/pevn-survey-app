<template>
<div class="container">
    <div class="loader" v-if="loader"></div>
    <div class="row" v-else>
    </div>
</div>
</template>

<script>
import {url} from '@/urls';
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
            let http_url = url.baseUrl+ url.user_get_by_id;
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
                    http_url = url.baseUrl+ url.user_update;
                    this.user.userid = this.$route.params.id;
                } else{
                    http_url = url.baseUrl+ url.user_save;
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