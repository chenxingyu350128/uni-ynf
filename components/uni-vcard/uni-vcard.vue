<template>
	<view :style="{'background-color': bgColor, 'color': color}" class="elevation-3" :class="[{'flat': flat}, {'tile': tile}]">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			bgColor: {
				type: String,
				default: '#fff'
			},
			color: {
				type: String,
				default: '#333'
			},
			tile: {
				type: Boolean,
				default: false
			},
			flat: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped lang="scss">
	view{
		border-radius: 10rpx;
	}
	.flat{
		box-shadow: unset!important;
	}
	.tile{
		border-radius: unset!important;
	}
</style>
