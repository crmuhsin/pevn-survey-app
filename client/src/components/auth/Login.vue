<template>
<div class="container">
    <div class="row">
        <form class="form-signin">
			<div class="text-center mb-4">
				<img class="mb-4" src="../../assets/logo.png" alt="" width="72" height="72">
				<h1 class="h3 mb-3 font-weight-normal">Online Survey App</h1>
			</div>
			<div class="alert alert-danger" v-if="error">
				<span>{{error}}</span>
			</div>
			<div class="form-label-group">
				<input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="formData.email" autofocus autocomplete="off">
				<label for="inputEmail">Email address</label>
			</div>

			<div class="form-label-group">
				<input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="formData.password" autocomplete="off">
				<label for="inputPassword">Password</label>
			</div>
			<div class="checkbox mb-3">
				<label><input type="checkbox" value="remember-me"> Remember me</label>
			</div>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="login()">Sign in</button>
			<p class="text-center">If you are not a member, <a href="register">Register</a></p>

		</form>
    </div>
</div>   
</template>

<script>
import {url} from "@/urls";
import {service} from '@/services';
import * as _ from 'underscore';
import { validators } from '@/services/validators';

export default {
	data(){
		return {
			formData:{},
			error : ""
		}
	},
	mounted(){
		let token = localStorage.getItem("token")
		if (token) {
			this.$router.push({name:'Dashboard'})
		}
	},
	methods:{
		login(){
			this.error = validators.loginForm(this.formData);
			if (this.error === '') {
				let body = _.clone(this.formData);
				service.onPost(url.auth_user_login, body)
				.then(result => {
					localStorage.setItem("token", result.data.token)
					setTimeout( () => this.$router.push({name:'Dashboard'}), 3000);
				}).catch(error => {
					this.error = "Email or password not matched."
					this.$log.error(error)
				})
			}
		}
	}
}
</script>

<style scoped>
@import '../../assets/floating-label.css';
</style>