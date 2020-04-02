<template>
	<view class="mb60 d-block grey lighten-3">
		<!-- 上部蓝色块 -->
		<view class="d-block primary white--text">
			<view ref="blueUp" class="mx-0  white--text d-flex justify-space-around">
				<view class="d-flex align-start caption flex-fill px-2">
					<view @click="showCityPicker=true" class="d-flex align-center flex-fill">
						{{city}}
						<uni-icons color="white" type="mdi-chevron-down"></uni-icons>
					</view>
				</view>
				<view class="d-flex  justify-center caption flex-fill  py-2">
					<uni-avatar v-if="!eazyMode" @click="addWatch(watchId)" backgroundColor="#fff" size="75">
						<template v-slot:inner>
							<uni-icons  class="grey--text lighten-3" :type="watchId?'mdi-watch':'mdi-plus-circle'" :size="watchId?45:75"></uni-icons>
						</template>
					</uni-avatar>					
						<!-- <text  class="mdi" :class="watchId?'mdi-watch':'mdi-plus-circle'" :size="watchId?45:75"></text> -->
			<!--    <v-btn @click="addWatch(watchId)" width="75" height="75" v-if="!eazyMode" depressed class="show_device" color="grey lighten-4" fab >
					</v-btn> -->
					<text v-else class="subtitle-1">颐纳福</text>
				</view>
				<view class="d-flex justify-end align-start flex-fill px-2">
					<uni-icons  size="22" @click="showMsgCenter=true" color="#fff" type=" mdi-email-outline"></uni-icons>
					<uni-badge v-if="msgCount"  text="9" size="small" type="error"></uni-badge>
					<!-- <text v-else @click="showMsgCenter=true" class="mdi mdi-email-outline"></text> -->
				</view>
			</view>
			
			

			 <view ref="blueDown" class="text-center caption pb-4 d-flex justify-between flex-wrap">
				 <view class="subtitle-2 mb-5 mt-4 fill-width">
					 {{watchId?'已绑定智能腕表':'请添加您的腕表'}}
				 </view>
				 <view class="flex-fill">
					 <view>步数</view>
					 <view v-if="watchId">{{steps}}步</view>
					 <view v-else>_ _</view>
				 </view>
				 <view class="flex-fill">
					 <view>睡眠时长</view>
					 <view v-if="watchId">{{sleep}}小时</view>
					 <view v-else>_ _</view>
				 </view>
				 <view class="flex-fill">
					 <view>心率</view>
					 <view v-if="watchId">{{heartRate}}bpm</view>
					 <view v-else>_ _</view>
				 </view>
				 <view class="py-1">
				 </view>
			 </view>
		</view>
    <!-- 导购 -->
    <view v-if="!watchId" class="grey buyWatch lighten-2 d-flex align-center pa-1 ma-1">
        <view class="pa-1 caption white flex-fill" height="34" justify-space-between xs12>
					<uni-row align="center" @click="toShopMall" justify="center" class="mx-0 pa-0 fill-height">
						<uni-col col="45" class="d-flex align-center pa-0">
							<uni-icons color="#F09436" type="mdi-alert-circle-outline"></uni-icons>
              <!-- <v-icon color="#F09436" class="mr-1 mdi-18px">mdi-alert-circle</v-icon> -->
              <text class="font-weight-bold ml-2">健康第一步：</text>							
						</uni-col>
						<uni-col col="55" class="d-flex align-center justify-end pa-0">
								<text class="flex-fill">买个智能腕表</text>
								<button size="mini" type="primary">详情</button>
						</uni-col>
					</uni-row>
					
<!--          <view @click="toShopMall" align="center" class="text-center d-flex justify-space-between mx-0 pa-0 fill-height">
            <view class="d-flex align-center pa-0" cols="6">
							<uni-icons color="#F09436" type="mdi-alert-circle-outline"></uni-icons>
              <text class="subtitle-2 font-weight-bold">健康第一步:</text>

            </view>
            <view cols="6" class="text-right pa-0">
              <text class="caption grey--text d-flex align-center justify-end">
                买个智能腕表
								<button size="mini" type="primary">详情</button>
              </text>
            </view>
          </view> -->
        </view>
    </view>		
		<!-- 轮播 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in bannerList" :key="i">
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
		<tab-bar></tab-bar>

		
	</view>
</template>

<script>
	export default {
		name: 'index',
		data() {
			let view = this
			return {
				progress: '',
				forceUpdate: '',
				appDownloadUrl: '',
				whatIsNew: '',
				newVersion: '',
				showProgress: false,
				showDia: false,
				amapManager,
				center: [119.3576,25.9932],
				zoom: 12,
				events: {
					init: (map)=>{
						console.log(view.zoom)
						map.getCity(result => {
							console.log(result)
							let cityName = result.city
							let city = cityName.slice(0,cityName.length-1)
							view.commit('SET_SINGLE_STATE', ['positionCity', city])
						})
					}
				},
				notShow: false,
				noImage: require('@/static/img/noImage.png'),
				newsId: 0,
				steps: 0,
				sleep: 0,
				msgCount: 0,
				heartRate: 0,
				latitude: 0,
				longitude: 0,
				exitState: 0,
				fileTransfer: null,
				page: 1,
				rows: 10,
				// appList: [],
				// headLines:[],
				notTrue: false,
				eazyMode: false,
				// sId: this.sessionId,
				showCityPicker: false,
				allLoaded: false,
				showMsgCenter: false,
				// showDetail: false,
				today: new Date(),
				fileName: 'ynf.apk',
				appType: '',
				filePath: '',
				exitTimeout: '',
				showNewsDetail: false
			}
		},
		computed: {
			dateFormat(){
				return this.$dateStr(this.today)
			},
			watchId(){
				return this.$store.state.member.watchId
			}, 
			memberId(){
				return parseInt(this.$store.state.member.memberId)
			},
			sessionId(){
				return this.$store.state.app.sessionId
			},
			userId(){
				return this.$store.state.app.userId
			},
			token(){
				return this.$store.state.app.token
			},
			appList(){
				return this.$store.state.app.appList
			},
			headLines(){
				return this.$store.state.app.headLines
			},
			bannerList(){
				return this.$store.state.app.bannerList||[]
			},
			exitAppEnv(){
				let arr = [
					'showCityPicker',
					'showMsgCenter',
					'showNewsDetail',
				]
				let todo = true 
				arr.forEach(res=>{
					if(this[res]){
						todo = false
					}
				})
				return todo     
			},
			fileFullName(){
				return this.filePath + this.fileName
			},
			params(){
				return {
					memberId: this.memberId,
					type: 1,
					data: this.dateFormat,
					sessionId: this.sessionId
				}
			},
			dataType(){
				return this.$store.state.app.dataType
			},
			city(){
				return this.$store.state.app.positionCity
			},
		},	
		onShow() {
    //上滑动时上部简化
			let up = this.$refs.blueUp
			let down = this.$refs.blueDown
			console.log(this.$refs.blueDown)
			let that = this
			this.$el.addEventListener('scroll', () => {
				var scrollTop = document.querySelector('.index-cpnt')
				// console.log(scrollTop.scrollHeight)
				that.eazyMode = that.$el.scrollTop>0
				that.$el.style['paddingTop'] = that.$el.scrollTop>0?'52px':'0'
				up.style.position = that.eazyMode?'fixed':'unset'
				up.style.width = '100%'
				up.style.zIndex = '99'
				up.style.top = that.eazyMode?'0':'unset'
				up.style.left = that.eazyMode?'0':'unset'
				down.style.display = that.eazyMode?'none':'flex'
				// console.log(that.$el.scrollTop) // 查看打印的值是否有变化 如果有 则说明滚滚动条在这个标签中
				// scrollTop.scrollTop = scrollTop.scrollHeight // 可以尝试下 滚动滚动条。一直在底部则可以设置成功
			}, true)			
		},
		methods: {
			navToNext() {
				uni.navigateTo({
					url: '../nextPage/nextPage'
				})
			}
		}
	}
</script>

<style>
	.mb60{
		margin-bottom: 60px;
	}
	.pa10{
		padding: 10px;
	}
</style>
