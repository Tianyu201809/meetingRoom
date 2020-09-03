//import axios from './index'
//import { fetchData } from './index'
import axios from 'axios'
import { getToken } from './token'
// import { getToken } from './token'

// export const getUserInfo = ({ userName }) => {
// 	return axios.request({
// 		url: '/getUserInfo',
// 		methods: 'get',
// 		data: {
// 			userName,
// 		},
// 	})
// }
// export const login = ({ userName, password }) => {
// 	return axios.request({
// 		url: '/index/login',
// 		method: 'post',
// 		data: {
// 			userName,
// 			password,
// 		},
// 	})
// }

// export const registerUser = ({ userName, email, password }) => {
// 	return axios.request({
// 		url: '/register',
// 		methods: 'post',
// 		data: {
// 			userName,
// 			email,
// 			password
// 		},
// 	})
// }

export const registerUser = ({ userName, email, password }) => {
	return axios({
		url: '/users/register',
		method: 'POST',
		data: {
			userName,
			email,
			password,
		},
	})
}

export const loginUser = ({ userName, password, email }) => {
	const stringData = JSON.stringify({
		userName: userName,
		password: password,
		email: email,
	})
	return axios({
		url: '/users/login',
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		data: stringData,
	})
}

export const getUserEmail = ({ userName }) => {
	// return axios.get({
	//     url: 'http://localhost:3000/users/getUserEmail',
	// 	method: 'get',
	// 	params: {
	// 		userName
	// 	}
	// })
	console.log(userName)
	return axios.get(`/users/getUserEmail/?userName=${userName}`)
}

export const authorization = (token) => {
	axios.defaults.headers['Authorization'] = token
	return axios.get('/users/authorization')
}

/**
 *
 * 获取用户权限，返回结果为1，2，3
 * @param {*String} userName用户的登录名称
 * 1:普通用户
 * 2：管理员
 * 3：超级管理
 */
export const getUserRole = (userName) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios.get('/users/queryUserRole', {
		params: {
			userName,
		},
	})
}

/**
 * 获取用户列表
 * group参数为以后扩展使用
 */
export const getUserList = (group) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/users/queryUserList',
		method: 'get',
		params: {
			group: group,
		},
	})
}
