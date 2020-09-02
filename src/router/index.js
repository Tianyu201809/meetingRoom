import Vue from 'vue'
import Router from 'vue-router'
import { getToken, setToken } from '@/api/token'
import store from '../store'

/**
 * 解决element-ui重复点击同一个地址时的报错代码
 */
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}
//设置一个全局导航守卫

const router = new Router({
	beforeRouteUpdate(to, from, next) {},
	routes: [
		{
			path: '/',
			redirect: '/index',
		},
		{
			path: '/',
			component: () =>
				import(/* webpackChunkName: "home" */ '../views/Home.vue'),
			children: [
				{
					path: '/index',
					name: 'index',
					component: () => import('../views/home/index.vue'),
				},
				{
					path: '/releaseNotices',
					name: 'releaseNotices',
					component: () =>
						import('../views/releaseNotices/releaseNotices.vue'),
				},
				{
					path: '/createAppointment',
					name: 'createAppointment',
					component: () =>
						import('../views/appointment/createAppointment.vue'),
				},
				{
					path: '/queryAppointment',
					name: 'queryAppointment',
					component: () =>
						import('../views/appointment/appointmentList.vue'),
				},

				{
					path: '/queryMeeting',
					name: 'queryMeeting',
					component: () =>
						import('../views/appointment/queryMeeting.vue'),
				},
				// {
				// 	path: '*',
				// 	component: () => import('../views/404.vue'),
				// },
				{
					//创建会议室
					path: '/manageMeetingRoom',
					name: 'manageMeetingRoom',

					component: () =>
						import('../views/meetingRoom/manageMeetingRoom.vue'),
				},
				{
					//查询，修改，删除会议室
					path: '/maintainMeetingRoom',
					name: 'maintainMeetingRoom',
					component: () =>
						import('../views/meetingRoom/maintainMeetingRoom.vue'),
				},
				{
					//会议室详情页
					path: '/meetingRoomDetail/:id',
					name: 'meetingRoomDetail',
					component: () =>
						import('../views/meetingRoom/meetingRoomDetail.vue'),
					meta: { title: '修改会议室信息' },
				},
				{
					//预约编辑页
					path: '/editAppointment/:id',
					name: 'editAppointment',
					component: () =>
						import('../views/appointment/editAppointment.vue'),
					meta: { title: '修改预约信息' },
				},
			],
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/login/login.vue'),
			meta: { title: '登录' },
		},
		{
			path: '/register',
			component: () => import('../views/register/register.vue'),
		},
		{
			path: '*',
			redirect: '/404',
		},
	],
})

//全局导航守卫
//当进行路由跳转时，进行token验证
//将token作为请求header
router.beforeEach((to, from, next) => {
	const token = getToken()
	debugger
	if (token) {
		store.dispatch('authorization', token).then(
			() => {
				debugger
				if (to.path === '/login') next({ name: 'index' })
				else next()
			},
			(e) => {
				console.log(e)
				next({ name: 'login' })
			}
		)
		// .catch((e) => {
		// 	setToken('')
		// 	console.log(e)
		// 	next({ name: 'login' })
		// })
	} else {
		if (to.path === '/login' || to.path === '/register') next()
		else next({ name: 'login' })
	}
})

export default router
