import Request from './request'
import store from '@/store'

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'http://mobile.yinaf.com' /* 根域名不同 */
  // config.header = {
  //   ...config.header,
  //   a: 1,
  //   b: 2
  // }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.request( //请求之前拦截器
	config=>{
		const token = store.state.app.token
		if(token) {
			config.headers = {
				token
			}
		}
		if(config.methods === "post") {
			let uploadUrl = [
				'/mobile/user/sendMessage',
				'/mobile/file/fileUpload'
			]
			if (!uploadUrl.includes(config.url)){
				// config.data = qs.stringify(config.data)
				config.headers['Content-Type']='application/x-www-form-urlencoded'
			}
			else{
				console.log('form-dataform-dataform-data');
				config.headers['Content-Type'] = 'multipart/form-data'
			}
		}
		store.dispatch('SetLoading', true)
		return config;
	},
	err=>{
		console.error(err)
		return err;
	}
)

http.interceptor.response(//请求之后拦截器
	(response) => { 
		if (response.data.code==5107){
			store.commit('CLEAR_STATE')
			store.commit('CLEAR_ALL_MEMBER_STATE')
			uni.navigateTo({
				url: '/pages/login/login.vue'
			})
		}
		if (response.data.code==5120){
			store.commit('CLEAR_STATE')
			store.commit('CLEAR_ALL_MEMBER_STATE')   
			uni.navigateTo({
				url: '/pages/login/login.vue'
			})
			router.replace('/login')
		}
		if (!response.data.success&&response.data.code!='2019') {
			uni.showToast({
				title: response.data.msg
			})     
		}
		setTimeout(() => {
			store.dispatch('SetLoading', false)
		}, 300);
		return response
	}, 
	(response) => { // 请求错误做点什么
		return response
	}
)
export {
  http
}
