<template>
  <view
    class="login-cpnt d-flex flex-column grey lighten-3 text-center"
  >
   <u-button>sdf</u-button>
  
<!--    <view
      fluid
      class="logo pt-2 pb-4 d-flex flex-column flex-fill white--text align-center justify-center"
      xs12
    >
      <view
        class="logoCard white mt-1 d-flex flex-column align-center justify-center elevation-1"
      >
        <image :src="avatar" class="theLogo" mode="aspectFit"></image>
      </view>
      <text class="py-2 text-center subtitle-2">颐纳福</text>
      <text class="text-center caption lh1em">关爱，从这一刻开始</text>
    </view>  
    <view class="form u-rela top108rpx d-flex flex-column align-center flex-fill ">
      <view
        class="formArea white justify-self-center px-4 pt-4 py-2"
      >
        <uni-text-field
          v-model="username"
          rounded
          outlined
          @output="userName=$event"
          type="number"
          class="mb-4 text-left"
          placeholder="请输入11位手机号码"
        />
        <text class="py-2"></text>
        <uni-text-field
          v-if="showpwd"
          v-model="password"
          rounded
          outlined
          class="mb-4 text-left"
          type="password"
          placeholder="请输入密码"
          @output="password=$event"
          @keydown.enter="login"
        />
        <text class="py-2"></text>
        <uni-text-field
          v-if="showyzm"
          v-model="vCode"
          rounded
          outlined
          color="blue"
          class="mb-4 mt-4 text-left"
          type="number"
          @output="vCode=$event"
          placeholder="验证码"
        >
          <button size="mini" @click="getCode" type="primary">验证码</button>
        </uni-text-field>
        <view class="pa-0 white mt-4">
          <button @click="submit" class="btnRounded" type="primary">{{ btnText }}</button>
        </view>
        <view class="px-0 pt-2 overline white grey--text">
          {{ status?"注册":"登陆" }}即代表您已同意<text
            class="blue--text"
            @click="agreement"
          >《颐纳福隐私政策》</text>
        </view>
      </view>    
      <view
        v-if="!status&&wxBind===undefined"
        class="mt-2 px-4 extra grey--text caption d-flex justify-space-between"
      >
        <text @click="status=1">注册</text>
        <view class="flex-fill"></view>
        <text @click="showRetrieve=true">忘记密码</text>
      </view>
      <view
        v-if="status"
        class="mt-2  grey--text caption d-flex justify-space-between"
      >
        已注册过,<text
          class="blue--text"
          @click="status=0;isExist=false"
        >登录</text>
      </view>
      <view v-if="!status&&wxBind===undefined" class="flex-fill d-flex flex-column">
        <view class="grey--text text-darken-2 my-4">
          其他登陆方式
        </view>
        <view
          v-if="!status&&wxBind===undefined"
          class="pa-0 d-flex caption grey lighten-3 grey--text align-center justify-space-between flex-column flex-fill"
        >
          <uni-icons @click="wxAuth" size="55" color="#1aad19" type="mdi-wechat"></uni-icons>
          微信登陆
        </view>
      </view>
    </view>
 -->
  </view>
</template>

<script>
    // import iHeader from '../components/public/headerOnlyCenter'
    export default {
      name: 'Login',
      data: ()=>({
        username: '',
				password: '',
				setpwd: false,
				vCode: '',
        showRetrieve: false,
        isExist: false,
        fromMine: false,
        status: 0,
        seconds: 0,
				timer: '',
				realName: '',
				wxBind: undefined,
				openId: '',
				image: '',
				avatar: require('@/static/img/logo.png'),
				exitState: 0,
				exitTimeout: ''

      }),
			computed:{
				btnText(){
					if(this.wxBind===0){
						return this.setpwd?'设置':'绑定'
          }
          return this.status?'注册':'登陆'
				},
				showpwd(){
					if(this.wxBind===0 && !this.setpwd){
						return false
					}
					return true
				},
				showyzm(){
					if(this.status){
						return true
					}
					if(this.wxBind===0 && !this.setpwd){
						return true
					}
					return false
        },
        sessionId(){
          return this.$store.state.app.sessionId
        }
			},
      beforeDestroy(){
				clearInterval(this.timer)
			},
      methods: {
        textChange (e, x) {
          x = e
        },
	// 			runBack(){
 //        	this.exitState ++
 //        	//2秒后重新注册
 //        	this.exitTimeout = window.setTimeout(
 //        	  ()=>{
 //        	    this.exitState=0
 //        	    window.clearTimeout(this.exitTimeout);
 //        	  },2000
 //        	)
 //        	console.warn('zhiwei:'+this.exitState);
	
 //        	if(this.exitState>1){
 //        	  navigator.app.exitApp()
 //        	}  
	// 			},
	// 			//极光推送setAlias
	// 			setAlias(sessionId){
	// 				let that = this
	// 				if(!sessionId){
	// 					console.error('sessionId空的？登陆成功没有给sessionId?')
	// 					return
	// 				}
	// 				console.warn('开始设置alias--login');
 //   				setTimeout(
	// 					() => {
	// 						console.error('login---sessionId值为：'+localStorage.getItem('sessionId'))
	// 						window.JPush.setAlias(
	// 							{ sequence: 1, alias: sessionId },
	// 							function(r){
	// 								console.info('极光设置成功')
	// 								console.log(r)
	// 								// that.$router.replace('./index')
	// 							},
	// 							function(err){
 //                  // that.$router.replace('./index')
 //                  console.info('极光设置失败')
	// 								console.log(err)
	// 							}
	// 						)
	// 				 }, 
	// 				 200)				
	// 			},
	// 			retryBack(){
	// 				if(this.fromMine){
	// 					this.$router.back()
	// 					return
	// 				}
	// 				this.showRetrieve=false
	// 			},
	// 			reLogin(){
				// 	this.showRetrieve=false
				// 	this.$route.query=null
				// },
        getCode(){
            this.$http.get('/mobile/user/sendMsg',{params:{userNo: this.username}}).then(res=>{
              if(res.data.success){
							// this.$toast.success('验证码已发送')
              uni.showToast({
                title: '验证码已发送'
              })
                // this.showNext = true
              this.seconds = 60
              //倒计时开始
              this.timer = setInterval(()=>{
                this.seconds --
                if(this.seconds === 0){
                  clearInterval(this.timer)
                }
              },1000)                        
              }
            })
        },
        checkExist(){
            this.$http.post('/mobile/user/isUserExist',{userName: this.username})
            .then(res=>{
                if(res.data.success){
									console.log(1245);
									
                    this.login()
                }
                if(res.data.code==5000){//检测到已注册
                  this.status=!this.status
                }
            })
				},
				checkPhone(e){
    	    if(!(/^1[3456789]\d{9}$/.test(e))){ 
    	        return true; 
    	    }   
        },  
        checkpwd(e){
          
  	      if(!(/^(\w){6,20}$/.test(e))){ 
    	        return true; 
    	    }               
        }, 
        submit(){
					//微信绑定手机号
					if(this.wxBind===0 && !this.setpwd){
						if(!this.username){
							// this.$toast.warning('请输入手机号码')
							return
						}
						if(this.checkPhone(this.username)){
							// this.$toast.warning('手机号码格式错误')
							return
						}
						const data = {
							openid: this.openId,
							userName: this.username,
							realName: this.realName,
							image: this.image,
							yzcode: this.vCode
						}
						this.$http.post('/mobile/user/boundPhone',data)
						.then(res=>{
							if(res.data.success){
								if(res.data.obj.wechatType){//微信已绑定手机号
									this.setStorage(res)
									this.setAlias(this.sessionId)
									// this.$router.replace('./index')
								}else{
									this.$toast.success('微信号已绑定手机,请设置登陆密码')
									this.setpwd = true
								}
							}
						})
						return
					}
					//微信绑定手机号设置密码
					if(this.wxBind===0 && this.setpwd){
						if(!this.username){
							// this.$toast('请输入手机号')
							return
						}
						if(this.checkPhone(this.username)){
							// this.$toast.warning('手机号格式不对')
							return
						}
						if(!this.password){
							// this.$toast('请输入密码')
							return
						}
						if(this.checkpwd(this.password)){
							// this.$toast.warning('密码只能输入6-20个字母、数字、下划线')
							return
						}
						const data = {
							openid: this.openId,
							userName: this.username,
							realName: this.realName,
							image: this.image,
							passWord: this.password
						}
						this.$http.post('/mobile/user/regForWx',data)
						.then(res=>{
							if(res.data.success){
								// localStorage.removeItem('isLogOut')
								this.setStorage(res)
								this.setAlias(this.sessionId)
          	    // this.$router.replace('./index')
							}
						})
						return
					}
					//登陆和注册
					let stopProcess=false
					//表单验证放在这一步
          const verify = [
              {
                  status: !this.username,
                  remind: '请输入手机号'
              },
              {
                  status: this.checkPhone(this.username),
                  remind: '手机号格式有误，请重输'
              },
              {
                  status: !this.password,
                  remind: '请输入密码'
              },
              {
                  status: this.checkpwd(this.password),
                  remind: '密码只能输入6-20个字母、数字、下划线'
              }
					]
					if(this.status){
						verify.push({
                  status: !this.vCode,
                  remind: '请输入验证码'									
						})
					}
          verify.some(res=>{
              if(res.status){
                  // this.$toast.warning(res.remind)
                  stopProcess = true
                  return true
              }
          })
          if(stopProcess){//存在未填写的值
              return
          }
          if(this.status){//注册时
              // this.checkExist()
              return
					}
          this.login()//登陆
				},
        login(){
					const data = {
            userName: this.username,
            passWord: this.password,
          }
          if(this.status){
          	data.yzcode = this.vCode
          	// verify.push({
          	//   status: !this.vCode,
          	//   remind: '请输入验证码'
          	// })
          }
          const url = this.status?'/mobile/user/reg':'/mobile/user/login'
          this.$http.post(url,data).then(res=>{
            if(res.data.success){
              // this.$toast(this.status?'恭喜你，注册成功':'登陆成功',{
              //   color: 'success',
              //   y: 'top',
              //   icon: 'mdi-emoticon-excited-outline'
              // })
              // this.$toast.success(this.status?'恭喜你，注册成功':'登陆成功')
              if(this.status){
								this.status=!this.status
								return//注册成功返回到登陆界面
							}
							//以下为登陆成功
							// this.setStorage(res)
							// this.setAlias(this.sessionId)
              // this.$router.replace('./index')
            }
          })
        },
        agreement(){
          uni.navigateTo({
            url: "../webviewPage/webviewPage?url=" + 'http://mobile.yinaf.com/page/agreement.html'
          })
        },
        
    //     wxAuth(){
				// 	let that = this
    //       console.log(101)
    //       Wechat.isInstalled(function (installed) {
    //               // console.error("Wechat installed: " + (installed ? "Yes" : "No"));
    //       }, function (reason) {
    //               console.error("Failed: " + reason);
    //       });
    //       const scope = "snsapi_userinfo";
    //       const state = "_" + (+new Date());
    //       Wechat.auth(scope, state, function (response) {
    //               // console.error(JSON.stringify(response));
				// 					// console.error(typeof response)
				// 					that.wxLogin(response.code)
    //       }, function (reason) {
    //               console.error("Failed: " + reason);
    //       });
				// },
				
        wxLogin(code){
					this.$http.post('/mobile/user/loginForWx',{code})
					.then(res=>{
						if(res.data.success){
							localStorage.removeItem('isLogOut')
							this.openId = res.data.obj.openid
							this.wxBind = res.data.obj.wechatType
							this.realName = res.data.obj.realName
							this.image = res.data.obj.image

							if(this.wxBind){//微信已绑定手机号，直接往首页
								// this.setStorage(res)
              
								// this.$router.replace('./index')	
								// this.setAlias(this.sessionId)
								// this.$toast.success('登陆成功')
								return	
							}	
							// this.$toast.success('未绑定手机号，请绑定')
						}
					})
				},
				setStorage(res){
					this.$store.commit('SET_EACH_STATE', res.data.obj)
					// this.$router.replace('./index')
				}
      }
    }
    // history.pushState(null, null, document.URL);
    // window.addEventListener('popstate', function () {
    //     history.pushState(null, null, document.URL);
    // })
</script>

<style lang="scss" scope>
.login-cpnt{
    min-height: 100vh;
}
  .logo{
    // padding-top: 22.5px;
    height: 532rpx;
    background:linear-gradient(0deg,rgba(29,105,240,1),rgba(27, 179, 249, 1));
    .logoCard{
      width: 156rpx;
      height: 156rpx;
      border-radius: 42rpx;
      .theLogo{
        width: 114rpx;
        border-radius: unset;
      }
    }
  }
  .form{
    width: 692rpx;
    margin: 0 auto;
      .formArea{
        box-sizing: border-box;
        width: 100%;
        margin: 0 auto;
        border-radius: 10px;
        // padding: 20px;
      }
  }
  .top108rpx{
    top: -108rpx;
  }
  .extra{
    width: 100%;
  }
  .lh1em{
    line-height: 1em;
  }
</style>