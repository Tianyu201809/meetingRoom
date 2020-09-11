import axios from 'axios'
import { getToken } from './token'

export const getUploadFileList = (id) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/upload/queryAppointmentFiles',
		method: 'get',
		params: {
			id,
		},
	})
}

/**
 * 删除文件
 * 
 * @param {String} id 表单ID
 * @param {String} id 文件名（唯一）
 */
export const removeAppointmentFile = (id, url) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/upload/removeAppointmentFile',
		method: 'post',
		data: {
			id,
			url,
		},
	})
}
