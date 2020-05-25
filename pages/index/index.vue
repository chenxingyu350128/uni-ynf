<template>
	<view ref="indexPage" class="indexPage grey lighten-3 white--text pb-12">  
    <view style="width: 100%;z-index: 6;" :style="{'position': eazyMode?'fixed':'relative'}" class="primary pa-2 white--text subtitle-2">
			<uni-row class="top-line d-flex justify-space-between align-start">
				<uni-col col="30" class="d-flex align-center ">
					<text>{{city}}</text>
					<uni-icons class="white--text" type="mdi-chevron-down"></uni-icons>
				</uni-col>
				<uni-col col="40" class="d-flex align-center justify-center flex-fill">
					<uni-avatar class="d-flex align-center justify-center" v-if="!eazyMode" background-color="#ccc" size="75">
						<uni-icons color="#fff" :size="watchId?45:75" :type="watchId?'mdi-watch':'mdi-plus-circle'"></uni-icons>
					</uni-avatar>
					<text v-else class="subtitle-1">颐纳福</text>
				</uni-col>
				<uni-col col="30" class="d-flex justify-end">
					<uni-icons class="white--text" type="mdi-email-outline"></uni-icons>
					<uni-badge class="uni-badge overline" :text="msgCount?msgCount:''" type="error"></uni-badge>
				</uni-col>
			</uni-row>
			<uni-transition mode-class="slide-top" :show="!eazyMode">
				
				<uni-row
					v-if="!eazyMode"
					class="text-center caption pb-4 flex-wrap"
				>
					<uni-col
						class="subtitle-2 mb-5 mt-4"
						col="100"
					>
						{{ watchId?'已绑定智能腕表':'请添加您的腕表' }}
					</uni-col>
					<uni-col class="d-flex flex-column align-center" col="33">
						<text>步数</text>
						<text v-if="watchId">
							{{ steps }}步
						</text>
						<text v-else>
							_ _
						</text>
					</uni-col>
					<uni-col class="d-flex flex-column align-center" col="33">
						<text>睡眠时长</text>
						<text v-if="watchId">
							{{ sleep }}小时
						</text>
						<text v-else>
							_ _
						</text>
					</uni-col>
					<uni-col class="d-flex flex-column align-center" col="33">
						<text>心率</text>
						<text v-if="watchId">
							{{ heartRate }}bpm
						</text>
						<text v-else>
							_ _
						</text>
					</uni-col>
				</uni-row>
			</uni-transition>
<!-- 			<transition name="expand">
				
			</transition> -->
		</view>
		<!-- 导购 -->
		<view v-if="!watchId" class="my-1">
			<view class="grey lighten-2 px-3 py-2">
				<view class="white black--text px-2 d-flex align-center br4">
					<uni-icons color="orange" type="mdi-information-outline"></uni-icons>
					<text class="caption font-weight-bold ml-2 flex-fill">健康第一步</text>
					<text class="overline text--secondary mr-2">买个智能腕表</text>
					<button class="px-2 py-1 overline" size="mini" type="warn">详情</button>
				</view>
			</view>
		</view>
		<!-- 轮播 -->
		<swiper class="my-1" style="height: 33.33vw;" :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in bannerList" :key="i">
				<image style="width: 750rpx;" :src="item.banner_pic" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<!-- tabbar-nav -->
		<uni-row @scroll="eazyMode=!eazyMode" class="scrollAnchor pink black--text py-2 my-1" justify="space-around">
			<uni-col v-for="(item,i) in appList" :key="i" col="25" class="d-flex flex-column align-center">
				<image style="width: 38px; height: 38px;" :src="item.app_pic" mode="aspectFit"></image>
				<text class="mt-2 caption">{{item.app_title}}</text>
			</uni-col>
		</uni-row>
		<view class="light-blue pa-2 d-flex black--text align-center my-1 b1px">
			<uni-icons color="orange" type="mdi-square-edit-outline"></uni-icons>
			<text class="subtitle-2 ml-2 font-weight-bold">健康头条</text>
		</view>
		<!-- news list -->
		<view 
			v-for="(item,i) in headLines" 
			:key="i"
			class="white text--secondary d-flex pa-4 align-start my-1"
		>	
			<uni-avatar tile size="60">
				
				<image :src="item.newPic" mode="aspectFill"></image>
			</uni-avatar>
			<text class="flex-fill ml-4 body-2">{{item.newTitle}}</text>
		</view>
			
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
		watch:{
			'exitAppEnv':{
				handler(newVal){
					if(newVal){
						//监听返回按钮
						document.addEventListener('backbutton',this.runBack,false)
						document.removeEventListener('backbutton',this.backBtn,false)
	
					}else{
						document.removeEventListener('backbutton',this.runBack,false)
						document.addEventListener('backbutton',this.backBtn,false)
						this.exitState = 0
					}
				},
				immediate: true
			},
			watchId: {
				handler(val){
					if(val){
	
						this.getStep()
						this.getSleep()
						this.getHr()
					}
				},
				immediate: true
			}
		},
		onload(){
			console.log('onload')
		},
		onPageScroll(e) {
			alert(JSON.stringify(e))
			console.log(e)
			console.log('FFF')
		},
		onReachBottom(){
			uni.pageScrollTo({
				scrollTop: 300
			})
			console.log('asdasf')
		},
		onUnload() {
			window.clearTimeout(this.exitTimeout);
			document.removeEventListener('backbutton',this.runBack,false)
			document.removeEventListener('backbutton',this.backBtn,false)
			
		},
		onShow() {
			if(!this.sessionId){
				uni.redirectTo({
					url:'../login/login'
				})
				return
			}
			console.log(this.$refs.indexPage)
			const page = this.$refs.indexPage
			//获取位置
			this.getPosition()
			//检测更新
			// this.checkNewVersion()
			this.init()
			//防抖
			this.loadbottom = this._.debounce(this.loadMore, 200)
			
		},
		onReady() {
			console.log(this.$el)
			let that = this
			this.$el.addEventListener('scroll', function(e){
				console.log(e.target.scrollTop)
				that.eazyMode = !!e.target.scrollTop
			}, true)
			
		},
		methods: {
			commit(x,y){
				this.$store.commit(x, y)
			},
			pageScroll(e){
				
			},
			init(){
				this.getIndex()
				this.getMemberList()
				this.getHouse()
				this.getMsg()
				this.findNewsPage()
				// console.info(this.$store.state.app)
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
				let res = await this.$http.get('/mobile/setup/getUpdateApp', params)
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
				this.$http.get('/mobile/bite/getMessageCenter',params)
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
				this.$http.get('/mobile/index/findNewsPage',params)
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
				this.$http.get('/mobile/healthy/getStepToDay', this.params)
				.then(res=>{
					if(res.data.success){
						this.steps = res.data.obj.step
					}
				})
			},
			getSleep(){
				this.$http.get('/mobile/healthy/getSleepToDay', this.params)
				.then(res=>{
					if(res.data.success){
						this.sleep = res.data.obj.duration
					}
				})
			},
			getHr(){
				this.$http.get('/mobile/healthy/getCurrentHeartRate', this.params)
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
				this.$http.get('/mobile/index/getIndex',{sessionId: this.sessionId})
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
				this.$http.get('/mobile/user/getMemberList',{sessionId: this.sessionId})
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
				this.$http.get('/owner/getHouse',params)
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

<style lang="scss" scoped>
	.indexPage{
		height: 100vh;
		overflow-y: auto;
		.br4{
			border-radius: 4px;
		}
		.b1px{
			border: 5px solid rgba(0,0,0,1.0);
		}
		.expand-enter-active{
			transition: all .5s cubic-bezier(0.25, 0.8, 0.5, 1);
		}
		.expand-leave-active{
			transition: all .5s cubic-bezier(0.25, 0.8, 0.5, 1);
		}
		.expand-enter
		.expand-leave-to{
			transition: transform .3s;;
		}
	}
</style>

