<script>
	export default {
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      },
      token () {
        return this.$store.state.app.token
      }
    },
		onLaunch: function() {
			console.log('App Launch')
      if (this.sessionId) {
        this.addLog()
      }
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    methods: {
      addLog () {
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
      }
    }
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
  /* 导入iconfont uview组件也能用 */
  @import "./static/css/iconfont.css";
  @import "./common/vuetify.min.css";
  .nowrap{
    white-space: nowrap;
  }
  .full-width{
    width: 100%;
    box-sizing: border-box;
  }
  .full-size{
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .border-box{
    box-sizing: border-box;
  }
  .posAbs{
    position: absolute!important;
  }
  .posFix{
    position: fixed!important;
  }
  .posRela{
    position: relative;
  }
  .posSticky{
    position: sticky;
    top: 0;
  }
  .zIndexHigh{
    z-index: 999;
  }
  .borderBox{
    box-sizing: border-box;
  }
  .r0{
    right: 0;
  }
  .t0{
    top: 0;
  }
  .b0{
    bottom: 0;
  }
  .b-radius0{
    border-radius: 0!important;
  }
</style>
