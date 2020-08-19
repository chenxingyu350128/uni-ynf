<template>
	<view>
		<!-- 暂无原型，未定稿 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drId: ''
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onLoad(e) {
      if (e) {
        this.drId = e.id
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        const data = {
          drId: this.drId,
          sessionId: this.sessionId
        }
        this.$http.get('/mobile/device/getDeviceReport', data)
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
