<template>
	<view>
		<map style="width: 750rpx; height: 100vh" :polyline="polyline" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				day: '',
        items: [],
        coordinates: [],
        polyline: [
          {
            latitude: 26.04769,
            longitude: 119.27345
          },
          {
            latitude: 26.04869,
            longitude: 119.23345
          },
          {
            latitude: 26.04839,
            longitude: 119.23245
          },
          {
            latitude: 26.04829,
            longitude: 119.27345
          }
        ],
        movableMarker: null,
        timer: null
			};
		},
    computed: {
      startMarker () {
        const x = this.polyline
        const n = x.length
        
        return n ? {
          id: 'marker_s',
          latitude: x[0].latitude,
          longitude: x[0].longitude,
          iconPath: './static/map/map_marker_start.png'
        } : ''
      },
      endMarker () {
        const x = this.polyline
        const n = x.length
        
        return n ? {
          id: 'marker_e',
          latitude: x[n-1].latitude,
          longitude: x[n-1].longitude,
          iconPath: './static/map/map_marker_end.png'
        } : ''
      },
      memberId () {
        return this.$store.state.member.memberId
      },
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onLoad(e) {
      if (e.day) {
        this.day = e.day
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        let data = {
          memberId: this.memberId,
          sessionId: this.sessionId,
          day: this.day
        }
        this.$http.get('/mobile/user/getLocationHistory', data)
          .then(res => {
            if (res.data.success) {
              this.items = res.data.obj
              let arr = []
              let markers = []
              this.items.forEach((re,idx)=>{
                arr[idx] = [re.lon, re.lat]
                arr.push({
                  latitude: re.lat,
                  longitude: re.lon
                })
                markers.push({
                  id: 'marker_m' + idx,
                  latitude: x[idx].latitude,
                  longitude: x[idx].longitude,
                  iconPath: './static/map/marker.png'
                })
              })
              this.polyline = arr
              this.markers = [].concat([this.startMarker]).concat(markers).concat([endMarker])
            }
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
