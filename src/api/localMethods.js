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
<<<<<<< HEAD
 * @param {*} func 
 * @param {*} delay 
=======
 * @param {*} func
 * @param {*} delay
>>>>>>> 8147be6406ef915fc26910f46ffa0ac6f9d5aaf2
 */
export const debounce = function(fn, delay) {
	let timer // 维护一个 timer
	return function() {
		let _this = this // 取debounce执行作用域的this
		let args = arguments
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(function() {
			fn.apply(_this, args)
			//用apply指向调用debounce的对象，相当于_this.fn(args);
		}, delay)
	}
}

/**
 * 说明：
 * 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数
 *
 * @param {function} *func 需要节流处理的函数名称
 * @param {number} *wait 延时时间
 */
export const throttle = function(func, wait) {
	let previous = 0
	return function() {
		let now = Date.now()
		let that = this
		let args = arguments
		if (now - previous > wait) {
			func.apply(that, args)
			previous = now
		}
	}
}

/**
 * 日期格式转化函数
 */

export const dateformatTransform = (dateString, format) => {
	return dayjs(new Date(dateString)).format(format)
}
