<template>
	<view 
		style="display: flex; justify-content: center; align-items: center;"
		class="uni-avatar" 
		@click="_click" 
		:style="{'background-color': backgroundColor,'width': size+'rpx','height': size + 'rpx','border-radius': tile?'unset':size+'rpx'}">
		<slot></slot>
	</view>
</template>

<script>
	
	/**
	 * avatar 头像
	 * @property {Number} size 头像大小
	 * @property {String} background-color 背景颜色
	 * @property {String} tile 清除圆角（正方形）
	 * @event {Function} click 点击 Icon 触发事件
	 */
	export default {
		name: 'uni-avatar',
		props:{
			size: {
				type: [Number, String],
				default: 50
			},
			backgroundColor: {
				type: String,
				default: 'transparent'
			},
			tile: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			_click(){
				this.$emit('click')
			}
		}
	}
</script>
