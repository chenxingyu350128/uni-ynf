<template>
	<text :style="{ color: color, 'font-size': size + 'px' }" class="mdi" :class="type" @click="_onClick"></text>
</template>

<script>
	// #ifdef APP-NVUE
	// var domModule = weex.requireModule('dom');
	domModule.addRule('fontFace', {
		'fontFamily': "Material Design Icons",
		'src': url("./fonts/materialdesignicons-webfont.eot") format("embedded-opentype"), 
					 url("./fonts/materialdesignicons-webfont.woff2") format("woff2"), 
					 url("./fonts/materialdesignicons-webfont.woff") format("woff"), 
					 url("./fonts/materialdesignicons-webfont.ttf") format("truetype");
		});
	// #endif

	/**
	 * Icons 图标
	 * @description 用于展示 icons 图标
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=28
	 * @property {Number} size 图标大小
	 * @property {String} type 图标图案，参考示例
	 * @property {String} color 图标颜色
	 * @event {Function} click 点击 Icon 触发事件
	 */
	export default {
		name: 'UniIcons',
		props: {
			type: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#333333'
			},
			size: {
				type: [Number, String],
				default: 24
			}
		},
		data() {
			return {
			}
		},
		methods: {
			_onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style scoped>
	@import './css/materialdesignicons.css';
	
	/* #ifndef APP-NVUE */
		@import './css/materialdesignicons.css';


	/* #endif */
</style>