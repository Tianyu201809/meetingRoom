/**
 * 通知信息相关接口
 */
import axios from 'axios'
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

/**
 * 获取通知数量
 */
export const queryNotificationCount = ({ department }) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/notification/queryNotificationCount',
		method: 'get',
		params: {
			department: department,
		},
	})
}

/**
 * 查询详细通知
 */
export const queryNoticesDetail = (id) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/notification/queryNoticesDetail',
		method: 'get',
		params: {
			id,
		},
	})
}

/**
 * 删除通知
 */
export const deleteNotices = (id) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/notification/deleteNotices',
		method: 'post',
		data: {
			id,
		},
	})
}
