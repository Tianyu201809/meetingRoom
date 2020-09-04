/**
 * 通知信息相关接口
 */
import axios from 'axios'
import store from '../store'
import { getToken } from './token'

export const createNotification = (obj) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/notification/createNotification',
		method: 'post',
		data: obj,
	})
}
