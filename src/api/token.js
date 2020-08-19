/**
 * 设置token和获取token
 */
export const getToken = () => {
	return localStorage.getItem('token')
}

export const setToken = (token) => {
	localStorage.setItem('token', token)
}
