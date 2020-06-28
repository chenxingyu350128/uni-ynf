import qs from 'qs'
import store from '@/store.js'
let Fly

// #ifdef MP-WEIXIN
Fly = require("flyio/dist/npm/wx")
// #endif
// #ifndef MP-WEIXIN
Fly = require("flyio/dist/npm/fly")
// #endif

// 初始设置
const fly = new Fly
fly.config.timeout = 5000
fly.config.baseURL = 'http://mobile.yinaf.com'

//请求拦截
fly.interceptors.request.use(
	config=>{
		config.body = qs.stringify(config.body)
		const token = store.state.app.token
		if(token){
			config.headers = {
				token
			}
		}
		console.log(config)
		if(config.method === "post"){
			const uploadUrl = [
				'/mobile/user/sendMessage',
				'/mobile/file/fileUpload'
			]
			if(!uploadUrl.includes(config.url)){
        config.body = qs.stringify(config.body)
				config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			}else{
				config.headers['Content-Type'] = 'multipart/form-data'
			}
		}
		// if(config.method === "get"){
		// 	config.params = qs.stringify(config.body)
		// }
    store.commit('SET_LOADING', true)
		return config
	},
	err=>{
		return err;
	}
)
//响应拦截
fly.interceptors.response.use(
	config=>{
		if (config.data.code==5107){
			store.commit('CLEAR_STATE')
			// store.commit('CLEAR_ALL_MEMBER_STATE')
			uni.navigateTo({
				url: '@/pages/login/login'
			})
			// router.replace('/login')
		}
		if (config.data.code==5120){
			store.commit('CLEAR_STATE')
			store.commit('CLEAR_ALL_MEMBER_STATE')      
			// router.replace('/login')
			uni.navigateTo({
				url: '@/pages/login/login'
			})
		}
		if (!config.data.success&&config.data.code!='2019') {
			uni.showToast({
				title: config.data.msg,
				icon: 'none'
			})    
		}
		setTimeout(() => {
			store.commit('SET_LOADING', false)
		}, 300);

		return config;
	},
	err=>{
		setTimeout(() => {
			store.commit('SET_LOADING', false)
		}, 300);
		return err
	}
)
export default { fly }