/**
 * 会议预约，查询，删除，相关接口
 */

import axios from 'axios'
import { getToken } from './token'

//作用于查询预约记录页面的接口

//1.用于分页查询的数量查询接口
export const getQueryAppointCount = (filter) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios.get('/appointment/getQueryListCount', {
		params: filter,
	})
}

//2.数据查询接口
export const queryAppointment = (
	{ title, meetingDate, meetingRoomNumber },
	limit = 10,
	skip = 0
) => {
	//limit代表查询几条数据, 设置默认值 10， skip代表跳过几条数据，默认值为0
	axios.defaults.headers['Authorization'] = getToken()

	return axios.post('/appointment/getAppoList', {
		data: {
			filter: {
				title,
				meetingDate,
				meetingRoomNumber,
			},
			limit: limit,
			skip: skip,
		},
	})
}

/**
 *
 */

//作用于开始的index页面的今日会议的接口

//1.用于分页查询的数量查询接口
export const getUserJoinedMeetingCount = ({ email, meetingDate }) => {
	axios.defaults.headers['Authorization'] = getToken()
	return new Promise((resolve, reject) => {
		axios
			.get('/appointment/queryUserJoinedMeetingCount', {
				params: {
					email,
					meetingDate,
				},
			})
			.then((res) => {
				resolve(res)
			})
			.catch((e) => {
				console.log(e)
				reject('调用queryUserJoinedMeetingCount接口失败')
			})
	})
}
//2.当前登录用户是会议的参与人，或者发起人当日的会议
export const userJoinedMeeting = ({
	email,
	meetingDate,
	skip = 0,
	limit = 3,
}) => {
	axios.defaults.headers['Authorization'] = getToken()
	return new Promise((resolve, reject) => {
		axios
			.get('/appointment/queryUserJoinedMeetingItems', {
				params: {
					email,
					meetingDate,
					skip,
					limit,
				},
			})
			.then((res) => {
				resolve(res)
			})
			.catch((e) => {
				console.log(e)
				reject('调用queryUserJoinedeetingCount接口失败')
			})
	})
}

/**
 * 创建预约
 */
export const createAppointment = (data) => {
	axios.defaults.headers['Authorization'] = getToken()

	return axios({
		url: '/appointment/createAppointment',
		method: 'POST',
		data: data,
	})
}

/**
 * 删除预约
 */
export const deleteAppointmentItem = (id) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios.post('/appointment/deleteAppointmentItem', {
		id,
	})
}

/**
 * 修改预约
 */
export const updateAppointmentItem = (id, obj) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/appointment/updateAppointmentItem',
		method: 'post',
		data: {
			id: id,
			obj: obj,
		},
	})
}

/**
 * 查询单条预约信息
 */
export const queryAppointmentDetail = (id) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/appointment/queryAppointmentDetail',
		method: 'get',
		params: {
			id: id
		},
	})
}
