<template>
	<view class="d-flex flex-column page body-2">
    <!-- 蓝色部分 -->
		<view class="primary white--text px-6 pb-4">
      <!-- line1 -->
     <view class="d-flex align-center"> 
        <view class="col-3">
          <view>            
            <uni-battery v-if="watchId"  :battery="battery"></uni-battery>
          </view>
        </view>
        <view class="col-6">
          <view class="text-center white--text">{{seriesName}}</view>
        </view>
        <view class="col-3">
          <view class="text-right">
            <view class="d-inline-block posRela">
              <u-icon @click="showMenu=!showMenu" size="45" name="plus-circle"></u-icon>
              <view class="posAbs menuPos d-flex flex-column align-center" v-if="showMenu">
                <text class="triangle"></text>
                <view class="white ml-n8 px-1 py-2 grey--text text--lighten-1 caption nowrap">
                  <view @click.stop="menuClick(0)" class="d-flex align-center">
                    <u-icon color="#BBBEBF" size="35" name="watch-nice" customPrefix="mdi"></u-icon>
                    <text class="ml-2">添加设备</text>
                  </view>           
                  <u-line class="d-block my-1" color="#BBBEBF" />
                  <view @click.stop="menuClick(1)" class="d-flex align-center">
                    <u-icon color="#BBBEBF" size="35" name="sub-account" customPrefix="mdi"></u-icon>
                    <text class="ml-2">添加好友</text>
                  </view>
   <!--               <u-line class="d-block my-1" color="#BBBEBF" />
                  <view @click.stop="menuClick(2)" class="d-flex align-center">
                    <u-icon color="#BBBEBF" size="35" name="database" customPrefix="mdi"></u-icon>
                    <text class="ml-2">分享挣积分</text>
                  </view> -->
                  <u-line class="d-block my-1" color="#BBBEBF" />
                  <view @click.stop="menuClick(3)" class="d-flex align-center">
                    <u-icon color="#BBBEBF" size="35" name="question-circle"></u-icon>
                    <text class="ml-2">帮助与反馈</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 成员切换 -->
      <view gutter="16" class="mt-7">
        <view class="">
          <view class="offset-2 col-8 mt-7 d-flex justify-space-between align-center">
            <u-icon @click="memberChange('minus')" size="45" name="arrow-left"></u-icon>
            <u-avatar @click="toMemberInfo" size="166" :src="image||defaultAvatar"></u-avatar>
            <u-icon @click="memberChange('plus')" size="45" name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
      <!-- 蓝色底部 -->
      <view class="d-flex align-end mt-4">
        <view class="col-3">
          <u-image @click="toQrcode" height="55" width="55" src="@/static/img/qrCode.jpg"></u-image>
        </view>
        <view class="col-6 d-flex flex-column align-center">
          <text>{{realName}}</text>
          <view
            class="d-flex align-end justify-center"
            @click="toScoreDetails"
          >
            <u-icon size="35" name="database" customPrefix="mdi"></u-icon>
            <span>{{ memberIntegral }}</span>
          </view>          
        </view>
        <view class="col-3 d-flex justify-end">
          <!-- <u-image width="60" height="60" :src="seriesRemarks"></u-image> -->
          <image :src="seriesImg" class="seriesImg" mode=""></image>
        </view>
      </view>      
    </view>
    <!-- 文字轮播 -->
    <u-notice-bar v-if="carouselList.length" class="my-1" type="primary" duration="5000" mode="horizontal" :is-circular="false" :list="carouselList"></u-notice-bar>
    <view v-else class="text-center white my-1 py-2 body-1 font-weight-bold primary--text">颐纳福关爱，从这一刻开始</view>
    <!-- 宫格菜单 -->
    <view class="white px-4 py-2 d-flex flex-fill flex-wrap align-content-stretch">
      <view 
        v-for="(item, i) in items" 
        :key="i" 
        class="col-3 d-flex align-center flex-column justify-space-around"
        @tap="iconMenuClick(i)"
      >
        <view :style="{background: item.color}" class="icon-wrapper d-flex justify-center align-center">
          <u-icon size="55" color="#fff" :name="item.icon" customPrefix="mdi"></u-icon>
        </view>
        <text class="fz12">{{item.title}}</text>        
      </view>
    </view>
    <u-action-sheet @click="actionSheetClick" :list="bsList" v-model="showBS"></u-action-sheet>
    <view class="text-center white pb-2 overline grey--text text--lighten-1">颐纳福关爱，从这一刻开始！</view>
    <!-- 手动添加 -->
   <u-popup v-model="showCodeInput" width="550" :mask-close-able="false" border-radius="10" mode="center">
      <view class="pa-4">
        <view class="title red--text">手动输入</view>
         <u-field 
           v-model="scanInput" 
           :label="scanType?'二维码':'IMEI码'" 
           type="number"
           :placeholder="scanType?'请输入二维码':'请输入IMEI码'" 
         />             
        <view class="d-flex justify-end body-1">
          <text @click="showCodeInput=false" class="red--text">取消</text>
          <text @click="noneScanAdd" class="primary--text ml-4">添加</text>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
	export default {
    name: 'family',
		data() {
			return {
        clickValid: true,
        showBS: false,
        scanInput: '',
        showCodeInput: false,
        bsList: [
          {
            text: '扫码添加',
            color: '#00aaef',
            fontSize: 28
          },
          {
            text: '手动添加',
            color: '#00aaef',
            fontSize: 28
          }
        ],
        items: [
          {
            title: '实时数据',
            color: '#97e08e',
            icon: 'chart-bar'
          },         
          {
            title: '服务套餐',
            color: '#f4d47a',
            icon: 'room-service-outline'
          },
          {
            title: '联系人',
            color: '#f4c293',
            icon: 'group-line'
          },
          {
            title: '定位',
            color: '#f9b4b4',
            icon: 'location'
          },
          {
            title: '在线聊天',
            color: '#97e08e',
            icon: 'comment-multiple'
          },         
          {
            title: '电话呼叫',
            color: '#f4d47a',
            icon: 'telephone'
          },
          {
            title: '警报提示',
            color: '#f4c293',
            icon: 'alarm-warning'
          },
          {
            title: '腕表设置',
            color: '#f9b4b4',
            icon: 'watch-nice'
          },
          {
            title: '饮食记录',
            color: '#97e08e',
            icon: 'silverware-variant'
          },         
          {
            title: '膳食推荐',
            color: '#f4d47a',
            icon: 'rgoblet-fill'
          },
          {
            title: '生活日志',
            color: '#f4c293',
            icon: 'sprout'
          },
          {
            title: '健康档案',
            color: '#f9b4b4',
            icon: 'order'
          }
        ],
				showMenu: false,
				showModal: false,
        defaultAvatar: require('@/static/img/defaultAvatar.png'),
        series_id: '',
        seriesName: '',
        seriesRemarks: '',
        seriesImg: '',
        integralNum: '',
        memberIntegral: '',
        carouselList: [
          // '寒雨连江夜入吴,平明送客楚山孤,洛阳亲友如相问,一片冰心在玉壶',
          // 'uQRCode 是一款使用方式简单，易于扩展的二维码生成插件',
          // 'uQRCode 生成方式简单，可扩展性高，如有复杂需求可通过自定义组件或修改源码完成需求',
          // '下载使用的用户，请勿把示例项目中的图片应用到你的项目。'
        ],
        careCarousel: [],
        scanType: '' // 用于区分扫码类型
			}
		},
    computed: {
      watchId () {
        return this.$store.state.member.watchId
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      image () {
        return this.$store.state.member.image
      },
      watchPhone () {
        return this.$store.state.member.watchPhone
      },
      memberId: {
        get: function () {
          return this.$store.state.member.memberId
        },
        set: function (e) {
          console.log('设置memberId:', e)
        }
      },
      realName () {
        return this.$store.state.member.realName
      },
      battery () {
        return this.$store.state.app.battery
      },
      memberList: {
        get: function () {
          return this.$store.state.app.memberList
        },
        set: function () {
          
        }
      }
    },
    watch: {
      watchId: {
        handler(val){
          this.getDeviceInfo()
          if (val) {
            this.getBattery()
          }
        },
        immediate: true
      },
      memberId: {
        handler(newVal, oldVal){
          console.log(newVal)
          console.log(this.memberId)
          if (newVal) {
            this.getMemberDetails()
          }
        },
        immediate: true
      }
    },
    onLoad(e) {
      if(e.memberNotFound){
        this.$store.commit('SET_EACH_MEMBER_ITEM', this.memberList[0])
      }
    },
    onShow() {
      console.log(this.$store)
      uni.$emit('getMemberList')
    },
    methods: {
      memberChange (e) {
        console.log('点击事件')
        if (!this.sessionId) {
          uni.showToast({
            title: '请先授权登录',
            icon: 'none'
          })
          setTimeout(() => {
            uni.navigateTo({
              url: '../../public/firstCome/firstCome'
            })
          }, 1000)
          return false
        }
        
        if(this.memberList && this.memberList.length<2){
          return false
        }
        
        if(!this.clickValid){
          return false
        } else {
          this.clickValid = false
          let i
          this.memberList.some((res, index) => {
            if (this.memberId === res.memberId) {
              i = index
              return false
            }
          })
          console.log(this.clickValid)
          if (i===undefined) { // 对应多台机器操作导致的成员被删除,显示第一个成员
            this.$store.commit('SET_EACH_MEMBER_ITEM', this.memberList[0])
            this.clickValid = true
            return false
          }
          if(e==='plus'){
            if(i === this.memberList.length-1){
              this.$store.commit('SET_EACH_MEMBER_ITEM', this.memberList[0])
            }else{
              this.$store.commit('SET_EACH_MEMBER_ITEM', this.memberList[i+1])
            }
          }
          if(e==='minus'){
            if(i===0){
              this.$store.commit('SET_EACH_MEMBER_ITEM', this.memberList[this.memberList.length-1])
            } else {
              this.$store.commit('SET_EACH_MEMBER_ITEM', this.memberList[i-1])
            }
          } 
          setTimeout(() => {
            console.log('banjinlai')
            this.clickValid = true
          },300)
        }
      },
      toQrcode () {
        uni.navigateTo({ url: '../../family/QrCode' })        
      },
      toScoreDetails () {
        console.log('qqq')
        uni.navigateTo({
          url: '../../family/integralPage'
        })
      },
      toMemberInfo () {
        uni.navigateTo({
          url: '../../family/InformationDetails'
        })
      },
      getMemberDetails () {
        console.log('memberId变动'+ this.memberId)
        this.getCareCarousel()
        this.getMemberIntegral() 
        this.getDeviceInfo()
      },
      getCareCarousel(){
        let data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.post('/mobile/healthy/getCareCarousel', data)
          .then(res=>{
            if(res.data.success){
              this.careCarousel = res.data.obj
              this.carouselList = this.careCarousel.map(res => res.content)
            }
          })
      },
      getBattery(){
        const params = {
          sessionId: this.sessionId,
          watchId: this.watchId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getWatchBattery', params)
        .then(res=>{
          if(res.data.success){
            this.$store.commit('SET_SINGLE_ITEM',['battery', res.data.obj])
          }
        })
      },
      getMemberIntegral(){
        let params = {
          memberId: this.memberId,
          sessionId: this.sessionId
        }
        this.$http.get('/mobile/activity/getIntegralTack', params)
          .then(res=>{
            if(res.data.success){
              this.memberIntegral = res.data.obj.integralNum
            }
          })
      },      
      getDeviceInfo(){
        console.log(122)
        let data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.post('/mobile/healthy/getWacthInfo', data)
          .then(res=>{
            if(res.data.success){
              const obj = res.data.obj
              this.seriesName = obj.seriesName
              this.seriesImg = decodeURIComponent(obj.seriesImg) 
              this.seriesRemarks = obj.seriesRemarks
            }
          })
      }, 
      menuClick (i) {
        this.showMenu = false
        
        if (!this.sessionId) {
          uni.showToast({
            title: '请先授权登录',
            icon: 'none'
          })
          setTimeout(() => {
            uni.navigateTo({
              url: '../../public/firstCome/firstCome'
            })
          }, 500)
          return false
        }
        
        console.log(i)
        console.log(typeof i)
        if (i<2) {
          this.scanCode(i)
          return false
        }
        if (i === 3) { // 帮助与反馈
        console.log('bbb')
          // uni.switchTab({
          //   url: '../mine/mine'
          // })
          uni.navigateTo({
            url: '../../mine/usageAssistant'
          })
        }
      },
      iconMenuClick (i) {
        if (!this.sessionId) {
          uni.showToast({
            title: '请先授权登录',
            icon: 'none'
          })
          setTimeout(() => {
            uni.navigateTo({
              url: '../../public/firstCome/firstCome'
            })
          }, 500)
          return false
        }
        
        // 处理未绑定腕表
        const needWatchArr = [3, 4, 5, 7] // 完整版
        // const needWatchArr = [2, 3, 5] // 简化版
        if (needWatchArr.includes(i)) {
          if (!this.watchId) {
            // this.showModal = true
            uni.showModal({
              title: '添加腕表',
              content: '添加腕表，解锁更多功能',
              cancelColor: '#f00',
              success: result => {
                if (result.confirm) {
                  this.scanType = 0
                  this.showBS = true
                  // uni.$emit('scanCode', 0)
                }
              }
            })
            return false
          }
        }
        // 腕表已绑定
        if (i === 5 ) { // 拨打电话 // 完整版
        // if (i === 3 ) { // 拨打电话 // 简化版
          if (this.watchPhone) {
            uni.makePhoneCall({
              phoneNumber: this.watchPhone
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: '未检测到腕表的物联网卡'
            })
          }
          return false
        }
        // 除拨打电话外的其他情形  
        const urls = [
          '../../family/deviceData',
          '../../family/servicePackages',
          '../../family/contacts',
          '../../family/location',
          '../../family/chat',
          '', // 空， 电话的占位
          '../../family/alarms',
          '../../family/watchSetting',
          '../../family/dietRecord',
          '../../family/dietRecommend',
          '../../family/lifeLog',
          '../../family/healthFile'
        ]
        uni.navigateTo({
          url: urls[i]
        })
        
      },
      noneScanAdd () { // 手动添加
        if (!this.scanInput) {
          this.$u.toast(this.scanType?'请输入二维码':'请输入IMEI码')
          return false
        }
        this.showCodeInput = false
        const data = this.scanType ?
          { // 添加好友
            sessionId: this.sessionId,
            memberNum: this.scanInput
          } 
          : 
          { // 添加设备
            memberId: this.memberId,
            sessionId: this.sessionId,
            watchImei: this.scanInput
          }
        
        const url = this.scanType ? '/mobile/healthy/getEwmMember' : '/mobile/healthy/bindWatch'
        
        this.$http.post(url, data)
          .then(res => {
            this.scanInput = ''
            if (res.data.success) {
              if (this.scanType) {
                this.addMember(res.data.obj.memberId)
              } else { // 添加设备
                uni.$emit('getMemberList')
                uni.$emit('getMember')
                uni.showToast({
                  title: '腕表绑定成功'
                })
              }
            }
          })
      },
      addMember(memberId){
        const data = {
          sessionId: this.sessionId,
          memberId
        }
        this.$http.post('/mobile/healthy/addEwmMember', data)
          .then(res=>{
            if(res.data.success){
              uni.$emit('getMemberList')
              uni.showToast({
                title: '添加好友成功'
              })
            }
          })
      },
      actionSheetClick (e) {
        console.log(e)
        if (e) {
          this.showCodeInput = true
        } else { // 扫码
          uni.$emit('scanCode', this.scanType)
        }
      },
      scanCode (e) {
        this.showModal = false
        this.scanType = e
        this.showBS = true
      }
   
    }
    
	}
</script>

<style lang="scss" scoped>
  .page{
    background: #F0EFF3;
    height: 100vh;
  }
  /* #ifdef MP-WEIXIN */
  /deep/.view{
    min-height: 10px;
  }
  /* #endif */
  .menuPos{
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 99;
  }
  .triangle{
    width:0;
    height:0;
    border-right:12rpx solid transparent;
    border-left:12rpx solid transparent;
    border-bottom:20rpx solid #fff;
  }
  .icon-wrapper{
    width: 88rpx;
    height: 88rpx;
    border-radius: 50%;
  }
  .fz12{
    font-size: 24rpx;
  }
  .seriesImg{
    width: 60rpx;
    height: 60rpx;
  }
</style>
