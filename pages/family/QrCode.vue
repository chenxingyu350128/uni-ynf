<template>
	<view class="py-12 d-flex flex-column align-center">
    <u-image shape="circle" :src="image" width="240" height="240"></u-image>
    <text class="mt-8">{{realName||'???'}}</text>
    <text class="my-8">编号：{{memberNum}}</text>
		<canvas canvas-id="qrcode" style="width: 150px; height: 150px;" />
	</view>
</template>

<script>
  import uQRCode from '../../js_sdk/Sansnn-uQRCode/uqrcode.js'
	export default {
		data() {
			return {
				
			}
		},
    computed: {
      memberNum () {
        return this.$store.state.member.memberNum || '419210890'
      },
      image () {
        return this.$store.state.member.image
      },
      realName () {
        return this.$store.state.member.realName
      },
    },
    onShow() {
      uQRCode.make({
        canvasId: 'qrcode',
        componentInstance: this,
        text: this.memberNum,
        size: 150,
        margin: 10,
        backgroundColor: '#ffffff',
        foregroundColor: '#000000',
        fileType: 'jpg',
        correctLevel: uQRCode.defaults.correctLevel,
        success: res => {
          console.log(res)
        }
      })
    },
		methods: {
			
		}
	}
</script>

<style>

</style>
