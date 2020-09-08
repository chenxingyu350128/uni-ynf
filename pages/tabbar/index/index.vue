<template>
	<view class="page body-1">
    <view  
      class="primary full-width caption white--text py-2 transitionMain"
    >
      <u-row gutter="16" class="d-block">
        <u-col span="3">
          <view @tap="toSelectCity" class="d-flex align-center body-2">
            <text>{{locationCity || '所在地'}}</text>
             <u-icon class="ml-2" name="arrow-down" color="#fff"></u-icon>
          </view>
        </u-col>      
        <u-col span="6">

          <view  class="d-flex flex-column justify-center align-center">
            <view  class="circle-white d-flex flex-column align-center justify-center">
              <u-icon @click="iconClick" :name="watchId?'watch':'plus-circle'" custom-prefix="mdi" size="114" color="#cdcdcd"></u-icon>
            </view>
            <text class="subtitle-1  mt-6 mb-4">{{watchId?'已绑定智能腕表':'请添加您的腕表'}}</text>
          </view>
        </u-col>
        <u-col span="3">
          <view class="d-flex justify-end">
          </view>
        </u-col>
      </u-row>
      <u-row class="pb-4 body-1">
        <u-col span="4">
          <view class="d-flex flex-column align-center justify-center">
            <text>步数</text>
            <text v-if="watchId">
              {{ steps }}步
            </text>
            <text v-else>
              _ _
            </text>
          </view> 
        </u-col>
        <u-col span="4">
          <view class="d-flex flex-column align-center justify-center">
            <text>睡眠时长</text>
            <text v-if="watchId">
              {{ sleep }}小时
            </text>
            <text v-else>
              _ _
            </text>
          </view>          
        </u-col>
        <u-col span="4">
          <view class="d-flex flex-column align-center justify-center">
            <text>心率</text>
            <text v-if="watchId">
              {{ heartRate }}bpm
            </text>
            <text v-else>
              _ _
            </text>
          </view>
        </u-col>
      </u-row>
    </view>
    <!-- 腕表导购 -->
    <view
      v-if="!watchId"
      class="full-width grey buyWatch lighten-3 d-flex align-center justify-center px-2 py-1"
    >
     <view @click="turnToH5(shopMallUrl, '颐纳福商城')" class="py-1 px-2 body-2 white full-width elevation-4 radius-10">
        <view
          class="d-flex align-center justify-space-between"
        >
          <view
            class="d-flex align-center pa-0"
          >
            <u-icon name="error-circle" size="58" color="#fab427"></u-icon>
            <text class="ml-2 subtitle-1 font-weight-bold">健康第一步:</text>
          </view>
          <view
            class="d-flex align-center"
          >
            <text class="grey--text body-2 d-flex align-center justify-end mr-2">
              买个智能腕表
            </text>
            <text class="toshop align-center justify-center white--text overline px-1">详情</text>
<!--            <u-link :href="shopMallUrl" color="#fff">
            </u-link> -->
          </view>
        </view>
      </view>
    </view> 
    <!-- 轮播图 -->
    <u-swiper 
      v-if="bannerList.length"
      border-radius="0" 
      class="radius-0 teal" 
      height="232" 
      :list="bannerList" 
      img-mode="widthFix"
    />
    <!-- 外链 -->
    <view v-if="appList.length" class="my-1 white pa-4 d-flex justify-space-around">
      <view 
        v-for="(item,index) in appList" 
        :key="index"
        class="d-flex flex-column align-center"
        @tap="turnTo(item)"
      >
        <u-image img-mode="scaleToFill" width="76rpx" height="76rpx" :src="item.app_pic"></u-image>
        <!-- <image class="appIcon" :src="item.app_pic" mode="aspectFit"></image> -->
        <text class="mt-2 caption">{{item.app_title}}</text>
      </view>
    </view>
    <!-- 健康头条 -->
    <view @click="testClick($event)" class="pa-2 subtitle-2 d-flex align-center white posSticky t0 zIndexHigh">
      <u-image width="30rpx" height="32rpx" src="@/static/img/titleIcon.png"></u-image>
      <text class="font-weight-bold ml-2 body-1">健康头条</text>
    </view>
    <view 
      v-for="(item,index) in headLines" 
      :key="index"
      class="white d-flex px-6 py-2 u-border-top caption"
      @tap="toDetails(item.newId)"
    >
      <!-- <image class="newsPic" :src="item.newPic" mode="scaleToFill"></image> -->
      
      <u-image width="120rpx" height="120rpx" :src="item.newPic"></u-image>
      <view class="ml-5 flex-fill pa-2">
        <text class="u-line-2 body-2">{{item.newTitle}}</text>
      </view>
    </view>
    <!-- 加载跟多 -->
    <u-loadmore :status="loadMoreStatus"/>
  </view>
</template>

<script>
import amap from '../../../sdk/amap/amap-wx.js'
export default {
	data() {
		return {
			// eazyMode: false,
      customStyle: {
        width: '50rpx',
        height: '30rpx',
        'border-radius': '4rpx',
        'font-size': '10px',
        padding: '20rpx 30rpx'
      },
      cities: [],
      steps: 0,
      sleep: 0,
      heartRate: 0,
      bannerList: [],
      appList: [],
      rows: 10,
      page: 1,
      headLines: [],
      allLoaded: false,
      loadMoreStatus: 'loadmore',
      key: '481e7ccc7d73fe8ed0bbe1b1181937ac',
      point: null,
      amapPlugin: null
    }
	},
  computed: {
    shopMallUrl () {
      return `http://mall.yinaf.com/pages/index.html#/index?sessionId=${this.sessionId}`
    },
    userInfo () {
      return this.$store.state.app.userInfo
    },
    sessionId () {
      return this.$store.state.app.sessionId
    },
    userId () {
      return this.$store.state.app.userId
    },
    userName () {
      return this.$store.state.app.userName
    },
    realName () {
      return this.$store.state.app.realName
    },
    watchId () {
      return this.$store.state.member.watchId
    },
    dateFormat(){
      return this.$u.timeFormat(new Date(), 'yyyy-mm-dd');
    },
    params(){
      return {
        memberId: this.memberId,
        type: 1,
        data: this.dateFormat,
        sessionId: this.sessionId
      }
    },
    memberId () {
      return this.$store.state.member.memberId
    },
    houseId () {
      return this.$store.state.app.houseId
    },
    locationCity () {
      return this.$store.state.app.locationCity
    },
    cityId () {
      return this.$store.state.app.cityId
    }
  },
  onReachBottom() {
    if (!this.allLoaded) {
      this.loadMoreStatus = 'loading'
      this.page++
      setTimeout(() => {
        this.findNewsPage('Yo')
      }, 500)
    }
  },
  // onPageScroll(e) {
  //   const scrollTop = e.scrollTop
  //   if (scrollTop > 50) {
  //     this.eazyMode = true
  //   } else {
  //     this.eazyMode = false
  //   }
  // },
  onLoad() {
    // 初始化高德sdk
    this.amapPlugin = new amap.AMapWX({  
        key: this.key  
    }); 
  },
  onShow() {
    console.log(this.cityId)
    this.init()
  },
  onHide() { // 离开后初始化头条列表 避免数据太多
    this.page = 1
    this.findNewsPage()
  },
  methods: {
    testClick (e) {
      console.log('???caniuse?')
      console.log(e)
    },
    async init () {      
      await this.getLocation() // 获取城市定位
      this.findNewsPage()
      if (this.sessionId) {  
        // uni.$emit('getMemberList')
        this.getUser()
        this.getMemberList()
        this.getHouseList()
      }
      if (this.watchId) {
        this.getStep()
        this.getSleep()
        this.getHr()
      }
    },
    iconClick () {
      if (!this.watchId) {
        uni.$emit('scanCode', 0)
      }
    },
    turnToH5 (url, title, nocheckUrlName) {
      // 中康体检需要处理
      if (title=== '中康体检' && !nocheckUrlName) {
        if (this.sessionId) {
          const params = {
            sessionId: this.sessionId,
            userId: this.userId,
            userName: this.userName,
            name: this.realName,
            sex: this.userInfo.gender || 1
          }
          this.rebuildUrl(params, url, title)
          return false
        }
      }
      uni.navigateTo({
        url: '../../public/webviewPage/webviewPage?url=' + encodeURIComponent(url) + '&title=' + title 
      })
    },
    rebuildUrl (params, url, title) {
      this.$http.post('/mobile/index/loginHealthy', params)
        .then(res=>{
          if(res.data.success){
            const newUrl = `${url}?token=${res.data.obj.token}`
            this.turnToH5 (newUrl, title, 'ok')
          }
        })
    },
    getStep(){
      this.$http.get('/mobile/healthy/getStepToDay', this.params)
      .then(res=>{
        if(res.data.success){
          this.steps = res.data.obj.step
        }
      })
    },
    getSleep(){
      this.$http.get('/mobile/healthy/getSleepToDay', this.params)
      .then(res=>{
        if(res.data.success){
          this.sleep = res.data.obj.duration
        }
      })
    },
    getHr(){
      this.$http.get('/mobile/healthy/getCurrentHeartRate', this.params)
      .then(res=>{
        if(res.data.success){
          this.heartRate = res.data.obj.bpm
        }
      })
    },    
    turnTo (item) {
      console.log(item)
      if (item.app_jump_url) { // 有url 是webview
        this.turnToH5(item.app_jump_url, item.app_title)
      } else { // 无url 大概为小程序
        
      }
    },
    toDetails (id) {
      uni.navigateTo({
        url: `../../index/newsDetails/newsDetails?newsId=${id}`
      })
    },
    toSelectCity () {
      uni.navigateTo({
        url: '../../index/cityPicker/cityPicker'
      })
    },
    getLocation () {
      if (this.cityId) {
        console.log('??ss')
        this.getIndex()
      } else { 
        console.log('>>>>>')
        // 仅cityId不存在时生效， 由选择城市返回时不执行
        const that = this
        uni.getLocation({ // 定位获取经纬度
          type: 'gcj02',
          geocode: true,
          success: res => {
            console.log(res)
            if (res.errMsg === "getLocation:ok") {
              const { latitude, longitude } = res
              this.point = {
                latitude,
                longitude
              }
              this.$store.commit('SET_SINGLE_ITEM', ['locationPoint', this.point])
              this.getCityList(latitude, longitude) // 查询cityId
              // #ifdef APP-PLUS
              const areaId = res.address.postalCode..slice(0, 4)+'00'
              const locationCity = res.address.city
              this.$store.commit('SET_SINGLE_ITEM', ['locationCity', locationCity])
              this.$store.commit('SET_SINGLE_ITEM', ['areaId', areaId])
              // #endif
              // #ifndef APP-PLUS              
              that.amapPlugin.getRegeo({
                success: res => {
                  const adcode = res[0].regeocodeData.addressComponent.adcode
                  const locationCity = res[0].regeocodeData.addressComponent.city
                  const areaId = adcode.slice(0, 4)+'00'
                  that.$store.commit('SET_SINGLE_ITEM', ['locationCity', locationCity])
                  that.$store.commit('SET_SINGLE_ITEM', ['areaId', areaId])
                }
              })
              // #endif
            }
          }
        })
      }
    },
    getCityList (latitude, longitude) {
      console.log(this.point)
      // const { latitude, longitude } = this.point
      const params = {
        sessionId: this.sessionId,
        lat: latitude,
        log: longitude
      }
      this.$http.get('/mobile/index/getMiniCitys', params)
        .then(res => {
          if (res.data.success) {
            const obj = res.data.obj
            const recommendCity = obj.recommendCity
            this.$store.commit('SET_SINGLE_ITEM', ['recommendCity', recommendCity])
            this.city = obj.city
            delete obj.city
            delete obj.recommendCity
            console.log(obj)
            const keys = Object.keys(obj)
            const values = Object.values(obj)
            console.log(values)
            
            // 获取城市索引列表需要的数据
            let indexList = []
            let items = []
            for(let i=0; i<keys.length; i++){
                indexList.push(keys[i])
     
                items.push(
                  values[i]
                )
            }
            console.log(items)
            this.$store.commit('SET_SINGLE_ITEM', ['indexList', indexList])
            this.$store.commit('SET_SINGLE_ITEM', ['indexItem', items])
            // 获取cityId
            this.cities = values.flat()
            this.cities.some(rs => {
              if (rs.areaName === this.locationCity) {
                const cityId = rs.cityId
                this.$store.commit('SET_SINGLE_ITEM', ['cityId', cityId])
                return true
              }
            })
            this.getIndex()
          }
        })
        
    },
    getUser () {
      this.$http.get('/mobile/user/getUser', { sessionId: this.sessionId })
        .then(res => {
          if (res.data.success) {
            const obj = res.data.obj
            this.$store.commit('SET_EACH_ITEM', obj)
          }
        })
    },
    getMemberList () {
      console.info(1123)
      if(this.memberId){
        return
      }          
      this.$http.get('/mobile/user/getMemberList', {sessionId: this.sessionId})
      .then(res=>{
        if(res.data.success){ //默认第一人为本人
          const obj = res.data.obj
          if (Array.isArray(obj) && obj.length) {
            let memberId = obj[0].memberId  
            let watchId = obj[0].watchId  
            this.$store.commit('SET_SINGLE_ITEM', ['memberList', obj])
            this.$store.commit('SET_EACH_MEMBER_ITEM', obj[0])
            this.$store.commit('SET_SINGLE_ITEM', ['memberId', memberId])
            this.$store.commit('SET_SINGLE_ITEM', ['watchId', watchId])
          }
        }
      })  
    },
    getHouseList () {
      if(this.houseId){
        return
      } 
      const params = {
        sessionId: this.sessionId,
        userId: this.userId,
      }
      this.$http.get('/owner/getHouse', params)
      .then(res=>{
        if(res.data.success){
          const obj = res.data.obj
          if (Array.isArray(obj) && obj.length) {
            let houseId = obj[0].houseId  
            this.$store.commit('SET_SINGLE_ITEM', ['houseList', obj])
            this.$store.commit('SET_SINGLE_ITEM', ['houseId', houseId])
          }          
        }
      })
    },
    getIndex () {
      console.log('cityid', this.cityId)
      const params = {
        cityId: this.cityId,
        platform: 2
      }
      this.$http.get('/mobile/index/getIndex', params)
        .then(res => {
          if (res.data.success) {
            const obj = res.data.obj
            const bannerList = obj.bannerList
            if (Array.isArray(bannerList) && bannerList.length) {
              this.bannerList = bannerList.map(rss => {
                return {
                  image: rss.banner_pic,
                  url: rss.banner_jump_url
                }
              })
            }
            this.appList = obj.applicationList
          }
        })
    },
    findNewsPage(i){
      const params = {
        cityId: this.cityId,
        platform: 2,
        rows: this.rows,
        page: this.page
      }
      this.$http.get('/mobile/index/findNewsPage', params)
      .then(res=>{
        if(res.data.success){
          console.log(res.data)
          const rows = res.data.rows
          const pager = res.data.pager
          this.allLoaded = pager.currentPage === pager.totalPages
          this.loadMoreStatus = this.allLoaded?'nomore':'loading'
          this.headLines =  i?this.headLines.concat(rows):rows
        }
      })
    },    
  }
}
</script>

<style lang="scss" scoped>
  .page{
    background: #f2f2f2;
  }
  .topSpace{
    height: var(--status-bar-height);
  }
  .appIcon{
    width: 38px;
    height:38px;
  }
  .newsPic{
    width: 60px!important;
    height:60px!important;
  }
  .transitionMain{
    transition: all .2s ease-out;
  }
  .circle-white{
    height: 150rpx;
    width: 150rpx;
    background-color: #fff;
    border-radius: 50%;
  }
  .toshop{
    display: block;
    // width: 25px;
    // height: 15px;
    // font-size: 10px;
    // line-height: 15px;
    text-align: center;
    background-color: #f09436;
    border-radius: 2px;
  }
  /deep/.u-swiper-wrap{
    border-radius: unset!important;
  }
</style>
