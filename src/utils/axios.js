import axios from 'axios'
import { baseUrl } from '@/config/index'
export class Request {
	constructor(baseUrl) {
		this.baseUrl = this.baseUrl
		this.queue = {} //请求队列，当队列里面没有请求的时候（即全部请求相应完成）那么关闭全局loading，
	}
	getInsideConfig() {
		const config = {
			baseUrl: 'http://localhost:3000',
			headers: {},
		}
		return config
	}
	request(options) {
        //创建axios请求对象
        debugger;
		const instance = axios.create({ timeout: 5000 })
        //合并对象
        const config = this.getInsideConfig()
		const op = Object.assign({}, config, options)
		console.log(op)
		return instance(op, options.url)
	}
	//请求过滤器
	interceptors(instance, url) {
		instance.interceptors.request.use(
			(config) => {
				//添加一个全局的loading
				//这里可以添加全局的遮罩层
				if (Object.keys(this.queue).length) {
					//如果队列中存在请求
					//添加全局的show loading
					/**
					 * 以后写上
					 */
				}
				this.queue[url] = true
				return config
			},
			(error) => {
				return Priomise.reject(error)
			}
		)
		instance.interceptors.response.use(
			(res) => {
				delete this.queue[url]
				console.log()
				//响应数据过滤
				// const {data, status} = res
				// return {data, status}
				return res
			},
			(error) => {
				delete this.queue[url]
				return Promise.reject(error)
			}
		)
	}
}
