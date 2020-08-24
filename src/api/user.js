//import axios from './index'
//import { fetchData } from './index'
import axios from 'axios'
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
