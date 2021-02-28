import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/api/token'
import store from '../store'

/**
 * 解决element-ui重复点击同一个地址时的报错代码
 */
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}

/**
 * 今后扩展：1
 * 根据用户的role权限，加载不同的导航树列表
 */
const router = new Router({
	beforeRouteUpdate(to, from, next) {},
	routes: [
		{
			path: '/',
			redirect: '/index',
		},
		{
			path: '/login',
			name: 'login',
			//redirect: '/login',
			component: () => import('../views/login/login.vue'),
			meta: { title: '登录' },
		},
		{
			path: '/404',
			name: '404',
			//redirect: '/login',
			component: () => import('../views/404.vue'),
			meta: { title: '未找到指定页面' },
		},
		{
			path: '/',
			component: () =>
				import(/* webpackChunkName: "home" */ '../views/Home.vue'),
			children: [
				{
					path: 'index',
					name: 'index',
					component: () => import('../views/home/index.vue'),
				},
				{
					path: 'releaseNotices',
					name: 'releaseNotices',
					component: () =>
						import('../views/releaseNotices/releaseNotices.vue'),
				},
				{
					path: 'queryNotices',
					name: 'queryNotices',
					component: () =>
						import('../views/releaseNotices/queryNotices.vue'),
				},
				{
					path: 'createAppointment',
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
					path: 'queryMeeting',
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
					path: 'createMeetingRoom',
					name: 'createMeetingRoom',
					component: () =>
						import('../views/meetingRoom/createMeetingRoom.vue'),
				},
				{
					//查询，修改，删除会议室
					path: 'maintainMeetingRoom',
					name: 'maintainMeetingRoom',
					component: () =>
						import('../views/meetingRoom/maintainMeetingRoom.vue'),
				},
				{
					//会议室详情页
					path: 'meetingRoomDetail/:id',
					name: 'meetingRoomDetail',
					component: () =>
						import('../views/meetingRoom/meetingRoomDetail.vue'),
					meta: { title: '修改会议室信息' },
				},
				{
					//预约编辑页
					path: 'editAppointment/:id',
					name: 'editAppointment',
					component: () =>
						import('../views/appointment/editAppointment.vue'),
					meta: { title: '修改预约信息' },
				},
				// {
				// 	path: '*',
				// 	redirect: '/404',  editNotices
				// },
				{
					//通知编辑页
					path: 'editNotices/:id',
					name: 'editNotices',
					component: () =>
						import('../views/releaseNotices/editNotices.vue'),
					meta: { title: '修改通知信息' },
				},
				//个人信息C:\Users\Tianyu\Desktop\meetingRoom-dev\src\views\profile\myMessage.vue
				{
					//个人信息设置页
					path: 'myMessage',
					name: 'myMessage',
					component: () => import('../views/profile/myMessage.vue'),
					meta: { title: '个人信息修改' },
				},
				{
					path: 'specify',
					name: 'specify',
					component: () => import('../views/specify/specify.vue'),
				},
				{
					path: 'myAppointment',
					name: 'myAppointment',
					component: () => import('../views/profile/myAppointment.vue'),
				},
				{
					path: '*',
					component: () => import('../views/404.vue'),
					//redirect: '/404',
				},
			],
		},
		{
			path: '/login',
			name: 'login',
			//redirect: '/login',
			component: () => import('../views/login/login.vue'),
			meta: { title: '登录' },
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('../views/register/register.vue'),
		},
		{
			path: '*',
			component: () => import('../views/404.vue'),
			redirect: '/404',
		},
	],
})

//全局导航守卫
//当进行路由跳转时，进行token验证
//将token作为请求header
router.beforeEach((to, from, next) => {
	const token = getToken()
	// if (to.fullPath == '/register') {
	// 	next()
	// }
	if (token) {
		store.dispatch('authorization', token).then(
			() => {
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
		if (to.path === '/login') next()
		else if (to.path == '/register') {
			next()
		} else next({ name: 'login' })
	}
})

export default router
