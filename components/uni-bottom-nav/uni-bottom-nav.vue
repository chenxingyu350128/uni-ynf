<template>
	<view :style="{'height': height}" class="uni-bottom-nav fixed bottom  bt1px">
		<view class="flex-fill item" v-for="(item,index) in list" :key="index">
			<view class="para" @tap="switchTab(index)">
				<uni-icons size="25" :type="item.icon" :color="currentTabIndex===index?'#00aaef':'#999'"></uni-icons>
				<text class="caption" :style="[currentTabIndex == index ? {'color': activeColor} : {'color': inActiveColor}]">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uniBottomNav',
		// data() {
		// 		return {
		// 				tabList:
		// 				[
		// 						{
		// 								icon: 'mdi-home',
		// 								text: '首页',
		// 						},
		// 						{
		// 								icon: 'mdi-clock-outline',
		// 								text: '家人',
		// 						},
		// 						{
		// 								icon: 'mdi-room-service-outline',
		// 								text: '服务',
		// 						},
		// 						{
		// 								icon: 'mdi-account-circle',
		// 								text: '我的',
		// 						}
		// 				]
		// 		}
		// },
		props: {
			backgroundColor: { 
				type: String, 
				default: '#fbfbfb' ,
			},
			inActiveColor: { 
				type: String, 
				default: '#999' ,
			},
			activeColor: { 
				type: String, 
				default: '#00aaef' ,
			},
			height: { 
				type: String, 
				default: '45px' ,
			},
			list: {
				type: Array,
				default: [],
				required: true
			}
		},
		computed: {
			currentTabIndex () {
				return this.$store.state.app.tabbarIndex
			},
			tabList(){
				return 
			}
		},
		methods: {
			switchTab(index){
				if(this.currentTabIndex===index) {
					return
				}
				this.$store.commit('SET_SINGLE_STATE', ['tabbarIndex', index])
				const tabbarUrls = [
					'../index/index',
					'../family/family',
					'../service/service',
					'../mine/mine',
					
				]
				uni.navigateTo({
					
					url: tabbarUrls[index]
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.uni-bottom-nav{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.para{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.flex-fill{
		flex: 1;
	}
	.fixed{
		position: fixed;
	}
	.tile{
		border-radius: unset;
	}
	.fixed.bottom{
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		background-color: #fff;
	}
	.margin-bottom-tabbar{
		padding-bottom: 600px;
	}
	.bt1px{
		border-top: 1px solid #ccc;
	}
	.tabbarHeight{
		height: 50px;
	}
</style>

