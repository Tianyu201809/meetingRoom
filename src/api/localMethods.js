/**
 * 设置localStorage数据
 * @param {*string} propName  属性名
 * @param {*string} value    属性值
 */

import dayjs from 'dayjs'
export const setLocalProp = (propName, value) => {
	localStorage.setItem(propName, value)
}
export const getLocalProp = (propName) => {
	return localStorage.getItem(propName)
}

/**
 * 防抖函数
 * @param {*} func
 * @param {*} delay
 */
export const _debounce = function(func, delay) {
	var timer = null
	var that = this
	delay = delay || 500
	return function() {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(function() {
			func.apply(that, args)
		}, delay)
	}
}

/**
 * 日期格式转化函数
 */

export const dateformatTransform = (dateString, format) => {
    debugger
	return dayjs(new Date(dateString)).format(format)
}
