/**
 * 获取会议室下拉列表数据
 */
import axios from 'axios'



/**
 * 获取全部的会议室条目
 */
export const getMeetingRoomItems = (token) => {
    axios.defaults.headers['Authorization'] = token
    return axios.get('/meetingRoom/queryMeetingRoomsList')
}


/**
 * 查询会议室信息详细信息
 */

export const querySelectMeetingRoomDetail = (token) => {
    axios.defaults.headers['Authorization'] = token
    return axios.get()
}
