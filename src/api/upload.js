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

/**
 * 文件下载
 */
export const downloadFile = (url, filename) => {
	axios.defaults.headers['Authorization'] = getToken()
	return axios({
		url: '/upload/download',
		method: 'post',
		data: {
			url,
			filename,
		},
		responseType: 'arraybuffer',
	})
}

// download(config,filename){
//     config['responseType'] = 'arraybuffer';//关键点1

//     // config['blobType'] = 'application/vnd.ms-excel';
//     const blobType = 'application/force-download';//关键点2
//     const theConfig = this._configSerialize(config);//这里可忽略，我封装的对config进行序列化设置后才能返回给axios用的方法
//     return axios(theConfig).then((res) => {

//       const blobo = new Blob([res.data],{type:blobType})

//       const archor = document.createElement('a');
//       const href = window.URL.createObjectURL(blobo)//关键点3
//       archor.setAttribute('href',href)
//       // /* 关键之处：使用download属性必须要html5的页面才行 ，而且它不会刷新，文件名及扩展名均由这里控制*/
//       archor.setAttribute('download',filename)//关键点4
//       archor.click();
//        return true;
//     })
//   }
