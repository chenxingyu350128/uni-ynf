<template>
	<view class="py-12 px-10 body-2">
		<view v-if="!showBind" :class="showLogin?'height35':'height65'" class="topArea d-flex flex-column justify-space-between align-center">
      <view class="headline font-weight-bold">欢迎来到颐纳福</view>
      <view v-if="!showLogin" class="d-flex flex-column align-center">
        <image class="logoImg" src="@/static/img/logo.png" mode="aspectFit"></image>
        <text class="font-weight-bold subtitle-2 mt-4">该程序将获取一下授权：</text>
        <text class="grey--text text--lighten-1 caption">获得您的公开信息(昵称、头像等)</text>
      </view>
      <view v-if="showLogin" class="full-width">
        <u-button @click="wxLogin" type="primary">微信用户一键登录</u-button>
        <!-- <u-button @click="normalSign" class="d-block mt-4">其他号码登录/注册</u-button> -->
      </view>
      <view v-else class="full-width">
        <u-button :ripple="true" @click="getUserInfo" open-type="getUserInfo" type="primary">允许</u-button>
        <u-button @click="toIndex" class="d-block mt-4">拒绝</u-button>
      </view>
    </view>
    <view v-else>
      <view class="headline font-weight-bold text-center mb-8">请绑定手机号</view>
       <u-field 
         v-model="phone" 
         :border-bottom="true"
         label="手机号" 
         placeholder="请填写手机号" 
       />    
       <view class="d-flex align-center">
         <u-field 
           v-model="code" 
           :border-bottom="true"
           label="验证码" 
           placeholder="请填写短信验证码" 
         >  
         </u-field>
         <u-button @click.stop="getMsgCode" size="mini" type="primary">{{seconds?seconds+'s':'获取验证码'}}</u-button>
       </view>
      <u-button type="primary" class="d-block mt-4" @click="bindPhone">确定</u-button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showBind: false,
        showLogin: false,
        phone: '',
        code: '',
        loginCode: '',
        seconds: 0,
        timer: null,
        openId: '',
        unionId: ''
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      },
      token () {
        return this.$store.state.app.token
      },
      userInfo () {
        return this.$store.state.app.userInfo
      },
      encryptedData () {
        return this.$store.state.app.encryptedData
      },
      iv () {
        return this.$store.state.app.iv
      },
    },
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    },
    methods:{
      checkPhone(e){
        if(!(/^1[3456789]\d{9}$/.test(e))){ 
            return true; 
        }   
      },  
      getUserInfo () {
        const _this = this
        uni.login({
          provider: 'weixin',
          success: (rs) => {
            console.log(rs.code)
            _this.loginCode = rs.code
            if (rs.errMsg === 'login:ok') {
              uni.getUserInfo({
                provider: 'weixin',
                success: res => {
                  console.log(res)
                  if (res.errMsg === 'getUserInfo:ok') {
                    _this.showLogin = true
                    const userInfo = res.userInfo
                    const encryptedData = res.encryptedData
                    const iv = res.iv
                    _this.$store.commit('SET_SINGLE_ITEM', ['userInfo', userInfo])
                    _this.$store.commit('SET_SINGLE_ITEM', ['encryptedData', encryptedData])
                    _this.$store.commit('SET_SINGLE_ITEM', ['iv', iv])
                    // _this.login(rs.code)
                  } else {
                    uni.showToast({
                      title: res.errMsg
                    })
                  }
                }
              })
            }
          }
        })
      },
      toIndex () {
        uni.switchTab({
          url: '../../tabbar/index/index'
        })
      },
      wxLogin () {
        const data = {
          code: this.loginCode,
          encryptedData: this.encryptedData,
          iv: this.iv
        }
        console.log(data)
        uni.checkSession({
          success: rs => {
            console.log(rs)
          }
        })
        this.$http.post('/mobile/user/loginForApplet', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              const msg = '登录成功'
              console.log(obj)
              if (obj.sessionId) { // 无需绑定手机号
                const obj = res.data.obj
                const msg = res.data.msg
                uni.showToast({
                  title: msg
                })
                this.$store.commit('SET_EACH_ITEM', obj)
                uni.switchTab({
                  url: '../../tabbar/index/index'
                })                
                this.afterLogin()
              } else { // 需要绑定手机号
                this.showBind = true
                this.openId = obj.openId
                this.unionId = obj.unionId
              }
            }
          })
      
      },
      afterLogin () { 
        const that = this  
        // 登陆后添加用户日志
        
        uni.getNetworkType({
          success(e) {
            console.log('network',e)
            let networkType = e.networkType
            uni.getSystemInfo({
              success: (e) => {
                console.log(e)
                const { model, system, devicePixelRatio, screenWidth, screenHeight} = e
                const resolutionRatio = `${devicePixelRatio*screenHeight}*${devicePixelRatio*screenWidth}`
                const systemVersion = system
                const deviceNumber = model
                const sessionId = that.sessionId
                const token = that.token
                const loginPlatform = 2
                const data = {
                  sessionId,
                  token,
                  deviceNumber,
                  networkWay: networkType,
                  systemVersion,
                  resolutionRatio,
                  // clientVersion,
                  loginPlatform
                }
                console.log(data)
                that.$http.post('/mobile/user/addLoginLog', data)
              }
            })        
          }
        })
      },
      getMsgCode () {
        if (!this.seconds) {
          if (this.checkPhone(this.phone)) {
            uni.showToast({
              title: '手机号码填写错误，请检查'
            })
            return false
          }
          const params = {
            userNo: this.phone
          }
          this.$http.get('/mobile/user/sendMsg', params)
            .then(res => {
              if (res.data.success) {
                uni.showToast({
                  icon: 'success',
                  title: '验证码已发送'
                })
                this.seconds = 60
                this.timer = setInterval(() => {
                  this.seconds--
                  if (this.seconds <= 0) {
                    clearInterval(this.timer)
                  }
                }, 1000)
              }
            })
        }
      },
      bindPhone () {
        // 表单验证
        let valid = true
        const errs = [
          {
            state: !this.phone,
            tip: '请输入手机号'
          },
          {
            state: this.checkPhone(this.phone),
            tip: '手机号码填写错误，请检查'
          },
          {
            state: !this.code,
            tip: '请输入短信验证码'
          }
        ]
        errs.some(res => {
          if (res.state) {
            uni.showToast({
              title: res.tip
            })
            valid = false
            return true
          }
        })
        // 网络请求
        if (valid) {
          const data = {
            yzcode: this.code,
            openId: this.openId,
            userName: this.phone,
            nickName: this.userInfo.nickName,
            avatarUrl: this.userInfo.avatarUrl,
            unionId: this.unionId
          }
          this.$http.post('/mobile/user/boundPhoneForApplet', data)
            .then(res => {
              if (res.data.success) {
                const obj = res.data.obj
                const msg = res.data.msg
                uni.showToast({
                  title: msg
                })
                this.$store.commit('SET_EACH_ITEM', obj)
                uni.switchTab({
                  url: '../../tabbar/index/index'
                })
                this.afterLogin()
              }
            })
        }
           
      }
    }
	}
</script>

<style lang="scss" scoped>
.height65{
  height: 65vh;
}
.height35{
  height: 25vh;
}
.logoImg{
  width: 180rpx;
  height: 120rpx;
}
</style>
