<template>
  <view class="login-cpnt d-flex flex-column grey lighten-3">
		<view class="flex-fill d-flex flex-column align-center justify-center white--text logoAround py-6">
	<!-- 		<uni-avatar size="75">
			</uni-avatar> -->
			<image style="width: 75px;" src="../../static/img/logo.png" mode="widthFix"></image>
			<text class="py-2 text-center subtitle-2">颐纳福</text>
			<text class="text-center caption lh1em">关爱，从这一刻开始</text>
		</view>
		<!-- 下半部 -->
		<view class="mainBottom d-flex flex-column flex-fill">
		<!-- 输入框/周边 -->
			<!-- 区别于微信登陆 -->
			<div>
				<uni-vcard class="mx-3 pa-4 d-flex flex-column">
					<uni-text-field 
						color="#00aaef" 
						round
						placeholder="请输入账号"
						prependText="账号 :" 
						:maxlength="parseInt(11)"
						v-model="username"
						type="number"
					>
					</uni-text-field>
					<uni-text-field 
						class="mt-4"
						color="#00aaef" 
						placeholder="请输入密码"
						prependText="密码 :" 
						v-model="password"
						password
						round
						@keydown.enter="login"
						type="text"
					>
					</uni-text-field>
					<uni-text-field 
						v-if="showyzm"
						color="#00aaef" 
						class="mt-4"
						placeholder="验证码"
						prependText="验证码 :" 
						@click.stop="getCode"
						v-model="vCode"
						round
						type="number"
					>
						<template #append>
							<button plain class="px-2 caption primary" size="mini" type="primary">{{seconds?seconds:'发送验证码'}}</button>
						</template>
					</uni-text-field>
					<button  @click="submit" class="mt-4 white--text" type="primary">{{btnText}}</button>
					<uni-footer class="px-0 pt-2 overline white grey--text">
						{{ status?"注册":"登陆" }}即代表您已同意<text
							class="blue--text"
							@click="agreement"
						>《颐纳福隐私政策》</text>
					</uni-footer>
				</uni-vcard>
				<uni-row
					v-if="!status&&wxBind===undefined"
					justify="space-between"
					class="mt-2 px-4 extra grey--text caption"
				>
					<text class="blue--text" @click="status=1">注册</text>
					<text @click="showRetrieve=true">忘记密码</text>
				</uni-row>
				<uni-row
					v-if="status"
					justify="space-between"
					class="mt-2 px-4 grey--text caption"
				>
					已注册过
					<text
						class="blue--text"
						@click="status=0;isExist=false"
					>登录</text>
				</uni-row>
			</div>
			<!-- 微信登陆 -->
			<view 
				v-if="!status&&wxBind===undefined"
        class="d-flex flex-column flex-fill justify-end mt-4"
			>
				<view class="d-flex px-12 py-0 align-center mb-6">
					<hr class="flex-fill"/>
					<text class="px-2 subtitle-2 grey--text">其他登陆方式</text>
					<hr class="flex-fill"/>
				</view>
				<uni-footer
				  class="mt-4 pa-0 d-flex caption grey lighten-3 grey--text justify-end align-center flex-column"
				>
				  <uni-icons
				    color="#07c160"
				    size="55"
						type="mdi-wechat"
				    @click="wxAuth"
				  >
				  </uni-icons>
					<text class="mt-4">微信登陆</text>
				  
				</uni-footer>
			</view>
		</view>
		<!-- 账号 密码 验证码 -->
		<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- <view class="form d-flex flex-fill justify-center flex-column align-center">
      <i />
      <v-card
        color="white"
        class="text_filed justify-self-center px-4 pt-4 py-2"
      >
        <i />
        <v-text-field
          v-model="username"
          rounded
          filled
          color="blue"
          class="mb-4"
          type="number"
          placeholder="请输入11位手机号码"
        />
        <v-text-field
          v-if="showpwd"
          v-model="password"
          rounded
          filled
          dense
          color="blue"
          class="mb-4 text-left"
          type="password"
          placeholder="请输入密码"
          @keydown.enter="login"
        />
        <v-text-field
          v-if="showyzm"
          v-model="vCode"
          rounded
          outlined
          color="blue"
          class="mb-4 text-left"
          type="number"
          placeholder="验证码"
        >
          <template
            v-show="showyzm"
            v-slot:append
          >
            <v-btn
              v-show="seconds"
              small
              dark
              color="blue accent-2"
            >
              {{ seconds }}s
            </v-btn>
            <v-btn
              v-show="!seconds"
              small
              dark
              outlined
              color="blue accent-2"
              @click="getCode"
            >
              获取
            </v-btn>
          </template>
        </v-text-field>
        <uni-footer class="pa-0 white mt-4">
          <v-btn
            rounded
            large
            block
            color="blue"
            dark
            @click="submit"
          >
            {{ btnText }}
          </v-btn>
        </uni-footer>
        <uni-footer class="px-0 pt-2 overline white grey--text">
          {{ status?"注册":"登陆" }}即代表您已同意<text
            class="blue--text"
            @click="agreement"
          >《颐纳福隐私政策》</text>
        </uni-footer>
      </v-card>    
      <uni-row
        v-if="!status&&wxBind===undefined"
        class="mt-2 px-4 extra grey--text caption d-flex justify-space-between"
      >
        <text @click="status=1">注册</text>
        <v-spacer />
        <text @click="showRetrieve=true">忘记密码</text>
      </uni-row>
      <uni-row
        v-if="status"
        class="mt-2  grey--text caption d-flex justify-space-between"
      >
        已注册过,<text
          class="blue--text"
          @click="status=0;isExist=false"
        >登录</text>
      </uni-row>
      <v-container
        v-if="!status&&wxBind===undefined"
        class="d-flex px-12 py-0 align-center"
      >
        <hr />
        <text class="px-2 subtitle-2 grey--text">其他登陆方式</text>
        <hr />
      </v-container>
      <uni-footer
        v-if="!status&&wxBind===undefined"
        class="pa-0 d-flex caption grey lighten-3 grey--text align-center flex-column"
      >
        <v-icon
          color="green darken-2"
          size="55"
          @click="wxAuth"
        >
          mdi-wechat
        </v-icon>
        微信登陆
      </uni-footer>
    </view> -->
    <!-- <iHeader text="登陆"/> -->
<!--    <uni-row
      fluid
      class="logo pt-2 pb-4 d-flex flex-column flex-fill white--text align-center justify-center"
      xs12
    >
      <v-card
        elevation="16"
        class="logoCard mt-1 d-flex flex-column align-center justify-center"
      >
        <v-img
          class="theLogo"
          contain
          :src="avatar"
        />
      </v-card>
      <text class="py-2 text-center subtitle-2">颐纳福</text>
      <text class="text-center caption lh1em">关爱，从这一刻开始</text>
    </uni-row> -->


    <!-- <register @hideReg="showRegister=false" v-if="showRegister"/> -->
<!--    <retrieve
      v-if="showRetrieve"
      @reLogin="reLogin"
      @hide="retryBack"
    /> -->
  </view>
</template>

<script>
    // import iHeader from '../components/public/headerOnlyCenter'
    // import register from '../components/home/register'
    // import retrieve from '../components/home/retrieve'
    import { verify } from 'crypto'
    export default {
      name: 'loginPage',
      components: {
        // iHeader,
        // register,
        // retrieve
      },
      data: ()=>({
        username: '',
				password: '',
				setpwd: false,
				vCode: '',
				// sessionId: '',
        // showRegister: false,
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
      onunload(){
				clearInterval(this.timer)
				clearTimeout(this.exitTimeout)
				document.removeEventListener('backbutton',this.runBack,false)
			},
			onshow(){
				if(this.sessionId){
					uni.redirectTo({
						url: '../index/index'
					})
					return
				}
				document.addEventListener('backbutton',this.runBack,false)
				if(this.$route.query.modify){
					this.fromMine = this.showRetrieve = true
				}
			},
      methods: {
				emitInput(e){
					console.log(e)
				},
				runBack(){
					window.plugins.toast.showLongCenter('再点击一次退出!');
        	this.exitState ++
        	//2秒后重新注册
        	this.exitTimeout = window.setTimeout(
        	  ()=>{
        	    this.exitState=0
        	    window.clearTimeout(this.exitTimeout);
        	  },2000
        	)
        	console.warn('zhiwei:'+this.exitState);
	
        	if(this.exitState>1){
        	  navigator.app.exitApp()
        	}  
				},
				//极光推送setAlias
				setAlias(sessionId){
					let that = this
					if(!sessionId){
						console.error('sessionId空的？登陆成功没有给sessionId?')
						return
					}
					console.warn('开始设置alias--login');
   				setTimeout(
						() => {
							console.error('login---sessionId值为：'+localStorage.getItem('sessionId'))
							window.JPush.setAlias(
								{ sequence: 1, alias: sessionId },
								function(r){
									console.info('极光设置成功')
									console.log(r)
									// that.$router.replace('./index')
								},
								function(err){
                  // that.$router.replace('./index')
                  console.info('极光设置失败')
									console.log(err)
								}
							)
					 }, 
					 200)				
				},
				retryBack(){
					if(this.fromMine){
						this.$router.back()
						return
					}
					this.showRetrieve=false
				},
				reLogin(){
					this.showRetrieve=false
					this.$route.query=null
				},
        getCode(){
					if(this.seconds){
						return
					}
					this.$http.get('/mobile/user/sendMsg',{params:{userNo: this.username}}).then(res=>{
						if(res.data.success){
							uni.showToast({
								title:'验证码已发送'
							})
							// this.$toast.success('验证码已发送')
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
							uni.showToast({
								title: '请输入手机号码',
								icon: 'none'
							})
							// this.$toast.warning('请输入手机号码')
							// return
						}
						if(this.checkPhone(this.username)){
							uni.showToast({
								title: '手机号码格式错误',
								icon: 'none'
							})
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
									// this.setAlias(this.sessionId)
									// this.$router.replace('./index')
								}else{
									uni.showToast({
										title: '微信号已绑定手机,请设置登陆密码'
									})
									// this.$toast.success('微信号已绑定手机,请设置登陆密码')
									this.setpwd = true
								}
							}
						})
						return
					}
					//微信绑定手机号设置密码
					if(this.wxBind===0 && this.setpwd){
						// if(!this.username){
						// 	this.$toast('请输入手机号')
						// 	return
						// }
						// if(this.checkPhone(this.username)){
						// 	this.$toast.warning('手机号格式不对')
						// 	return
						// }
						// if(!this.password){
						// 	this.$toast('请输入密码')
						// 	return
						// }
						// if(this.checkpwd(this.password)){
						// 	this.$toast.warning('密码只能输入6-20个字母、数字、下划线')
						// 	return
						// }
						const states = [
							{
								state: !this.username,
								title: '请输入手机号'
							},
							{
								state: this.checkPhone(this.username),
								title: '手机号格式不对'
							},
							{
								state: !this.password,
								title: '请输入密码'
							},
							{
								state: this.checkpwd(this.password),
								title: '密码只能输入6-20个字母、数字、下划线'
							},
						]
						let checked = true
						states.some(res=>{
							if(res.state){
								checked = false
								uni.showToast({
									title: res.title,
									icon: 'none'
								})
								return true
							}
						})
						if(!checked){//验证不通过
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
								localStorage.removeItem('isLogOut')
								this.setStorage(res)
								// this.setAlias(this.sessionId)
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
							uni.showToast({
								title: res.remind,
								icon: 'none'
							})
							// this.$toast.warning(res.remind)
							stopProcess = true
							return true
						}
          })
          if(stopProcess){//存在未填写的值
              return
          }
          if(this.status){//注册时
              this.checkExist()
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
							uni.showToast({
								title: this.status?'恭喜你，注册成功':'登陆成功'
							})
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
							this.setStorage(res)
							// this.setAlias(this.sessionId)
              // this.$router.replace('./index')
            }
          })
        },
        agreement(){
          let url = 'http://mobile.yinaf.com/page/agreement.html'
          let inApp
          if (cordova.platformId == 'android') {
            
            inApp = cordova.InAppBrowser.open(url,'_blank','location=no')
          }
          if (cordova.platformId == 'ios') {
            
            inApp = cordova.InAppBrowser.open(url,'_blank','location=no,hidespinner=yes,closebuttoncolor=#ffffff,closebuttoncaption=返回')
          }             
					inApp.addEventListener('exit',()=>{
						StatusBar.backgroundColorByHexString("#00aaef");
					})
					inApp.addEventListener('loadstop',()=>{
						StatusBar.backgroundColorByHexString("#fff");
					})
        },
        wxAuth(){
					let that = this
          console.log(101)
          Wechat.isInstalled(function (installed) {
                  // console.error("Wechat installed: " + (installed ? "Yes" : "No"));
          }, function (reason) {
                  console.error("Failed: " + reason);
          });
          const scope = "snsapi_userinfo";
          const state = "_" + (+new Date());
          Wechat.auth(scope, state, function (response) {
                  // console.error(JSON.stringify(response));
									// console.error(typeof response)
									that.wxLogin(response.code)
          }, function (reason) {
                  console.error("Failed: " + reason);
          });
				},
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
								this.setStorage(res)
              
								// this.$router.replace('./index')	
								// this.setAlias(this.sessionId)
								uni.showToast({
									title: '登陆成功'
								})
								// this.$toast.success('登陆成功')
								return	
							}	
							uni.showToast({
								title: '未绑定手机号，请绑定'
							})
							// this.$toast.success('未绑定手机号，请绑定')
						}
					})
				},
				setStorage(res){
					this.$store.commit('SET_EACH_STATE', res.data.obj)
					uni.navigateTo({
						url: '/pages/index/index'
					})
					// this.$router.replace('./index')
				}
      }
    }
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    })
</script>

<style lang="scss" scoped>
	.login-cpnt{
			height: 100vh;
	}
	.logoAround{
      background:linear-gradient(0deg,rgba(29,105,240,1),rgba(27, 179, 249, 1));
	}
	.mainBottom{
		position: relative;
		width: 100%;
		top: -50rpx;
	}
</style>
