<template>
	<view class="mb60">
		<uni-card >
			<text style="color: #007AFF;"  class="mdi mdi-24px mdi-check"></text>
		</uni-card>
		<tab-bar></tab-bar>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/collocation/pages?id=easycom'
			}
		},
		methods: {
			navToNext() {
				uni.navigateTo({
					url: '../nextPage/nextPage'
				})
			}
		}
	}
</script>

<style>
	.intro {
		font-size: 14px;
		line-height: 24px;
	}
	.mb60{
		margin-bottom: 60px;
	}
	.pa10{
		padding: 10px;
	}
</style>
