//import axios from './index'
import { fetchData } from './index'
import axios from 'axios'

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
	// return fetchData({
	// 	url: '/register',
	// 	methods: 'post',
	// 	data: {
	// 		userName,
	// 		email,
	// 		password,
	// 	},
	// })
	return axios({
		url: 'http://localhost:3000/users/register',
		method: 'post',
		data: {
			userName,
			email,
			password,
		},
	})
}

export const loginUser = ({ userName, password, email }) => {
	return axios({
		url: 'http://localhost:3000/users/login',
		method: 'post',
		data: {
			userName,
			email,
			password,
		},
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
	return axios.get(`http://localhost:3000/users/getUserEmail/?userName=${userName}`)
}
