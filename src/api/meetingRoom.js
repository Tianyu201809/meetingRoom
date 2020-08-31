/**
 * 获取会议室下拉列表数据
 */
import axios from 'axios'
import store from '../store'
import { getToken } from './token'

/**
 * 获取全部的会议室条目
 */
export const getMeetingRoomItems = () => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios.get('/meetingRoom/queryMeetingRoomsList')
}

/**
 * 查询会议室信息详细信息
 */

export const querySelectMeetingRoomDetail = () => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios.get()
}

export const createMeetingRoom = ({
	meetingRoomNumber,
	meetingRoomStatus,
	meetingRoomSize,
	hasMedia,
	description,
}) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/meetingRoom/addMeetingRoom',
		method: 'POST',
		data: {
			meetingRoomNumber,
			meetingRoomStatus,
			meetingRoomSize,
			hasMedia,
			createdBy: {
				userName: store.state.userInfo.userName,
				emial: store.state.userInfo.email,
			},
			description,
		},
	})
}

export const deleteMeetingRoomItem = (meetingRoomId) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
        url: '/meetingRoom/deleteMeetingRoomInfo',
        method:'post',
		data: {
			meetingRoomId,
		},
	})
}
