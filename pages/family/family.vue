<template>
	<view class="body-2">
		<uni-row offset="20" align="space-around" class="pink">
					<uni-col class="red white--text flex-fill" col="20">20</uni-col>
					<uni-col class="teal white--text flex-fill exp" col="20">20</uni-col>
			
		</uni-row>
		asdf
		<uni-col class="red white--text" col="20">20</uni-col>
		<uni-col class="red white--text" col="20">20</uni-col>
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

<style scoped>
	.exp{
		margin-left: 48rpx;
	}
</style>
