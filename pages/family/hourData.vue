<template>
	<view>
    <u-navbar title-color="#fff" back-icon-color="#fff" back-icon-name="arrow-left" title="每小时数据" :background="background"></u-navbar>
    <canvas canvas-id="canvasHourChart" id="canvasHourChart" :style="{width: cWidth*pixelRatio + 'px', height: cHeight*pixelRatio + 'px'}" class="fill-height full-width"></canvas>
    <view class="d-flex full-width pa-4 v-headerTitle align-center" :style="{'background': tabBG}">
      <text
        v-for="(item,i) in th"
        :key="i"
        class="white--text d-flex align-center justify-center flex-fill subtitle-2"
      >{{ item }}</text>
    </view>
    <view
      v-for="(item,i) in obj"
      :key="i"
      :class="i%2?'white':'grey lighten-3'"
      :style="{'background':bgc}"
      class="grey--text text--darken-1 subtitle-2 text-center py-1 d-flex"
    >
      <text class="subtitle-2 text-center py-1" :class="type===1 || type===3 ? 'col-4':'col-6'">{{ item.deviceTime }}</text>
      <text
        v-if="type==0"
        class="subtitle-2 text-center py-1 col-6"
      >{{ item.step }}</text>
      <text
        v-if="type==1"
        class="subtitle-2 text-center py-1 col-4"
      >{{ item.quietDuration }}分钟</text>
      <text
        v-if="type==1"
        class="subtitle-2 text-center py-1 col-4"
      >{{ item.heartDuration }}分钟</text>
      <text
        v-if="type==2"
        class="subtitle-2 text-center py-1 col-6"
      >{{ item.bpm }}/分钟</text>
      <text
        v-if="type==3"
        class="subtitle-2 text-center py-1 col-4"
      >{{ item.sbp }}mmHg</text>
      <text
        v-if="type==3"
        class="subtitle-2 text-center py-1 col-4"
      >{{ item.dbp }}mmHg</text>
      <text
        v-if="type==4"
        class="subtitle-2 text-center py-1 col-6"
      >{{ item.gi }}mmol/L</text>
    </view>
	</view>
</template>

<script>
  import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js'
  let _this
  let hourChart = null
	export default {
		data() {
			return {
				hour: '',
        type: '',
        time: '',
        tabBG: '#00aaef',
        pixelRatio: 1,
        cWidth: '',
        cHeight: '',
        obj: []
			};
		},
    computed: {
      th(){
        switch(parseInt(this.type)){
          case 0:
            return ['时间','步数']
          case 1:    
            return ['时间', '深度睡眠', '浅度睡眠']
          case 2:
            return ['时间','心率']
          case 3:
            return ['时间', '收缩压', '舒张压',]
          case 4:
            return ['时间','血糖']
        }
      },
      background () {
        return {
          backgroundColor: this.tabBG
        }
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      memberId () {
        return this.$store.state.member.memberId
      }
    },
    onLoad(e) {
      _this = this
      this.cWidth=uni.upx2px(750);
      this.cHeight=uni.upx2px(550);
      this.hour = e.hour
      this.type = parseInt(e.type)
      this.time = e.time
      this.tabBG = e.tabBG
      console.log(e)
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        console.log('init init')
        const urls = [
          '/mobile/healthy/getStepByHour',
          '/mobile/healthy/getSleepByHour',
          '/mobile/healthy/getHeartRateByHour',
          '/mobile/healthy/getBloodPressureByHour',
          '/mobile/healthy/getBloodSugarByHour'
        ]
        
        const params = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          time: this.time,
          hour: this.hour
        }
        
       this.$http.get(urls[this.type], params)
          .then(res => {
            if (res.data.success) {
              this.obj = res.data.obj
              const chartData = res.data.obj
              let chart0 = []
              let chart1 = []
              let labels = []
              let series = []
              chartData.forEach(rs => {
                labels.push(rs.deviceTime)

                const str0 = ['step', 'heartDuration', 'bpm', 'sbp', 'gi' ]
                const str1 = ['', 'quietDuration', '', 'dbp', '' ]
                console.log(str0[this.type])
                chart0.push(rs[str0[this.type]])
                if (this.type === 1 || this.type === 3 ) {
                  chart1.push(rs[str1[this.type]])
                }
              })
              
              const title0 = ['步数', '深睡眠', '最高心率', '收缩压', '血糖' ]
              const title1 = ['', '浅睡眠', '最低心率', '舒张压', '' ]
              console.log(title0[this.type])
              series.push({
                name: title0[this.type],
                data: chart0
              })               
              if (this.type === 1 || this.type === 3 ) {
                series.push({
                  name: title1[this.type],
                  data: chart1
                })
              }
              console.log(series)
              this.$nextTick(() => {
                this.showChart(series, labels)
              })
            }
          })        
          console.log('>>><<<')
      },
      showChart (series, categories) {
        console.log(series, categories)
        const extra = this.type > 1 ? 
        {
          area:{
            type: 'straight'
          }
        } : {
          column:{
            opacity: 0.2,
            width: 28
          }          
        }
        hourChart = new uCharts({
          $this: _this,
          canvasId: 'canvasHourChart',
          type: _this.type > 1 ? 'area' : 'column',
          dataPointShape: _this.type < 2,
          legend: {
            show: true,
            float: 'left',
            // position: 'top',
            fontSize: 12,
            lineHeight: 6
          },
          fontSize: 12,
          animation: false,
          // colors: [_this.tabBG],
          background:'#FFFFFF',
          pixelRatio: _this.pixelRatio,
          width: _this.cWidth*_this.pixelRatio,
          height: _this.cHeight*_this.pixelRatio,
          // yAxis: {
          //   disabled: true
          // },           
          xAxis: {
            rotateLabel: true
          },
          categories,
          series,
          extra
        })
        // 获取父元素节点高度
        // let warpper = uni.createSelectorQuery().in(this).select('.canvasShell'+this.type)
        // warpper.fields(
        //   {
        //     size: true,
        //     scrollOffset: true
        //   },
        //   data => {
        //     console.log(data)
        //     this.cHeight= data.height;
        //     this.cWidth= data.width;
        //     this.$nextTick(() => {
        //     })
        //   }
        // ).exec()
        
      }
      
    }
	}
</script>

<style lang="scss">

</style>
