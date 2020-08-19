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
fly.config.baseURL = 'https://www.yinaf.net'
// fly.config.baseURL = 'http://192.168.1.101:8090/yinaf'

//请求拦截
fly.interceptors.request.use(
	config=>{
		config.body = qs.stringify(config.body)
		// const token = store.state.app.token
		// if(token){
		// 	config.headers = {
		// 		token
		// 	}
		// }
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
    uni.showLoading({
      title: '加载中'
    })
    store.commit('SET_SINGLE_ITEM', ['isLoading', true])
		return config
	},
	err=>{
		return err;
	}
)
//响应拦截
fly.interceptors.response.use(
	config=>{
    if (!config.data.success&&config.data.code!='2019') {
    	uni.showToast({
    		title: config.data.msg,
    		icon: 'none'
    	})    
    }
    const reloadCodes = ['5001', '5120', '5107']
		if (reloadCodes.includes(config.data.code)){
      uni.$emit('routerToLogin')
      // uni.navigateTo({
      //     url: '/pages/firstCome/firstCome.vue'
      // });
      // uni.navigateTo('/pages/login/login')
      // console.log(uni)
			store.commit('CLEAR_LOCAL')
			// router.replace('/login')
		}

		setTimeout(() => {
      store.commit('SET_SINGLE_ITEM', ['isLoading', false])
      uni.hideLoading()
		}, 300);
    // console.log(config)
		return config;
	},
	err=>{
		setTimeout(() => {
      store.commit('SET_SINGLE_ITEM', ['isLoading', false])
      uni.hideLoading()
		}, 300);
		return err
	}
)
export default { fly }