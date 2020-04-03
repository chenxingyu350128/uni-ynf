<template>
	<view :class="[{'fixed': fixed}, {'bottom': bottom}]">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'uniFooter',
		props: {
			fixed: {
				type: Boolean,
				default: false
			},
			bottom: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped lang="scss">
	.fixed{
		position: fixed;
		left: 0;
		right: 0;
	}
	.bottom{
		bottom: 0;
	}
</style>
