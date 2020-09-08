<template>
	<view>
    <view>
      <u-field 
        v-model="walkStep" 
        label="走路足距"
        type="number"
        placeholder="请输入走路时的足距" 
      > 
        <view slot="right">CM</view>
      </u-field>
      <u-field 
        v-model="runStep" 
        label="跑步足距"
        type="number"
        placeholder="请输入跑步时的足距" 
      > 
        <view slot="right">CM</view>
      </u-field>
    </view>
		<view class="posFix b0 full-width">
      <u-button @click="changeSetting" :custom-style="style" type="primary">保存</u-button>
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
				walkStep: 27,
        runStep: 35
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
    },
    methods: {
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getStep', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              if (obj) {
                this.runStep = obj.runStep
                this.walkStep = obj.walkStep
              }
            }
          })
      },
      changeSetting () {
        if (!this.walkStep) {
          this.$u.toast('请输入走路时的足距')
          return false
        }
        if (!this.runStep) {
          this.$u.toast('请输入跑步时的足距')
          return false
        }
        const data = {
          memberId: this.memberId,
          watchId: this.watchId,
          sessionId: this.sessionId,
          walkStep: this.walkStep,
          runStep: this.runStep
        }
        this.$http.post('/mobile/healthy/setWatch', data)
          .then(res => {
            if (res.data.success) {
              this.$u.toast(res.data.msg)
              setTimeout(() => {
                uni.navigateBack()
              }, 500)
            }
          })
      }
    }
	}
</script>

<style lang="scss">
/deep/.fild-body{
  input{
    text-align: right!important;
  }
}
</style>
