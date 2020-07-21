<template>
	<view ref="textField" class="textField mb-4" :style="[actived?activeClass:inActiveClass]" :class="[{'rounded': rounded }, {'filled': filled}, {'isDense': dense}]">
		<text v-if="prependText" style="font-size: 13px;" v-text="prependText"></text>
		<view v-if="prependIcon">
			<text class="mdi" :class="prependIcon"></text>
		</view>
		<input 
			@input="inputListeners"
			style="flex: 1; padding-left: 2em;font-size: 13px;" 
			@blur="onBlur" 
			@focus="onFocus" 
			:type="type" 
			:value="value"
			:password="password"
			:placeholder="placeholder"
		/>
		<slot>
      <view v-if="appendIcon">
        <text class="mdi" :class="appendIcon"></text>
      </view>
      <text v-if="appendText" style="font-size: .8em;"  v-text="appendText"></text>      
    </slot>
	</view>
</template>

<script>
	export default {
		name: 'uniTextField',
    data: () => ({
      actived: false,
      inActiveClass: {
        'border-color': '#666'
      }
    }),
    computed: {
      activeClass () {
        return {
          'border-color': this.color
        }
      }
    },
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
			rounded: {
				type: Boolean,
				default: false
			},
			filled: {
				type: Boolean,
				default: false
			},
			dense: {
				type: Boolean,
				default: false
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
				default: '#00aaef'
			}
		},
		methods: {
      inputListeners (e) {
      	const res = e.target.value
        this.$emit('input', res)
      },
			onFocus(){
        this.actived = true
			},
			onBlur(){
        this.actived = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.textField{
    box-sizing: border-box;
		display: flex;
		padding: 15rpx;
		align-items: center;
    height: 86rpx;
		border: 1px solid #ccc;
		border-radius: 10rpx;
    background-color: #fff;
		input{
			flex: 1;
			padding: 0 2em!important;
		}
	}
	.rounded{
		border-radius: 43rpx;
	}
	.filled{
		border: unset;
		background-color: #D3D3D3;
	}
  .isDense{
    height: 78rpx;
  }
</style>