<template>
	<view class="mb60 index-page grey lighten-2">
		    <!-- 上部蓝色块 -->
		    <view color="blue" dark tile flat>
		      <view ref="blueUp" class="mx-0 primary white--text d-flex justify-space-around">
		        <view class="d-flex align-start caption flex-fill px-2">
		          <view @click="showCityPicker=true" class="d-flex align-center flex-fill">
		            {{city}}
		            <uni-icons color="white" type="mdi-chevron-down"></uni-icons>
		          </view>
		        </view>
		        <view class="d-flex  justify-center caption flex-fill">
							<uni-icons v-if="!eazyMode" @click="addWatch(watchId)" class="grey--text lighten-3" :type="watchId?'mdi-watch':'mdi-plus-circle'" :size="watchId?45:75"></uni-icons>
		            <!-- <text  class="mdi" :class="watchId?'mdi-watch':'mdi-plus-circle'" :size="watchId?45:75"></text> -->
		      <!--    <v-btn @click="addWatch(watchId)" width="75" height="75" v-if="!eazyMode" depressed class="show_device" color="grey lighten-4" fab >
		          </v-btn> -->
		          <text v-else class="subtitle-1">颐纳福</text>
		        </view>
		        <view class="d-flex justify-end align-start flex-fill">
		          <v-badge 
		            v-if="msgCount"
		            :content="msgCount" 
		            class="caption"
		            overlap
		            offset-x="15"
		            offset-y="10"
		            @click.native="showMsgCenter=true"
		            color="pink accent-3">
		                <text class="pa-0 mdi mdi-email-outline"></text>
		            </v-badge>
		          <text v-else @click="showMsgCenter=true" class="mdi mdi-email-outline"></text>
		        </view>
		      </view>
		       <view ref="blueDown" justify-center wrap class="text-center caption pb-4">
		         <view class="subtitle-2 mb-5 mt-4" xs12>
		           {{watchId?'已绑定智能腕表':'请添加您的腕表'}}
		         </view>
		         <view xs4>
		           <view>步数</view>
		           <view v-if="watchId">{{steps}}步</view>
		           <view v-else>_ _</view>
		         </view>
		         <view xs4>
		           <view>睡眠时长</view>
		           <view v-if="watchId">{{sleep}}小时</view>
		           <view v-else>_ _</view>
		         </view>
		         <view>
		           <view>心率</view>
		           <view v-if="watchId">{{heartRate}}bpm</view>
		           <view v-else>_ _</view>
		         </view>
		         <view class="py-1">
		         </view>
		       </view>
		    </view>
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
				noImage: require('../../assets/img/noImage.png'),
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
	.index-page{
		height: 100vh;
		overflow-y: auto;
	}
	.mb60{
		margin-bottom: 60px;
	}
	.pa10{
		padding: 10px;
	}
</style>
