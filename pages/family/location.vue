<template>
	<view class="page">
		<!-- <image :src="mapSrc"></image> -->
    <view class="posFix t0 d-inline-flex ma-2 zIndexHigh">
      <u-button v-if="battery" size="medium" type="primary" shape="circle">
        <uni-battery :battery="battery"></uni-battery>剩余电量{{battery}}%
      </u-button>
      <u-button v-else size="medium" disabled type="error" shape="circle">
        腕表未连接
      </u-button>
    </view>
    <map 
      :style="{width: cWidth*pixelRatio + 'px', height: cHeight*pixelRatio + 'px'}"  
      :latitude="locationPoint.latitude" 
      :longitude="locationPoint.longitude"
      :show-location="true"
      :markers="markers"
    >
    </map>
   <view class="d-inline-flex posFix white setPos zIndexHigh elevation-11">
      <u-icon 
        color="#00aaef" 
        name="list-dot" 
        size="45"
        class="ma-auto"
        @click="openMenu"
      >
      </u-icon>
    </view>
    <u-action-sheet @click="actionClick" :list="actionList" v-model="showMenu"></u-action-sheet>
	</view>
</template>

<script>
  // const amapFile = require('../../sdk/amap/amap-wx.js')
  // let myMap = null
	export default {
		data() {
			return {
				// key: '481e7ccc7d73fe8ed0bbe1b1181937ac',
        // mapSrc: '',
        cHeight: '',
        cWidth: '',
        pixelRatio: 1,
        longitude: 0,
        latitude: 0,
        showMenu: false,
        battery: 0,
        actionList: [
          { text: '历史记录', color: '#00aaef' },
          { text: '安全围栏', color: '#00aaef' }
        ]
			}
		},
    computed: {
      markers () {
        if (this.longitude && this.latitude) {
          return [{
            id: 'watchPosition',
            longitude: this.longitude,
            latitude: this.latitude,
            iconPath: './static/map/currentPosition.png'
          }]
        } else {
          return []
        }
      },
      locationPoint () {
        return this.$store.state.app.locationPoint
      },
      watchId () {
        return this.$store.state.member.watchId
      },
      memberId () {
        return this.$store.state.member.memberId
      },
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onShow() {
      // this.longitude = this.locationPoint.longitude
      // this.latitude = this.locationPoint.latitude
      // 获取父元素节点高度
      let warpper = uni.createSelectorQuery().in(this).select('.page')
      warpper.fields(
        {
          size: true,
          scrollOffset: true
        },
        data => {
          console.log(data)
          this.cHeight= data.height;
          this.cWidth= data.width;
        }
      ).exec()  
         
      this.getWatchPosition() 
    },
    methods: {
      getWatchPosition () {
        if (this.watchId) {
          const params = {
            sessionId: this.sessionId,
            memberId: this.memberId
          }
          this.$http.get('/mobile/user/getCurrentLocus', params)
            .then(res => {
              if (res.data.success) {
                this.longitude = parseFloat(res.data.obj.lon)
                this.latitude = parseFloat(res.data.obj.lat)
                this.getBettary()
              }
            })
        }
      },
      getBettary () {
        const params = {
          sessionId: this.sessionId,
          watchId: this.watchId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getWatchBattery', params)
        .then(res=>{
          if(res.data.success){
            this.battery = res.data.obj
          }
        })        
      },
      actionClick (e) {
        uni.navigateTo({
          url: e ? './electricFence' : './locationHistory'
        })
      },
      openMenu () {
        this.showMenu = true
      }
    }
	}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
}
.setPos{
  right: 20rpx;
  top: 20rpx;
  height: 60rpx;
  width: 60rpx;
  border-radius: 50%;
}
</style>
