import Vue from 'vue'
import Router from 'vue-router'
const AppShell = () => import('@/components/AppShell')
const Login = () => import('@/components/auth/Login')
const Register = () => import('@/components/auth/Register')
const Dashboard = () => import('@/components/Dashboard')
const SurveyView = () => import('@/components/survey/SurveyView')
const SurveyList = () => import('@/components/survey/SurveyList')
const SurveySaveUpdate = () => import('@/components/survey/SurveySaveUpdate')
// const Survey = () => import('@/components/survey/Survey')
const Result = () => import('@/components/survey/SurveyView')
const Questions = () => import('@/components/survey/Questions')

Vue.use(Router)

export default new Router({
    mode: "history",
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/login',
            name: 'Security',
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: '/login',
                    name: 'Login',
                    component: Login,
                    meta: { title: 'Login' }
                },
                {
                    path: '/register',
                    name: 'Register',
                    component: Register,
                    meta: { title: 'Register' }
                },
            ]
        },
        {
            path: '',
            redirect: '/dashboard',
            name: 'AppShell',
            component: AppShell,
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                    meta: { title: 'Dashboard', requriesAuth: true}
                },
                {
                    path: '/survey-list',
                    name: 'Survey List',
                    component: SurveyList,
                    meta: { title: 'Survey List', requriesAuth: true}
                },
                {
                    path: '/new-survey',
                    name: 'New Survey',
                    component: SurveySaveUpdate,
                    meta: { title: 'New Survey', requriesAuth: true}
                },
                {
                    path: '/survey-view/:survey',
                    name: 'Survey View',
                    component: SurveyView,
                    meta: { title: 'Survey View', requriesAuth: true }
                },                
                {
                    path: '/questions/:survey',
                    name: 'Questions',
                    component: Questions,
                    meta: { title: 'Questions', requriesAuth: true}
                },
                {
                    path: '/results',
                    name: 'Result',
                    component: Result,
                    meta: { title: 'Result', requriesAuth: true }
                },                
            ]
        }
    ],
})

