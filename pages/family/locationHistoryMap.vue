<template>
	<view>
		<map 
    id="historyMap"
    :latitude="latitude" :longitude="longitude"
     style="width: 750rpx; height: 100vh" 
    :polyline="polyline" 
    :include-points="includePoints"
    :markers="SE_markers"
    ></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				day: '',
        longitude: '',
        latitude: '',
        items: [],
        markers: [],
        polyline: [],
        includePoints: [],
        movableMarker: null,
        timer: null
			};
		},
    computed: {
      startMarker () {
        const x = this.markers
        const n = x.length
        
        return n ? {
          id: 1225,
          latitude: x[0].latitude,
          longitude: x[0].longitude,
          iconPath: './static/map/map_marker_start.png',
          width: 20,
          height: 30
        } : ''
      },
      endMarker () {
        const x = this.markers
        const n = x.length
        
        return n ? {
          id: 1226,
          latitude: x[n-1].latitude,
          longitude: x[n-1].longitude,
          iconPath: './static/map/map_marker_end.png',
          width: 20,
          height: 30
        } : ''
      },
      SE_markers () {
        return [this.startMarker, this.endMarker]
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
      translateMarker () {
        const moveRail = uni.createMapContext('historyMap', this)
        const steps = this.polyline[0].points
        const len = steps.length
        for (let i = 0; i<len-1; i++) {          
          moveRail.translateMarker({
            markerId: 1225,
            destination: steps[i+1],
            duration: 2500
          })
        }
      },
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
              this.longitude = this.items[0].lon
              this.latitude = this.items[0].lat
              let arr = []
              let markers = []
              let includePoints = []
              this.items.forEach((re,idx)=>{
                arr[idx] = {
                  latitude: re.lat,
                  longitude: re.lon
                }
                includePoints.push([re.lat, re.lon])
                markers.push({
                  id: 'marker_m' + idx,
                  latitude: re.lat,
                  longitude: re.lon,
                  iconPath: './static/map/marker.png'
                })
              })
              this.polyline = [{
                points: arr,
                color: '#d33682',
                arrowLine: true,
                width: 6
              }]
              this.markers = markers
              this.includePoints = includePoints
              this.$nextTick(()=>{
                
                this.translateMarker()
              },2000)
            }
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
