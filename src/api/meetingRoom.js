/**
 * 获取会议室下拉列表数据
 */
import axios from 'axios'
import store from '../store'
import { getToken } from './token'

/**
 * 获取全部的会议室条目
 */
export const getMeetingRoomItems = (filter) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios.post('/meetingRoom/queryMeetingRoomsList', {
		data: filter,
	})
}

/**
 * 查询会议室信息详细信息
 */

export const querySelectMeetingRoomDetail = () => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios.get()
}

export const createMeetingRoom = ({
	meetingRoomName,
	meetingRoomNumber,
	meetingRoomStatus,
	meetingRoomSize,
	hasMedia,
	createdBy,
	description,
}) => {
	axios.defaults.headers['Authorization'] = getToken()
	debugger
	return axios({
		url: '/meetingRoom/addMeetingRoom',
		method: 'POST',
		data: {
			meetingRoomName,
			meetingRoomNumber,
			meetingRoomStatus,
			meetingRoomSize,
			hasMedia,
			createdBy,
			description,
		},
	})
}

export const deleteMeetingRoomItem = (meetingRoomId) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/meetingRoom/deleteMeetingRoomInfo',
		method: 'post',
		data: {
			meetingRoomId,
		},
	})
}

export const getMeetingRoomCount = (filter) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/meetingRoom/queryMeetingRoomsCount',
		method: 'post',
		data: filter,
	})
}
