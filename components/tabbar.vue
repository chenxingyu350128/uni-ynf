<template>
	<view class="tabbar d-flex align-center justify-around fixed bottom tabbarHeight bt1px">
		
		<view v-for="(item,index) in tabList" :key="index">
			<view class="d-flex flex-column align-center para" @tap="switchTab(index)">
				<uni-icons size="25" :type="item.icon" :color="currentTabIndex===index?'#00aaef':'#999'"></uni-icons>
				<text class="caption" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tabbar',
        data() {
            return {
                tabList: [
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
                ]
            }
        },
		props: {
			backgroundColor: { 
				type: String, 
				default: '#fbfbfb' ,
			},
			color: { 
				type: String, 
				default: '#999' ,
			},
			tintColor: { 
				type: String, 
				default: '#00aaef' ,
			}
		},
		computed: {
			currentTabIndex () {
				return this.$store.state.app.tabbarIndex
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

<style scoped>
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
