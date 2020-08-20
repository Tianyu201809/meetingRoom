/**
 * 设置token和获取token
 */
import Cookies from 'js-cookie'
export const getToken = (tokenName = 'token') => {
	return Cookies.get(tokenName)
}

export const setToken = (token, tokenName = 'token') => {
   Cookies.set(tokenName, token)
}
