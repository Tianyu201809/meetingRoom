import Vue from 'vue'
import Vuex from 'vuex'
import { loginUser, authorization } from '../api/user'
import { setToken } from '../api/token'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {
			userName: '',
			userId: '',
			email: '',
		},
		selectedDate: '',
	},
	getters: {},
	mutations: {},
	actions: {
		/**
		 * 注意 actions中的函数，第一个参数是默认的，我们自己传递的参数需要放在第二个位置
		 * @param {*} param0
		 * @param {*} param1
		 */
		login({ commit }, { userName, password, email }) {
			///{  }
			return new Promise((resolve, reject) => {
				loginUser({ userName, password, email })
					.then((res) => {
						if (
							parseInt(res.data.code) === 200 &&
							res.data.data.token
						) {
							setToken(res.data.data.token)
							resolve(res)
						} else {
							//
							reject({
								mes: '登录信息不匹配',
							})
						}

						console.log(res)
					})
					.catch((error) => {
						console.log(error)
						reject(error)
					})
			})
		},
		authorization({ commit }, token) {
			return new Promise((resolve, reject) => {
				authorization(token).then((res) => {
					if (res.data.code === 401) {
						try {
							setToken('')
							reject('token authorization error')
						} catch (error) {
							console.log(error)
						}
					} else {
						//每次路由跳转都会生成一个新的token
						//这样做的话，只要用户在使用系统，token就一直都是有效的
						setToken(res.data.data.token)
						resolve()
					}
				})
			})
		},
	},
	modules: {},
})
