<template>
	<view @click="toFocuse($event)" ref="textField" class="cpnt" :class="[{'round': round }, {'fill': fill}]">
		<text v-if="prependText" style="font-size: 13px;" v-text="prependText"></text>
		<view v-if="prependIcon">
			<text class="mdi" :class="prependIcon"></text>
		</view>
		<input 
			v-on="inputListeners"
			style="flex: 1; padding-left: 2em;font-size: 13px;" 
			@blur="onBlur" 
			@focus="onFocuse" 
			:type="type" 
			:value="value"
			:maxlength="maxlength"
			:password="password"
			:placeholder="placeholder"
		/>
		<view v-if="appendIcon">
			<text class="mdi" :class="appendIcon"></text>
		</view>
		<slot #append></slot>
		<!-- <text style="font-size: .8em;" v-if="appendText" v-text="appendText"></text> -->
	</view>
</template>

<script>
	export default {
		name: 'uniTextField',
		// model: {
		// 	prop: 'value',
		// 	event: 'input'
		// },
		props: {
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: ''
			},
			prependIcon: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'text'
			},
			password: {
				type: Boolean,
				default: false
			},
			round: {
				type: Boolean,
				default: false
			},
			fill: {
				type: Boolean,
				default: false
			},
			maxlength: {
				type: Number,
				default: 9
			},
			appendIcon: {
				type: String,
				default: ''
			},
			appendText: {
				type: String,
				default: ''
			},
			prependText: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			}
		},
		computed: {
			inputListeners: function () {
				var vm = this
				// `Object.assign` 将所有的对象合并为一个新对象
				return Object.assign({},
					// 我们从父级添加所有的监听器
					this.$listeners,
					// 然后我们添加自定义监听器，
					// 或覆写一些监听器的行为
					{
						// 这里确保组件配合 `v-model` 的工作
						input: function (event) {
							vm.$emit('input', event.target.value)
						}
					}
				)
			}
		},
		methods: {
			toFocuse(e){
				console.log(e)
				console.log(this)
				console.log(file[0])
				console.log(Object.values(file)[0])
				
			},
			onFocuse(){
				const theDom = this.$refs.textField.$el.style;
				theDom['color'] = theDom['border-color'] = this.color
			},
			onBlur(){
				const theDom = this.$refs.textField.$el.style;
				theDom['color'] = theDom['border-color'] = '#666'
			},
			
		}
	}
</script>

<style scoped>
	.cpnt{
		display: flex;
		padding: 15rpx;
		align-items: center;
		border: 1px solid #ccc;
		border-radius: 10rpx;
		>input{
			flex: 1;
			background-color: red;
			padding: 0 2em!important;
		}
	}
	.round{
		border-radius: calc((1em + 30rpx + 2px)/2);
	}
	.fill{
		border: unset;
		background-color: #D3D3D3;
	}
</style>
