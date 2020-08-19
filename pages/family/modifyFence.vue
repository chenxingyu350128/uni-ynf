<template>
	<view>
		<map id="fenceMap" @tap="mapTap" scale="12" :circles="circles" :latitude="latitude" :longitude="longitude" class="mapEL"></map>
    <view class="posFix t0 full-width white h-auto">        
      <u-field 
        v-model="name" 
        label="地址名称" 
        placeholder="请填写地址名称" 
      />  
      <u-cell-group>
        <u-cell-item title="地址" :value="address||'请点击地图选点'"></u-cell-item>
        <u-cell-item :arrow="false" @click="showSelect = !showSelect" title="围栏半径" :value="radius+'米'">
          <u-icon class="ml-4" slot="right-icon" :name="showSelect?'arrow-up':'arrow-down'"></u-icon>
        </u-cell-item>
      </u-cell-group>
      <view v-if="showSelect">
        <view class="px-4 py-2" @click="selectRadius(1000)" :class="radius===1000?'primary--text':'grey--text'">1000米</view>
        <view class="px-4 py-2" @click="selectRadius(2000)" :class="radius===2000?'primary--text':'grey--text'">2000米</view>
        <view class="px-4 py-2" @click="selectRadius(3000)" :class="radius===3000?'primary--text':'grey--text'">3000米</view>
      </view>
    </view>
    <view class="posFix b0 full-width white">
      <u-button @click="modify" :custom-style="style" type="primary">{{railId?'修改':'添加'}}</u-button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        style: {
          'border-radius': 'unset',
          background: '#00aaef'
        },
        showSelect: false,
				railId: '',
        lat: '',
        lon: '',
        name: '',
        radius: 1000,
        address: ''
			};
		},
    computed: {
      memberId () {
        return this.$store.state.member.memberId
      },
      watchId: {
        get: function () {
          return this.$store.state.member.memberId
        },
        set: function () {}
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      latitude () {
        const latitude = this.$store.state.app.locationPoint.latitude
        return this.lat || latitude
      },
      longitude () {
        const longitude = this.$store.state.app.locationPoint.longitude
        return this.lon || longitude
      },
      circles () {
        return [{
          latitude: this.latitude,
          longitude: this.longitude,
          radius: this.radius,
          fillColor: '#dea4dd65',
          color: '#fff'
        }]
      }
    },
    onLoad(e) {
      if (e) {
        this.railId = e.railId
      }
    },
    onShow() {
      if (this.railId) {
        this.init()
      }
    },
    methods: {
      init () {
        const data = {
          memberId: this.memberId,
          sessionId: this.sessionId,
          railId: this.railId
        }
        this.$http.get('/mobile/user/getRail', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj[0]
              for (const x in obj) {
                this[x] = obj[x]
              }
            }
          })
      },
      modify () {
        if (!this.name) {
          this.$u.toast('请输入地址名称')
          return false
        }
        if (!this.address) {
          this.$u.toast('请点击地图选点')
          return false
        }
        const data = {
          sessionId: this.sessionId,
          watchId: this.watchId,
          radius: this.radius,
          name: this.name,
          lat: this.latitude,
          lon: this.longitude,
          address: this.address
        }
        if (this.railId) {
          data.railId = this.railId
        }
        const url = this.railId ? '/mobile/user/updateWatchRail' : '/mobile/user/addWatchRail'
        this.$http.post(url, data)
          .then(res => {
            if (res.data.success) {
              this.$u.toast(res.data.msg)
              setTimeout(() => {
                uni.navigateBack()
              }, 500)
            }
          })
      },
      selectRadius (e) {
        this.radius = e
        this.showSelect = false
      },
      mapTap (e) {
        console.log(e)
        const pos = e.detail
        const lat = pos.latitude.toFixed(6)
        const lng = pos.longitude.toFixed(6)
        // const fenceMap = uni.createMapContext('fenceMap', this)
        // console.log(fenceMap)
        // fenceMap.reverseGeocode(pos, (e) => {
        //   console.log('yyyyy')
        //   console.log(e)
        // })
        // console.log(lat, lng)
        const data = {
          key: 'ac35d325fe51d2ef03496f3a152ab818',
          location: lng + ',' +lat
        }
        this.$http.get(`https://restapi.amap.com/v3/geocode/regeo`, data)
          .then(res => {
            console.log(res)
            if (res.data.info === 'OK') {
              console.log('yyy')
              this.lat = pos.latitude.toFixed(6)
              this.lon = pos.longitude.toFixed(6)
              this.address = res.data.regeocode.formatted_address
            }
          })
      }
    }
	}
</script>

<style lang="scss" scoped>
.mapEL{
  height: 100vh;
  width: 750rpx;
}
.h-auto{
  height: auto;
}
</style>
