<template>
	<view>
    <u-field
      v-model="gluMin" 
      label="最低血糖"
      type="number"
      placeholder="请输入最低血糖"
    > 
      <view slot="right">mmol/L</view>
    </u-field>
    <u-field 
      v-model="gluMax" 
      label="最高血糖"
      type="number"
      placeholder="请输入最高血糖" 
    > 
      <view slot="right">mmol/L</view>
    </u-field>
    <view class="mt-2 white">
      <u-field 
        v-model="bloodSuger" 
        label="发送频率"
        type="number"
        placeholder="请输入发送频率" 
      > 
        <view slot="right">秒/次</view>
      </u-field>
    </view>
		<view class="posFix b0 full-width">
      <u-button @click="setting" :custom-style="style" type="primary">保存</u-button>
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
        gluMax: 6.1,
        gluMin: 3.9,
        bloodSuger: 600
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
      setting () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          watchId: this.watchId,
          gluMin: this.gluMin,
          gluMax: this.gluMax
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
                this.bloodSuger = obj.bloodSuger
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

<style lang="scss" scoped>
/deep/.u-label-text{
  white-space: nowrap!important;
}
/deep/.fild-body{
  input{
    text-align: right!important;
  }
}
</style>
