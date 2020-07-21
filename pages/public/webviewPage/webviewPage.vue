<template>
	<view>
		<!-- 协议 -->
		 <web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
        title: ''
			};
		},
    onLoad(e) {
      console.log(e)
      this.url = decodeURIComponent(e.url)
      console.log(this.url)
      this.title = e.title
      uni.setNavigationBarTitle({
        title: this.title
      })
      uni.setNavigationBarColor({
        backgroundColor: '#e3393c'
      })
    }
	}
</script>

<style lang="scss">

</style>
