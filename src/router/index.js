import Vue from 'vue'
import Router from 'vue-router'

/**
 * 解决element-ui重复点击同一个地址时的报错代码
 */
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}
export default new Router({
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
			],
		},
		{
			path: '/login',
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
