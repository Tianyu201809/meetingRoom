/**
 * 通知信息相关接口
 */
import axios from 'axios'
import store from '../store'
import { getToken } from './token'
import { getLocalProp } from './localMethods'

export const createNotification = (obj) => {
	axios.defaults.headers['Authorization'] = getToken()
	obj.createdBy = {
		userName: getLocalProp('userName'),
		email: getLocalProp('email'),
	}

	return axios({
		url: '/notification/createNotification',
		method: 'post',
		data: obj,
	})
}

/**
 * 修改查询通知方法
 * @param {*} _id
 * @param {*} obj
 */
export const editNotification = (_id, obj) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/notification/createNotification',
		method: 'post',
		data: {
			_id,
			obj,
		},
	})
}

/**
 * 传递三个值 1部门编号，limit，skip
 * @param {*} limit
 * @param {*} skip
 */
export const queryNotification = ({
	department = null,
	limit = 10,
	skip = 0,
}) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/notification/queryNotification',
		method: 'get',
		params: {
			limit: limit,
			skip: skip,
			department: department,
		},
	})
}
