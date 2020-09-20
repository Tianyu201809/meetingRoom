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
		url: '/notification/editNotification',
		method: 'post',
		data: {
			_id,
			obj,
		},
	})
}

/**
 * 传递5个值 1部门编号，2状态 3limit（查询数量），4skip（跳过数量）
 * @param {*} limit
 * @param {*} skip
 */
export const queryNotification = ({
	department = null,
	status = undefined,
	limit = 10,
	skip = 0,
	sort = 1,
}) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/notification/queryNotification',
		method: 'get',
		params: {
			limit: limit,
			skip: skip,
			department: department,
			status: parseInt(status) || undefined,
			sort: sort,
		},
	})
}

/**
 * 获取通知数量
 * //0代表未发布， 1代表已发布， 2已撤销
 */
export const queryNotificationCount = ({ department, status }) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/notification/queryNotificationCount',
		method: 'get',
		params: {
			department: department,
			status: parseInt(status) || undefined,
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
