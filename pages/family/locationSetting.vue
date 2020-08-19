<template>
	<view>
      <view class="px-4 py-2 d-flex align-center justify-space-between">
        <view class="d-flex flex-column">
          <text>定位轨迹</text>
          <text class="caption red--text mt-2">
            关闭定位轨迹将无法查询定位信息
          </text>
        </view>
        <u-switch @change="switchChange" size="40" v-model="state" />
      </view>
      <u-line color="grey" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: false
			};
		},
    computed: {
      memberId: {
        get: function () {
          return this.$store.state.member.memberId
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
        this.$http.get('/mobile/user/getLocusSwitch', data)
          .then(res => {
            if (res.data.success) {
              this.state = Boolean(res.data.obj.state)
            }
          })
      },
      switchChange () {
        const data = {
          state: Number(this.state),
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.post('/mobile/user/updateLocusSwitch', data)
      }
    }
	}
</script>

<style lang="scss">

</style>
