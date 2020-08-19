<template>
	<view>
    <u-field
      v-model="hrMin" 
      label="最低心率"
      type="number"
      placeholder="请输入最低心率" 
    > 
      <view slot="right">bpm</view>
    </u-field>
    <u-field 
      v-model="hrMax" 
      label="最高心率"
      type="number"
      placeholder="请输入最高心率" 
    > 
      <view slot="right">bpm</view>
    </u-field>
    <view class="py-2"></view>
    <u-field 
      class="mt-3"
      v-model="heartRate" 
      label="发送频率"
      type="number"
      placeholder="请输入发送频率" 
    > 
      <view slot="right">秒/次</view>
    </u-field>
		<view class="posFix b0 full-width">
      <u-button @click="hrSetting" :custom-style="style" type="primary">保存</u-button>
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
				hrMin: 55,
        hrMax: 120,
        heartRate: 600
			};
		},
    computed: {
      memberId: {
        get: function () {
          return this.$store.state.member.memberId
        },
        set: function () {}
      },
      watchId: {
        get: function () {
          return this.$store.state.member.watchId
        },
        set: function () {}
      },
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onShow() {
      this.init()
      this.getRate()
    },
    methods: {
      hrSetting () {
        const data = {
          hrMin: this.hrMin,
          hrMax: this.hrMax,
          heartRate: this.heartRate,
          watchId: this.watchId,
          memberId: this.memberId,
          sessionId: this.sessionId
        }
        this.$http.post('mobile/healthy/setWatch', data)
          .then(res => {
            if (res.data.success) {
              this.$u.toast(res.data.msg)
              setTimeout(() => {
                uni.navigateBack()
              }, 500)
            }
          })
      },
      getRate () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getRate', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              if (obj) {
                this.heartRate = obj.heartRate
              }
            }
          })
      },
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getHealthyRange', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
            }
          })
      }
    }
	}
</script>

<style lang="scss">

</style>
