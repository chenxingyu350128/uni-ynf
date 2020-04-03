<template>
	<view>
		mine
		<uni-bottom-nav :list="tabbarList" height="50px"></uni-bottom-nav>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbarList: [
					{
						icon: 'mdi-home',
						text: '首页',
					},
					{
						icon: 'mdi-clock-outline',
						text: '家人',
					},
					{
						icon: 'mdi-room-service-outline',
						text: '服务',
					},
					{
						icon: 'mdi-account-circle',
						text: '我的',
					}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
