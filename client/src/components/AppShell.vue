<template>
<div>
	<nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
		<a class="navbar-brand col-sm-3 col-md-2 mr-0" href="/">Survey</a>
		<!-- <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"> -->
		<ul class="navbar-nav px-3">
			<li class="nav-item text-nowrap">
				<a class="nav-link" @click="logout">Sign out</a>
			</li>
		</ul>
	</nav>
	<div class="container-fluid">
		<div class="row">
			<nav class="col-md-2 d-none d-md-block bg-light sidebar">
				<div class="sidebar-sticky">
					<ul class="nav flex-column">
						<li class="nav-item">
							<router-link class="nav-link" :to="{name:'Dashboard'}">Dashboard</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" :to="{name:'Survey List'}">Survey</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" :to="{name:'Result'}">Result</router-link>
						</li>
					</ul>
				</div>
			</nav>

			<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
				<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
					<h1 class="h2">{{ $route.name }}</h1>
					<div class="btn-toolbar mb-2 mb-md-0">
						<div class="btn-group mr-2">
							<button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
							<button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
						</div>
						<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
							<span data-feather="calendar"></span>
							This week
						</button>
					</div>
				</div>
				<div id="diffs">
					<router-view class="animated fadeIn"></router-view>
				</div>
			</main>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'appshell',
	methods: {
		logout(){
			localStorage.clear();
			this.$router.push({name:'Login'})
		}
	}
}
</script>

<style scoped>
[v-cloak] {display: none}
</style>
