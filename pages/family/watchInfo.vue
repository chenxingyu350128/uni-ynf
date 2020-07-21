<template>
	<view>
		<u-cell-group>
		  <u-cell-item title="设备型号" :value="seriesName" :arrow="false"></u-cell-item>
		  <u-cell-item title="IMEI" :value="watchImei" :arrow="false"></u-cell-item>
		  <u-cell-item title="物联网卡号" :value="phone" :arrow="false"></u-cell-item>
		  <u-cell-item title="首次开通时间" :value="openTime" :arrow="false"></u-cell-item>
		  <u-cell-item title="围栏提醒" :arrow="false">
        <u-switch @change="updateRemind" size="35" slot="right-icon" v-model="checked"></u-switch>
      </u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				seriesName: '',
				watchImei: '',
				openTime: '',
        checked: false
			};
		},
    computed: {
      sessionId(){
        return this.$store.state.app.sessionId
      },
      memberId(){
        return this.$store.state.member.memberId
      }
    },
    onShow() {
      this.init()
      this.getState()
    },
    methods: {
      getState () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/user/getWatchRailRemind', data)
          .then(res => {
            if (res.data.success) {
              this.checked = Boolean(res.data.obj.state)
            }
          })
      },
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getWatchDetail', data)
        .then(res => {
          console.log(res)
          if(res.data.success){
            const obj = res.data.obj
            for (const x in obj) {
              this[x] = obj[x]
            }
          }
        })     
      },
      updateRemind () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          state: Number(this.checked)
        }
        this.$http.post('mobile/user/updateRemind', data)
      }
    }
	}
</script>

<style lang="scss">

</style>
