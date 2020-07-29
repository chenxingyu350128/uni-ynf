<template>
	<view class="page d-flex flex-column align-center">
    <u-navbar title-color="#fff" back-icon-color="#fff" back-icon-name="arrow-left" title="实时数据" :background="background"></u-navbar>
		<u-tabs-swiper 
      ref="tabs"
      class="full-width"
      :is-scroll="false" 
      swiperWidth="750"
      :list="tabList" 
      :current="current" 
      @change="typeChange"
      :show-bar="false"
      active-color="#fff"
      inactive-color="#fafafa"
      :bg-color="tabBG"
    >
    </u-tabs-swiper>
    <swiper class="full-width flex-fill" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
      <swiper-item class="fill-height d-flex flex-column" v-for="x in 5" :key="x">
        <view class="full-width pa-4">
          <!-- 圆环块 -->
          <view class="posRela">
            <view :style="{color: tabBG}" class="shadowCircle ma-auto white d-flex posRela">
              <!-- 运动 -->
              <view  v-if="current === 0" class="fill-height full-width py-4 d-flex flex-column align-center justify-space-around">
                <text class="grey--text">今日步数</text>
                <text class="headline">{{step}}步</text>
                <view @click="totalData" class="black--text pl-1">
                  全部数据
                  <u-icon class="ml-2" name="arrow-right"></u-icon>
                </view>
              </view>
              <!-- 睡眠 -->
              <view  v-if="current === 1" class="fill-height full-width py-4 d-flex flex-column align-center justify-space-around">
                <text class="grey--text">睡眠时长</text>
                <text class="headline">{{duration}}H</text>
                <view @click="totalData" class="black--text pl-1">
                  全部数据
                  <u-icon class="ml-2" name="arrow-right"></u-icon>
                </view>
              </view>
              <!-- 心率 -->
              <view  v-if="current === 2" class="fill-height posRela full-width py-4 d-flex flex-column align-center justify-space-around">
                <text 
                  v-if="today===dateStr && deviceTime" 
                  class="grey--text caption posAbs t0 mt-6 nowrap"
                >{{deviceTime}}</text>
                <text class="headline">
                  {{bpm}}
                  <text class="caption">bpm</text>
                </text>
              </view>
              <!-- 血压 -->
              <view  v-if="current === 3" class="fill-height full-width py-8 d-flex flex-column align-center justify-space-around">
                <text class="title">
                  高压:{{sbp}}
                  <text class="caption">mmHg</text>
                </text>
                <text class="title">
                  低压:{{dbp}}
                  <text class="caption">mmHg</text>
                </text>
              </view>
              <!-- 血糖 -->
              <view  v-if="current === 4" class="fill-height full-width py-4 d-flex flex-column align-center justify-space-around">
                <text class="headline">
                  {{gi}}
                  <text class="caption">mmol/L</text>
                </text>
              </view>
              
              <!-- 底部按钮 -->
              <view class="d-inline-flex flex-column align-center posAbs b0 bottomCenter">
                <view @click="showDatePicker=true" :style="{background: tabBG}" class="circleBtn white--text">{{dateStr}}</view>
              </view>
            </view>
            <!-- 右上角功能 -->
            <view class="d-inline-flex flex-column align-center posAbs r0 t0">
              <u-button v-if="current<2" open-type="share" :custom-style="shareBtn" type="primary">
                <u-icon color="grey" size="45" name="launch" customPrefix="mdi"></u-icon>
              </u-button>
              <u-icon v-else @click="upperBtn" color="#bfbfbf" size="65" name="info-filled" customPrefix="mdi"></u-icon>
              <u-icon @click="bottomBtn" color="#bfbfbf" size="65" name="cog-box" customPrefix="mdi"></u-icon>
            </view>
          </view>

        </view>
        <!-- 数据概要 -->
        <view class="col-9 mx-auto">
          <u-grid class="transparent" :border="false" v-if="current === 0" col="3">
            <u-grid-item class="transparent">
              <view class="d-flex flex-column align-center">
                <text :style="{color: tabBG}" class="mb-2">千卡</text>
                {{calorie}}
              </view>
            </u-grid-item>
            <u-grid-item>
              <view class="d-flex flex-column align-center">
                <text :style="{color: tabBG}" class="mb-2">公里</text>
                {{distance}}
              </view>
            </u-grid-item>
            <u-grid-item>
              <view class="d-flex flex-column align-center">
                <text :style="{color: tabBG}" class="mb-2">分钟</text>
                {{minute}}
              </view>
            </u-grid-item>
          </u-grid>
          <u-grid :border="false" v-else-if="current === 1" col="2">
            <u-grid-item>
              <view class="d-flex flex-column align-center">
                <text :style="{color: tabBG}" class="mb-2">深睡眠</text>
                {{heartDuration}}
              </view>
            </u-grid-item>
            <u-grid-item>
              <view class="d-flex flex-column align-center">
                <text :style="{color: tabBG}" class="mb-2">浅睡眠</text>
                {{quietDuration}}
              </view>
            </u-grid-item>
          </u-grid>
          <u-grid :border="false" v-else col="3">
            <u-grid-item>
              <view class="d-flex flex-column align-center">
                <text :style="{color: tabBG}" class="mb-2">异常</text>
                {{current===2?count:alert}}
              </view>
            </u-grid-item>
            <u-grid-item>
              <view class="d-flex flex-column align-center">
                <text :style="{color: tabBG}" class="mb-2">最高值</text>
                <text v-if="current === 2">{{min}}</text>
                <text v-else-if="current === 3">{{maxDbp}}</text>
                <text v-else>{{maxGi}}</text>                
              </view>
            </u-grid-item>
            <u-grid-item>
              <view class="d-flex flex-column align-center">
                <text :style="{color: tabBG}" class="mb-2">最低值</text>
                <text v-if="current === 2">{{max}}</text>
                <text v-else-if="current === 3">{{maxSbp}}</text>
                <text v-else>{{minGi}}</text>
              </view>
            </u-grid-item>
          </u-grid>
        </view>
        <!-- 中间按钮 -->
        <view class="col-7 mx-auto caption nowrap">
          <view 
            v-if="current===0"
            class="d-flex justify-center"
          >
            <view @click="toStepAim" class="shapeRoundBtn px-2 caption d-flex align-center justify-center white--text" :style="{background: tabBG}">
              <u-icon name="bullseye-arrow" customPrefix="mdi"></u-icon>
              <text>设定目标</text>
            </view>
            <view @click="toStepRank" class="shapeRoundBtn px-2 caption d-flex align-center justify-center white--text" :style="{background: tabBG}">
              <u-icon name="podium" customPrefix="mdi"></u-icon>
              <text>排行榜</text>
            </view>
          </view>
          <view 
            v-if="current>1"
            class="d-flex justify-center"
          >
            <view @click="measure" class="shapeRoundBtn px-2 caption d-flex align-center justify-center white--text" :style="{background: tabBG}">
              <u-icon name="bullseye-arrow" customPrefix="mdi"></u-icon>
              <text class="caption">{{current>2?'去测量':'远程测量'}}</text>
            </view>
            <view @click="totalData" class="shapeRoundBtn px-2 caption d-flex align-center justify-center white--text" :style="{background: tabBG}">
              <u-icon name="podium" customPrefix="mdi"></u-icon>
              <text>全部数据</text>
            </view>
          </view>
        </view>
        
        <!-- 时间段选择 -->
        <view class="col-9 mx-auto d-flex fixBorder my-2" :style="{background: tabBG}">
          <view @click="timeScopeChange(0)" :style="{ color: tab===0?'#fff':tabBG, background: tab===0?tabBG:'#fff' }" class="flex-fill tabBtn text-center">本日</view>
          <view @click="timeScopeChange(1)" :style="{ color: tab===1?'#fff':tabBG, background: tab===1?tabBG:'#fff' }" class="flex-fill tabBtn text-center">本周</view>
          <view @click="timeScopeChange(2)" :style="{ color: tab===2?'#fff':tabBG, background: tab===2?tabBG:'#fff' }" class="flex-fill tabBtn text-center">本月</view>
        </view>
        <!-- 图表之上 -->
        <view class="col-9 mx-auto d-flex justify-space-between caption">
          <view>
            <text v-if="current === 0">每日目标: {{stepAim}}</text>
            <text v-if="current === 1">睡眠质量: {{sleepQuality}}</text>
            <text v-if="current === 2">正常心率{{ hrMin }}-{{ hrMax }}/分钟</text>
            <text v-if="current === 3">收缩压: {{ sbpMin }}-{{ sbpMax }} 舒张压: {{ dbpMin }}-{{ dbpMax }}</text>
            <text v-if="current === 4">血糖范围{{ gluMin }}-{{ gluMax }}mmol/L</text>
          </view>
          <view v-if="current!==1 && current!==3" class="d-flex align-center">
            <u-icon name="git-commit-line" size="35" customPrefix="mdi"></u-icon>
            <text>{{typeTitles[current]}}</text>
          </view>
          <view v-if="current===1" class="overline d-flex align-center">
            <view class="dot blue"></view>
            深睡眠
            <view class="dot green ml-2"></view>
            浅睡眠
          </view>
          <view v-if="current===3" class="overline d-flex align-center">
            <view class="dot blue"></view>
            收缩压
            <view class="dot green ml-2"></view>
            舒张压
          </view>
        </view>
        <view class="lowZIndex flex1" :class="'canvasShell'+x">
          <canvas @touchstart= "seeDetails" :canvas-id="'canvasColumn'+x" :id="'canvasColumn'+x" :style="{width: cWidth*pixelRatio + 'px', height: cHeight*pixelRatio + 'px', 'margin-left': showDatePicker? '100vw' : '0'}" class="fill-height full-width lowZIndex"></canvas>
        </view>
      </swiper-item>
    
    </swiper>

    <u-picker class="datePicker" @confirm="dataChange" :default-time="dateStr + ' 13:00'" mode="time" v-model="showDatePicker"/>
    <!-- <u-calendar @change="dataChange" v-model="showDatePicker" mode='date'></u-calendar> -->
	</view>
</template>

<script>
  import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js'
  let _this
  let canvaColumn = null
	export default {
		data() {
			return {
        shareBtn: {
          // display: 'inline-flex',
          width: '60rpx',
          height: '60rpx',
          padding: '6px',
          background: 'transparent'
        },
        tabList: [
          {
            name: '运动'
          },
          {
            name: '睡眠'
          },
          {
            name: '心率'
          },
          {
            name: '血压'
          },
          {
            name: '血糖'
          }
        ],
        typeTitles: ['步数', '睡眠', '心率', '血压', '血糖'],
				current: 0,
				swiperCurrent: 0,
        datePickerValue: '',
        monthPickerValue: '',
        showDatePicker: false,
        // 今日数据
        step: 0,
        bpm: 0, // 当前心率
        duration: 0, // 睡眠时常
        deviceTime: '',
        count: 0,
        alert: 0,
        gi: 0, // 当前血糖
        sbp: 0,
        dbp: 100,
        // 概要数据
          // 运动
        calorie: 0,
        distance: 0,
        minute: 0,
          // 睡眠
        heartDuration: 0,
        quietDuration: 0,
        // 心率/血压/血糖
        alert: 0, // 异常
        maxGi: 0,
        minGi: 0,
        maxDbp: 0,
        maxSbp: 0,
        max: 0,
        min: 0,
        tab: 0,
        // 步数目标
        stepAim: 5000,
        // uChart参数
        cWidth:'',
        cHeight:'',
        pixelRatio:1,
        serverData:'',
        chartCategories: [],
        // 正常范围
        dbpMax: '',
        dbpMin: '',
        sbpMin: '',
        sbpMax: '',
        hrMin: '',
        hrMax: '',
        gluMin: '',
        gluMax: ''
			};
		},
    computed: {
      memberId(){
        return this.$store.state.member.memberId
      },
      sessionId(){
        return this.$store.state.app.sessionId
      }, 
      tabBG () {
        const colors = ['#00aaef', '#c7a7dc', '#fd7b7b', '#fa6e31', '#f1ce7e']
        return colors[this.current]
      },
      sleepQuality(){
        if(this.duration>8){
          return '优'
        } else if(this.duration>=6&&this.duration<=7){
          return '良好'
        } else {
          return '一般'
        }
      }, 
      background () {
        return {
          backgroundColor: this.tabBG
        }
      },
      dateStr () {
        return this.datePickerValue || this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
      },
      today () {
        return this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
      },
      monthStr () {
        return this.monthPickerValue || this.$u.timeFormat(new Date(), 'yyyy-mm')
      }
    },
    onLoad(e) {
      if (e.type) {
        this.current = e.type
      }
      _this = this
      // this.cWidth=uni.upx2px(750);
      // uni.getSystemInfo({
      //   success: function (res) {
      //     if(res.pixelRatio > 1){
      //       //正常这里给2就行，如果pixelRatio=3性能会降低一点
      //       //_self.pixelRatio =res.pixelRatio;
      //       _this.pixelRatio = 2;
      //     }
      //   }
      // });
    },
    onShow() {
      this.getRange()
      this.getStepAim()
      this.getData()
    },
    onShareAppMessage(e) {
      console.log(e)
      return {
        title: '健康数据分享',
        path: '/pages/family/deviceDate?type=' + this.current
      }
    },
    methods: {
      measure () {
        if (this.current > 2) {
          uni.navigateTo({
            url: `./addMeasureData?type=${this.current}&BG=${this.tabBG}&date=${this.dateStr}`
          })
        } else {
          this.$u.toast('小程序功能未开放，可前往app使用该功能')
        }
      },
      upperBtn () {
        if (this.current > 1) {
          uni.navigateTo({
            url: `./remindResult?type=${this.current - 2}&navBG=${this.tabBG}`
          })
        } else {
          uni.showShareMenu({
            success: res => {
              console.log(res)
            }
          })
        }
      },
      bottomBtn () {
        const urls = [
          './sportSetting',
          './sleepSetting',
          './HrSetting',
          './BpSetting',
          './BsSetting',
        ]
        uni.navigateTo({
          url: urls[this.current]
        })
      },
      getRange () {
        const data = {
          memberId: this.memberId,
          sessionId: this.sessionId
        }
        this.$http.get('/mobile/healthy/getHealthyRange', data)
          .then(res=>{
            if(res.data.success){
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
            }
          })        
      },
      getStepAim () {
        let data ={
          memberId: this.memberId,
          sessionId: this.sessionId
        } 
        this.$http.post('mobile/healthy/getGoalStep', data) 
          .then(res => {
            if (res.data.success) {
              // this.stepAim = res.data.obj.goalNum
            }
          })
      },
      toStepAim () {
        uni.navigateTo({
          url: './stepAim?aim='+this.stepAim
        })
      },
      toStepRank () {
        uni.navigateTo({
          url: './stepRank?date=' + this.dateStr
        })
      },
      typeChange (e) {
        console.log(e)
        this.swiperCurrent = e;
        this.tab = 0 // 时间区 初始化为 本日

      },
      timeScopeChange (e) {
        if (e === this.tab) {
          return false
        }
        this.tab = e
        this.getData()
      },
      getData () { // 获取数据
        this.getDataBy() // 根据日/周/月获取chart数据
        if (this.current<2) { // 运动、睡眠今日数据
          this.getDataTo() // 根据日/周/月获取总数据
        } else {
          this.getCurrent() // 获取当天数据
        }
      },
      getDataTo () {
        const data = {
          memberId: this.memberId,
          type: this.tab + 1,
          sessionId: this.sessionId,
          data: this.dateStr
        }
        const urls = [
          '/mobile/healthy/getStepToDay',
          '/mobile/healthy/getSleepToDay'
        ]
        this.$http.get(urls[this.current], data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
            }
          })
      },
      getCurrent () {
        const params = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        if (this.current === 4) {
          params.data = this.dateStr
        }
        const urls = [
          '',
          '', 
          '/mobile/healthy/getCurrentHeartRate',
          '/mobile/healthy/getBloodPressureToDay',
          '/mobile/healthy/getBloodSugarToDay'
        ]
        this.$http.get(urls[this.current], params)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj ){
                this[x] = obj[x]
              }
            }
          })
      },
      totalData () {
        uni.navigateTo({
          url: `./totalData?type=${this.current}&tabBG=${this.tabBG}`
        })
      },
      getDataBy () {
        const data = {
          memberId: this.memberId,
          sessionId: this.sessionId
        }
        if (this.tab === 2) {
          data.month = this.monthStr
        } else {
          data.day = this.dateStr
        }
        
        const urls = [
          [
            '/mobile/healthy/getStepByDay',
            '/mobile/healthy/getStepByWeek',
            '/mobile/healthy/getStepByMonthNew'
          ],
          [
            '/mobile/healthy/getSleepByDay',
            '/mobile/healthy/getSleepByWeek',
            '/mobile/healthy/getSleepByMonthNew'
          ],
          [
            '/mobile/healthy/getHeartRateByDay',
            '/mobile/healthy/getHeartRateByWeek',
            '/mobile/healthy/getHeartRateByMonth'
          ],
          [
            '/mobile/healthy/getBloodPressureByDay',
            '/mobile/healthy/getBloodPressureByWeek',
            '/mobile/healthy/getBloodPressureByMonth',
          ],
          [
            '/mobile/healthy/getBloodSugarByDay',
            '/mobile/healthy/getBloodSugarByWeek',
            '/mobile/healthy/getBloodSugarByMonth'
          ]
        ]
        this.$http.get(urls[this.current][this.tab], data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                if (x !== 'deviceTime') {
                  this[x] = obj[x]
                }
                // if (this.deviceTime.split(' ').length === 2) {
                //   this.deviceTime = this.deviceTime.split(' ')[1]
                // }
              }
              const chartData = this.current > 1 ? obj.data : obj
              let chart0 = []
              let chart1 = []
              let labels = []
              let series = []
              if (this.current === 0) { // 运动
                const strs = ['hour', 'day', 'day']
                chartData.forEach(rs => {
                  chart0.push(rs.step)
                  let _labels = rs[strs[this.tab]]
                  if (this.tab === 1) {
                    let arr = _labels.split('-')
                    arr.shift()
                    _labels = arr.join('-')
                  }
                  
                  labels.push(_labels)                  
                })
                series.push({
                  'name': '运动步数',
                  'data': chart0
                })
              }
              if (this.current === 1) { // 睡眠
                const strs = ['hour', 'day', 'day']
                chartData.forEach(rs => {
                  chart0.push(rs.heartDuration)
                  chart1.push(rs.quietDuration)
                  let _labels = rs[strs[this.tab]]
                  if (this.tab === 1) {
                    let arr = _labels.split('-')
                    arr.shift()
                    _labels = arr.join('-')
                  }
                  
                  labels.push(_labels)                  
                })
                series.push({
                  name: '深睡眠',
                  data: chart0
                })
                series.push({
                  name: '浅睡眠',
                  data: chart1
                })
              }
              if (this.current === 2) { // 心率
                const strs = ['hour', 'day', 'day']
                chartData.forEach(rs => {
                  chart0.push(rs.bpm)
                  chart1.push(rs.minBpm)
                  let _labels = rs[strs[this.tab]]
                  if (this.tab === 1) {
                    let arr = _labels.split('-')
                    arr.shift()
                    _labels = arr.join('-')
                  }
                  
                  labels.push(_labels)                  
                })
                series.push({
                  name: '最高心率',
                  data: chart0
                })
                series.push({
                  name: '最低心率',
                  data: chart1
                })
              }
              if (this.current === 3) { // 血压
                const strs = ['hour', 'day', 'day']
                chartData.forEach(rs => {
                  chart0.push(rs.sbp)
                  chart1.push(rs.dbp)
                  let _labels = rs[strs[this.tab]]
                  if (this.tab === 1) {
                    let arr = _labels.split('-')
                    arr.shift()
                    _labels = arr.join('-')
                  }
                  
                  labels.push(_labels)                  
                })
                series.push({
                  name: '收缩压',
                  data: chart0
                })
                series.push({
                  name: '舒张压',
                  data: chart1
                })
              }
              if (this.current === 4) { // 血糖
                const strs = ['hour', 'day', 'day']
                chartData.forEach(rs => {
                  chart0.push(rs.gi)
                  
                  let _labels = rs[strs[this.tab]]
                  // if (this.tab === 1) {
                  //   let arr = _labels.split('-')
                  //   arr.shift()
                  //   _labels = arr.join('-')
                  // }
                  
                  labels.push(_labels)
                })
                series.push({
                  name: '血糖',
                  data: chart0
                })
              }
              this.$nextTick(() => {
                this.showChart(series, labels)
              }, 100)
            }
          })
      },
      seeDetails (e) {
        const that = this
        const x = canvaColumn.getCurrentDataIndex(e)
        canvaColumn.showToolTip(e, {
            format: function (item, category) {
                console.log(item, category)
                if (!that.tab && item.data) {
                  that.toHourData(x)
                }
                return category + ' ' + item.name + ':' + item.data 
            }
        })
      },
      toHourData (x) {
        const hour = this.current === 1 ? parseInt(this.chartCategories[x].split(':')[0]) : x
        console.log(hour)
        uni.navigateTo({
          url: `./hourData?hour=${hour}&type=${this.current}&time=${this.dateStr}&tabBG=${this.tabBG}`
        })        
      },
      showChart (series, categories) {
        const that = this
        console.log(series, categories)
        this.chartCategories = categories
        const extra = this.current > 1 ? 
        {
          area:{
            type: 'straight'
          }
        } : {
          column:{
            type: this.tab === 2 ? 'meter' : 'group',
            opacity: 0.2,
            width: 28
          }          
        }
        // 获取父元素节点高度
        this.$nextTick(() => {
          
          let warpper = uni.createSelectorQuery().in(this).select('.canvasShell'+this.current)
          warpper.fields(
            {
              size: true,
              scrollOffset: true
            }
          ).exec(e => {
            console.log(e[0])
            const data = e[0]
            if (that.current !== 1) {
              that.cHeight= data.height;
              that.cWidth= data.width;
            }
            canvaColumn = new uCharts({
              $this: that,
              canvasId: 'canvasColumn' + this.current,
              type: that.current > 1 ? 'area' : 'column',
              dataPointShape: that.current < 2,
              legend: {
                show: false,
                position: 'top',
                float: 'left',
                fontSize: 12,
                lineHeight: 6
              },
              fontSize: 12,
              animation: false,
              // colors: [_this.tabBG],
              background:'#FFFFFF',
              pixelRatio: that.pixelRatio,
              width: that.cWidth*that.pixelRatio,
              height: that.cHeight*that.pixelRatio,
              yAxis: {
                disabled: true
              },           
              xAxis: {
                rotateLabel: true
              },
              tooltip: {
                showBox: true
              },
              series: {
                legendShape: 'circle'
              },
              categories,
              series,
              extra
            })
            // data => {
            //   console.log(data)
            //   if (this.current !== 1) {
            //   }  
            // }            
          })
        },100)
        
      },
      
      transition({ detail: { dx } }) {
      	this.$refs.tabs.setDx(dx);
      },
      animationfinish({ detail: { current } }) {
      	this.$refs.tabs.setFinishCurrent(current);
      	this.swiperCurrent = current;
      	this.current = current;
        this.$nextTick(() => {
          this.getData()
        }, 1000)
      },
      dataChange (e) {
        console.log(e)
        this.datePickerValue = e.year +'-' + e.month + '-' + e.day
        this.monthPickerValue = e.year +'-' + e.month
        this.getData()
      }
    }
	}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
}
.shadowCircle{
  width: 306.8rpx;
  height: 306.8rpx;
  border-radius: 50%;
  box-shadow: 0px 7px 40px 5px;
}
.bottomCenter{
  left: 50%;
  transform: translate(-50%, 50%);
}
.circleBtn{
  height: 52.4rpx;
  line-height: 52.4rpx;
  border-radius: 26.2rpx;
  width: 145.8rpx;
  font-size: 20rpx;
  text-align: center;
}
/deep/.u-grid-item{
  background: transparent!important;
}
/deep/.u-grid-item-box{
  padding: 20rpx 0!important;
}
.shapeRoundBtn{
  width: 140rpx;
  height: 49rpx;
  line-height: 49rpx;
  border-radius: 24.5rpx;
}
.shapeRoundBtn + .shapeRoundBtn{
  margin-left: 30rpx;
}
.fixBorder{
  border-collapse: collapse;
  height: 51rpx;
  border-radius: 8rpx;
  line-height: 51rpx;
  padding: 2px;
  .tabBtn{
    border-radius: 4rpx;
  }
  .tabBtn + .tabBtn{
    margin-left: 2px;
  }
}
.lowZIndex{
  z-index: -5;
}
/deep/.datePicker{
  z-index: 999999;
}
.dot{
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
}
.flex1{
  flex: 1;
}
</style>
