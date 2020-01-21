<template>
<span>
    <button type="button" class="btn btn-sm btn-outline-secondary float-right" data-toggle="modal" data-target="#shareModal">
        Share
    </button>
    <div class="modal fade" id="shareModal" tabindex="-1" role="dialog" aria-labelledby="shareModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Share this survey</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" placeholder="Email" v-model="data.email"/>
                    <div class="alert alert-danger" v-if="error">
                        <span>{{error}}</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" :disabled="disableSave" class="btn btn-success btn-sm" @click="checkEmailExists">Save</button>
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</span>
</template>
<script>
import {url} from '@/urls';
import {service} from '@/services';
import * as _ from 'underscore';

export default {
    name: 'ShareSurvey',
    data(){
        return {
            data: {},
            error: ''
        }
    },
    computed: {
        disableSave(){
            if(this.data.email) return false;
            else return true;
        },
    },
    methods: {
        checkEmailExists(){
            let re = /\S+@\S+\.\S+/;
            if (!re.test(this.data.email)) {
                this.error = 'Invalid Email';
                return ;
            }
            let data = _.clone(this.data);
            service.onPost(url.auth_user_check_user, data)
            .then(result => {
                if (result.data.rowCount > 0 ) {
                    this.error = '';
                    setTimeout(() => {
                        this.closeOneModal();
                        this.shareThisSurvey();
                    }, 1000);
                } else {
                    this.error = "this email does not exist."
                }
            }).catch(error => {
                console.log(error)
            })
        },
        closeOneModal() {
            const modal = document.getElementById('shareModal');
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('style', 'display: none');
            const modalBackdrops = document.getElementsByClassName('modal-backdrop');
            document.body.removeChild(modalBackdrops[0]);
        },
        async shareThisSurvey(){
            this.data.slug = this.$route.params.survey;
            let body = _.clone(this.data);
            service.onPost(url.survey_share, body)
            .then(result => {
                if (result.status != 200){
                    this.emmited = {
                        color: 'red',
                        toastText: "Something Went wrong"
                    }
                } else if(result.data.mycode == 2) {
                    this.emmited = {
                        color: 'green',
                        toastText: result.data.message
                    }
                }
                else{
                    this.emmited = {
                        color: 'green',
                        toastText: "Survey shared successfully."
                    }
                } 
                this.data = {}
                this.$emit("shareData", this.emmited);
            }).catch(error => {
                console.log(error)
            })
        }
    },
  };
</script>
<style>
</style>