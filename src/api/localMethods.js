/**
 * 设置localStorage数据
 * @param {*string} propName  属性名
 * @param {*string} value    属性值
 */

export const setLocalProp = (propName, value) => {
	localStorage.setItem(propName, value)
}
export const getLocalProp = (propName) => {
	return localStorage.getItem(propName)
}
