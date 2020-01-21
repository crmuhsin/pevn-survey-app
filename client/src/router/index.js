import Vue from 'vue'
import Router from 'vue-router'
const AppShell = () => import('@/components/AppShell')
const Login = () => import('@/components/auth/Login')
const Register = () => import('@/components/auth/Register')
const Dashboard = () => import('@/components/Dashboard')
const SurveyList = () => import('@/components/SurveyList')
const SurveyPreview = () => import('@/components/survey/SurveyPreview')
const SurveySaveUpdate = () => import('@/components/survey/SurveySaveUpdate')
const Questions = () => import('@/components/survey/Questions')
const ResponseList = () => import('@/components/response/ResponseList')
const NewResponse = () => import('@/components/response/ResponseSaveUpdate')
const Profile = () => import('@/components/user/UserProfile')

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
                    path: '/new-survey',
                    name: 'New Survey',
                    component: SurveySaveUpdate,
                    meta: { title: 'New Survey', requriesAuth: true}
                },
                {
                    path: '/survey-preview/:survey',
                    name: 'Survey Preview',
                    component: SurveyPreview,
                    meta: { title: 'Survey Preview', requriesAuth: true }
                },                
                {
                    path: '/questions/:survey',
                    name: 'Questions',
                    component: Questions,
                    meta: { title: 'Questions', requriesAuth: true}
                },
                {
                    path: '/responses/:survey',
                    name: 'Response List',
                    component: ResponseList,
                    meta: { title: 'Response List', requriesAuth: true }
                }, 
                {
                    path: '/survey-list-response',
                    name: 'Survey List',
                    component: SurveyList,
                    meta: { title: 'Survey List', requriesAuth: false }
                },
                {
                    path: '/create-response/:survey',
                    name: 'New Response',
                    component: NewResponse,
                    meta: { title: 'New Response', requriesAuth: false }
                }, 
                {
                    path: '/profile',
                    name: 'Profile',
                    component: Profile,
                    meta: { title: 'Profile', requriesAuth: true }
                }, 
            ]
        }
    ],
})

