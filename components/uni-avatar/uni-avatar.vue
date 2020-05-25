<template>
	<view 
		style="display: flex; justify-content: center; align-items: center;overflow: hidden;"
		class="uni-avatar" 
		@click="_click" 
		:style="{'background-color': backgroundColor,'width': size+'px','height': size + 'px','border-radius': tile?'unset':size+'px'}">
		<slot class="inner"></slot>
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
<style lang="scss" scoped>
	.uni-avatar{
		>*{
			width: 100%;
			height: 100%;
		}
	}
</style>
