<template>
	<view ref="indexPage" class="mb60 d-block grey lighten-3">
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
		<uni-bottom-nav :list="tabbarList" height="50px"></uni-bottom-nav>
		
	</view>
</template>

<script>
	import VueAMap from 'vue-amap'
	let amapManager = new VueAMap.AMapManager()
	
	export default {
		name: 'index',
		data() {
			let view = this
			return {
				tabbarList: [
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
				],
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
			//获取位置
			this.getPosition()
			//检测更新
			this.checkNewVersion()
			this.init()
			//防抖
			this.loadbottom = this._.debounce(this.loadMore, 200)
			const page = this.$refs.indexPage
			console.log(page)
		},
		beforeCreate() {
			if(!this.sessionId){
				// uni.navigateTo({
				// 	url: '/pages/login/login'
				// })
			}
		},
		beforeDestroy() {
			window.clearTimeout(this.exitTimeout);
			document.removeEventListener('backbutton',this.runBack,false)
			document.removeEventListener('backbutton',this.backBtn,false)
		},
		methods: {
			commit(x,y){
				this.$store.commit(x, y)
			},
			init(){
				this.getIndex()
				this.getMemberList()
				this.getHouse()
				this.getMsg()
				this.findNewsPage()
				console.info(this.$store.state.app)
			},
			backBtn(){
				let arr = [
					'showCityPicker',
					'showMsgCenter',
					'showNewsDetail',
					]
				arr.forEach(res=>{
					if(this[res]){
						this[res] = false
					}
				})
			},
			runBack(){
				console.log('筛选路由///');
				
				// let arr= ['/index','/family','/service','/mine']
				if(this.$route.path=='/index'){
					console.warn('去吧皮卡丘');
					
					window.plugins.toast.showLongCenter('再点击一次退出!');
					this.exitState ++
					// document.removeEventListener("backbutton", this.runBack, false);//注销返回键
					//3秒后重新注册
					this.exitTimeout = window.setTimeout(
						()=>{
							this.exitState=0
							window.clearTimeout(this.exitTimeout);
							// document.addEventListener("backbutton", this.runBack, false);//返回键
						},2000
					)
					console.warn('zhiwei:'+this.exitState);
					
					if(this.exitState>1){
						navigator.app.exitApp()
					}   
				}
			},
			addWatch(watchId){
				if(watchId){
					return
				}
				this.$router.push('/addWatch')
			},
			closeDialog(){
				this.showDia=false
			},
			btnClick(){
				if(!this.progress){
					this.createFile()
				}
			},
			async checkNewVersion(){
				if(device){
					if (device.platform == "iOS") {
						this.appType = 2
						this.filePath = cordova.file.tempDirectory;
					} else if (device.platform == "Android") {
						this.appType = 1
						this.filePath = cordova.file.externalDataDirectory;
					}
				}
				let _this = this
				const serverVersion = AppVersion.version

				console.log('app版本为：'+serverVersion);
				
				// const serverVersion = '1.0.2'
				const params = {
					appType: this.appType,
					serverVersion
				}
				let res = await this.$http.get('/mobile/setup/getUpdateApp',{params})
				console.log('获取更新数据');
				console.log(res);
				this.appDownloadUrl = res.data.obj.updateUrl
				this.newVersion = res.data.obj.serverVersion
				this.whatIsNew = res.data.obj.upgradeInfo
				this.forceUpdate = parseInt(res.data.obj.lastForce)
				let currentVersion = parseInt(serverVersion.split('.').join(''))
				let updateVersion = parseInt(this.newVersion.split('.').join(''))
				if(currentVersion<updateVersion){
					this.$toast.info('有新版本可下载安装')
					// this.$store.commit('CLEAR_STATE')
					// this.$store.commit('CLEAR_ALL_MEMBER_STATE')
				}
				//重启应用前不再提示
				const appUpdate = sessionStorage.getItem('showUpdate')
				if(res && !appUpdate){
					sessionStorage.setItem('showUpdate',true)
					//开关提示面板
					this.showDia = !!this.appDownloadUrl
					//ios
					if(this.appType===2){
						
						return
					}
					//android
					if(this.forceUpdate){
						this.createFile()
					}
				}
			},
			createFile(){
				let _this = this
				window.resolveLocalFileSystemURL(
					_this.filePath,
					function(fs) {
						fs.getFile(
							 _this.fileName, // 创建的文件名
							{ create: true, exclusive: true },
							// create：创建新文件，exclusive:文件已存在时抛出异常
							function(fileEntry) {
								// 创建成功回调下载方法写入文件
								_this.downloadFile(fileEntry);
							},
							function(err) {
								// 失败回调
								// 重新读取文件并打开
								fs.getFile(
									_this.fileName,
									{ create: false },
									function(fileEntry) {
										// 成功读取文件后调用cordova-plugin-file-opener2插件打开文件
										_this.preview(fileEntry);
									},
									function(err) {
										console.log(err);
										
										_this.$toast('读取文件失败');
									}
								);
							}
						);
					},
					function(error) {
						_this.$toast('进入文件系统失败！');
					}
				);      
			},
			downloadFile(fileEntry) {
				let _this = this
				// 初始化进度条并显示
				// 此处采用mint-ui的Progress组件
				this.progress = 0;
				this.showProgress = true;
				//实例化
				this.fileTransfer = new FileTransfer();
				//监听下载进度
				this.fileTransfer.onprogress = function(e) {
					if (e.lengthComputable) {
						let progress = e.loaded / e.total;
						// 显示下载进度
						_this.progress = (progress * 100).toFixed(2);
					}
				};
				// 使用fileTransfer.download开始下载
				this.fileTransfer.download(
					encodeURI(_this.appDownloadUrl), //uri网络下载路径
					fileEntry.toURL(), //文件本地存储路径
					function(entry) {
						// 下载完成执行本地预览
						if (_this.progress > 1 || _this.progress === 1) {
							_this.showProgress = false;
							entry.file(data => {
								console.warn('看看data-type',data);
								//存到storage,下次打开app因为已经下载过了所以不会进入这一步
								_this.$store.commit('SET_SINGLE_STATE', ['dataType', data.type])
								_this.preview(fileEntry);
								// 此处data.type可以直接得到文件的MIME-TYPE类型
							});
						}
					},
					function(error) {
						_this.$toast('下载失败！');
					}
				);
			},
			preview(fileEntry){
					// console.warn(fileEntry);
					console.warn('安装啊');
					let _this = this
					this.showDia = false
					// 调用cordova-plugin-file-opener2插件实现用第三方app打开文件
					cordova.plugins.fileOpener2.open(
						// 此处必须填写cdvfile://地址，不然android7.0+会报文件权限错误
						fileEntry.toInternalURL(), //文件本地地址转cdvfile://地址
						_this.dataType, //文件类型，这里我是写了一个mime-Type类型合集fileTypeArr来调用 
						{
							error: function(e) {
								console.error('打开失败',e);
							},
							success: function(){
								console.warn('打开成功');
							}
						}
					);
			},  
			toAppStore(){
				this.inApp = cordova.InAppBrowser.open(this.appDownloadUrl,'_blank','location=no')
			},
			toShopMall(){
				// let url = 'http://192.168.1.101:8080/mall/pages/index.html#/index?sessionId='+this.sessionId
				let url = 'http://mall.yinaf.com/pages/index.html#/index?sessionId='+this.sessionId
				// location.href = url
				this.inApp = cordova.InAppBrowser.open(url,'_blank','location=no')
				this.inApp.addEventListener('exit',this.exitIAB)
				this.inApp.addEventListener('loadstop',()=>{
					StatusBar.backgroundColorByHexString("#e3393c");
				})
				this.inApp.addEventListener('message',this.messageEvent)
			},
			exitIAB(){
				StatusBar.backgroundColorByHexString("#00aaef")
			},    
			messageEvent(msg){
				console.warn('message事件监听，参数：',msg);
				if(msg.data.backToApp){//商城首页左上角返回按钮
					this.inApp.close()
					StatusBar.backgroundColorByHexString("#00aaef")
					this.tab = 0
				}
				//检查微信是否安装
				if(msg.data.wxInstalled){
					Wechat.isInstalled(
						res=>{
							if(res){//已安装
								this.inApp.executeScript({code: `
								sessionStorage.setItem('wxInstalled',true)
								`})
							}else{
								this.inApp.executeScript({code: `
									sessionStorage.setItem('wxInstalled',false)
								`})
							}
						},
						err=>{
							console.error("Failed: " + err)
						}
					)                
				}
				//从inappbrowser获取支付方式和参数
				if(msg.data.payway){
					let e = msg.data.payway
					let params = msg.data.obj
					if(e==1){//微信支付
						Wechat.sendPaymentRequest(params,
							e => {
								this.inApp.executeScript({code: `
									sessionStorage.setItem('paySucceed',true)
								`})
							},
							er => {
								this.inApp.executeScript({code: `
									sessionStorage.setItem('paySucceed',false)
								`})
							}
						)
					}else{//支付宝
						cordova.plugins.alipay.payment(
							params,
							e => {
								this.inApp.executeScript({code: `
									sessionStorage.setItem('paySucceed',true)
								`})
							},				
							err => {
								console.error("Failed:" + err.memo)
								this.inApp.executeScript({code: `
									sessionStorage.setItem('paySucceed',false)
								`})
							}
						)
					}
				}
			},    
			getMsg(){
				const params = {
					sessionId: this.sessionId,
					userId: this.userId,
					token: this.token,
				}
				this.$http.get('/mobile/bite/getMessageCenter',{params})
				.then(res=>{
					if(res.data.success){
						this.msgCount = 0
						let rows = res.data.obj
						if(rows.length){

							rows.forEach(res=>{
								if(!res.mess.state){
									this.msgCount++
								}
							})
						}
					}
				})
			},
			// select(e){
			//   this.city = e
			//   this.showCityPicker = false
			// },
			findNewsPage(i){
				// if(window.db){
				//   this.$createTable('ynf_newsList',newslist_keys)
				// }
				const params = {
					sessionId: this.sessionId,
					rows: this.rows,
					page: this.page
				}
				this.$http.get('/mobile/index/findNewsPage',{params})
				.then(res=>{
					if(res.data.success){
						console.log(res.data)
						this.allLoaded = res.data.pager.currentPage === res.data.pager.totalPages
						let headLines =  i?this.headLines.concat(res.data.rows):res.data.rows
						this.$store.commit('SET_SINGLE_STATE',['headLines', headLines])
						
						// if(window.db){
						//   if(this.headLines.length){
						//     this.$rmSqlite('ynf_newsList')
						//     this.$addSqlite('ynf_newsList',this.headLines)
						//   }
						// }          
					}
					// else{
					//   if(window.db){
					//     // this.headLines = this.$getSqlite('ynf_newsList',newslist_keys)
					//   }
					// }
				})
				.catch(err=>{
					if(window.db){
						// this.headLines = this.$getSqlite('ynf_newsList',newslist_keys)
					}        
				})
			},
			getPosition(){
				let that = this
				navigator.geolocation.getCurrentPosition(
					function(pos){
						console.log('cordova插件定位success')
						const lat = parseFloat(pos.coords.latitude)
						const lon = parseFloat(pos.coords.longitude)
						console.log(pos);
						console.log(lon,lat);
						that.center = [lon,lat]
					},
					function(err){
						console.log(
							`code:  ${err}.code
							 message: ${err}.message)`
						)
					},
					{
						timeout: 5000,
						enableHighAccuracy: true
					}
				)
			},
			loadMore(){
				this.page++
				this.findNewsPage(6)
			},
			// getCity(){
			//   let that = this
			//   let geocoder = new AMap.Geocoder({
			//     radius: 1000,
			//     extensions: "all"
			//   });    
			//   geocoder.getAddress([this.longitude ,this.latitude], function(status, result) {
			//     if (status === 'complete' && result.info === 'OK') {
			//       if (result && result.regeocode) {
			//         console.log(result);
			//       }
			//     }
			//   })  
			// },
			getStep(){
				this.$http.get('/mobile/healthy/getStepToDay',{params: this.params})
				.then(res=>{
					if(res.data.success){
						this.steps = res.data.obj.step
					}
				})
			},
			getSleep(){
				this.$http.get('/mobile/healthy/getSleepToDay',{params: this.params})
				.then(res=>{
					if(res.data.success){
						this.sleep = res.data.obj.duration
					}
				})
			},
			getHr(){
				this.$http.get('/mobile/healthy/getCurrentHeartRate',{params: this.params})
				.then(res=>{
					if(res.data.success){
						this.heartRate = res.data.obj.bpm
					}
				})
			},
			getIndex(){
				// if(window.db){
				//   this.$createTable('ynf_appList',applist_keys)
				//   this.$createTable('ynf_bannerList',bannerlist_keys)
				// }
				this.$http.get('/mobile/index/getIndex',{params: {sessionId: this.sessionId}})
				.then(res=>{
					if(res.data.success){
						// this.appList = res.data.obj.applicationList
						this.$store.commit('SET_SINGLE_STATE',['appList', res.data.obj.applicationList])
						this.$store.commit('SET_SINGLE_STATE',['bannerList', res.data.obj.bannerList])
						// if( window.db){
						//   if(this.appList.length){
						//     this.$rmSqlite('ynf_appList')
						//     this.$addSqlite('ynf_appList',this.appList)
						//   }
						//   if(this.bannerList){
						//     this.$rmSqlite('ynf_bannerList')
						//     this.$addSqlite('ynf_bannerList',this.bannerList)
						//   }
						// }
					}
					// else{
					//   if(window.db){
					//     let appList = this.$getSqlite('ynf_appList',applist_keys)
					//     let bannerList = this.$getSqlite('ynf_bannerList',bannerlist_keys)
					//     // this.$store.commit('SET_SINGLE_STATE',['appList', appList])
					//     // this.$store.commit('SET_SINGLE_STATE',['bannerList', bannerList])
								
					//   }
					// }
				})
				// .catch(err=>{
				//   console.log('err');
				//   if(window.db){
				//     let appList = this.$getSqlite('ynf_appList',applist_keys)
				//     let bannerList = this.$getSqlite('ynf_bannerList',bannerlist_keys)
				//     this.$store.commit('SET_SINGLE_STATE',['appList', appList])
				//     this.$store.commit('SET_SINGLE_STATE',['bannerList', bannerList])        }
				// })
			},
			getNewsDetail(id){
				this.newsId = parseInt(id)
				this.showNewsDetail = true
				// this.$router.push({
				// 	path: '/newsDetail',
				// 	query: {id}
				// })
			},
			locationTo(e,title){
				if(title=='美亚健康'){
					console.info('mini mini')
					this.$router.push('/meiya')
					return
				}
				if(!e){
					return
				}
				// location.href = e
				let inApp
				if (cordova.platformId == 'android') {
					
					inApp = cordova.InAppBrowser.open(e,'_blank','location=no')
				}
				if (cordova.platformId == 'ios') {
					
					inApp = cordova.InAppBrowser.open(e,'_blank','location=no,toolbar=yes,closebuttoncolor=#ffffff,closebuttoncaption=返回,navigationbuttoncolor=#ffffff,hidespinner=yes')
				}      

				inApp.addEventListener('exit',this.exitIAB)
			},
			getMemberList(){  
				if(this.memberId){
					return
				}    
				let strArr = ['realName','image','isLead','watchId','memberNum','watchPhone','rela','memberId']
				// if(window.db){
				//   this.$createTable('ynf_memberList',strArr)
				// }         
				this.$http.get('/mobile/user/getMemberList',{params: {sessionId: this.sessionId}})
				.then(res=>{
					if(res.data.success){//默认第一人为本人
						let memberId = res.data.obj[0].memberId  
						let watchId = res.data.obj[0].watchId  
						console.log('??????我');
						
						this.$store.commit('SET_SINGLE_MEMBER_STATE', ['memberList', res.data.obj])
						this.$store.commit('SET_SINGLE_MEMBER_STATE', ['memberId', memberId])
						this.$store.commit('SET_SINGLE_MEMBER_STATE', ['watchId', watchId])
						// if(window.db){
						//   this.$rmSqlite('ynf_memberList')
						//   this.$addSqlite('ynf_memberList',res.data.obj)
						// } 
					}
					// else{
					//   if(window.db){

					//     let members = this.$getSqlite('ynf_memberList',strArr)
					//     this.$store.commit('SET_SINGLE_MEMBER_STATE',['memberList', members])
					//   } 
					// }
				})
				// .catch(err=>{
				//   if(window.db){
				//     if(window.db){

				//       let members = this.$getSqlite('ynf_memberList',strArr)
				//       this.$store.commit('SET_SINGLE_MEMBER_STATE',['memberList', members])
				//     } 
				//   }             
				// })
			},
			getHouse(){
				const params = {
					sessionId: this.sessionId,
					userId: this.userId,
				}
				this.$http.get('/owner/getHouse',{params})
				.then(res=>{
					if(res.data.success){
						this.$store.commit('SET_SINGLE_STATE',['houseList', res.data.obj])
						this.$store.commit('SET_EACH_STATE',res.data.obj[0])
					}
				})
			},    
		}
	}
</script>

<style>

</style>
