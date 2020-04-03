<template>
	<view>
    <view class="row" v-if="offset"> 
			<view  :class="'row-'+offset">
			</view>
			<view class="row flex-fill" :style="{'justify-content': justify, 'align-items': align, 'flex-direction': dir}">
				<slot></slot>
			</view>
    </view>
    <view v-else class="row" :style="{'justify-content': justify, 'align-items': align, 'flex-direction': dir}"> 
      <slot></slot>
    </view>
		
	</view>
</template>

<script>
	export default {
		name: 'uniRow',
		props: {
			justify: {
				type: String,
				default: 'flex-start'
			},
			align: {
				type: String,
				default: 'flex-start'
			},
			dir: {
				type: String,
				default: 'row'
			},
			offset: {
				type: Number|String,
				default: 0
			}
		},
	}
</script>

<style scoped lang="scss">
	view{
		box-sizing: border-box;
		.row{
			display: flex;
		}
		@for $i from 1 through 100 {
			.row-#{$i} {
				width: $i/100*100%
			}
		}
		
	}
</style>
