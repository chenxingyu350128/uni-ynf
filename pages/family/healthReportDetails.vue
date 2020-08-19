<template>
	<view class="page">
    <view class="px-4 py-2 primary--text text-right">
      {{ month }}
    </view>
    <view class="pb-6 main">
      <view class="d-flex white pa-2 mb-2">
        <u-avatar :src="avatar" size="130"></u-avatar>
        <view class="ml-6 flex-fill d-flex flex-column justify-space-between caption text--secondary">
          <view>
            <text>性别：{{ sex==1?'男':sex==2?'女':'未知' }}</text>
            <text class="ml-4">出生日期：{{ birthday||'未填写' }}</text>
          </view>
          <view>
            <text>身高：{{ height }}cm</text>
            <text class="ml-4">体重：{{ weight }}kg</text>
          </view>
          <view>
            <text>血型：{{ blood }}</text>
            <text class="ml-4">BMI： {{ bmi }}</text>
          </view>
        </view>
      </view>
      <!-- 诊断书 -->
      <view class="white">
        <view class="pa-2 d-flex align-center subtitle-2 font-weight-bold text--secondary">
<!--          <v-icon
            color="green accent-4"
            class="mr-2"
          >
            mdi-clipboard-text-outline
          </v-icon> -->
          <u-icon class="mr-2" color="#00c853" size="40" name="order"></u-icon>
          诊断书
        </view>
        <!-- <v-viewider /> -->
        <u-line color="grey" />
        <view
          v-for="(item,i) in diagnoseBook"
          :key="i"
        >
          <view class="ma-2 d-flex align-center font-weight-bold caption text--primary">
            <view class="largeDot elevation-3 mr-2"></view>
            <text class="u-line-1">{{ item.markedWord }}</text>
           
          </view>
        </view>
        <u-line color="grey" />
      </view>
      <!-- 分析数据 -->
      <view class="d-flex align-center">

        <u-divider class="full-width my-4" color="#666" border-color="#6d6d6d">分析数据</u-divider>
      </view>
      <!-- 运动 -->
      <view
        style="background: #09f;"
        class="pa-4 subtitle-2 mb-3 white--text"
      >
        <view>运动分析</view>
        <view class="py-4 d-flex justify-space-around align-center">
          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">运动里程</text>
            <text class="caption mt-2">{{ sportMileage }}公里</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">燃烧卡路里</text>
            <text class="caption mt-2">{{ calorie }}千卡</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">日均运动</text>
            <text class="caption mt-2">{{ stepHour }}小时</text>
          </view>
        </view>
      </view>
      <!-- 睡眠 -->
      <view
        style="background: #66c;"
        class="pa-4 subtitle-2 mb-3 white--text"
      >
        <view>睡眠分析</view>
        <view class="py-4 d-flex justify-space-around align-center">
          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">深浅比例</text>
            <text class="caption mt-2">{{ Math.round(sleepRatio*100) }}%</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">日均睡眠</text>
            <text class="caption mt-2">{{ sleepHour }}小时</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">总睡眠时间</text>
            <text class="caption mt-2">{{ duration }}小时</text>
          </view>
        </view>
      </view>
      <!-- 心率 -->
      <view
        style="background: #c03;"
        class="pa-4 subtitle-2 mb-3 white--text"
      >
        <view>心率分析</view>
        <view class="py-4 d-flex justify-space-around align-center">
          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">最高心率</text>
            <text class="caption mt-2">{{ maxBpm }}bpm</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">平均心率值</text>
            <text class="caption mt-2">{{ pbm }}bpm</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">最低心率</text>
            <text class="caption mt-2">{{ minBpm }}bpm</text>
          </view>
        </view>
      </view>
      <!-- 血压 -->
      <view
        style="background: #ff6600;"
        class="pa-4 subtitle-2 mb-3 white--text"
      >
        <view>血压分析</view>
        <view class="py-4 d-flex justify-space-around align-center">
          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">最高血压</text>
            <text class="caption mt-2">{{ maxSbp }}mmHg</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">平均血压值</text>
            <text class="caption mt-2">{{ mmhg }}mmHg</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">最低血压</text>
            <text class="caption mt-2">{{ minDbp }}mmHg</text>
          </view>
        </view>
      </view>
      <!-- 血糖 -->
      <view
        style="background: #cc9900;"
        class="pa-4 subtitle-2 white--text"
       
      >
        <view>血糖分析</view>
        <view class="py-4 d-flex justify-space-around align-center">
          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">最高血糖</text>
            <text class="caption mt-2">{{ maxGi }}mmol/L</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">平均血糖值</text>
            <text class="caption mt-2">{{ gi }}mmol/L</text>
          </view>
          <u-line color="#fff" direction="col" />

          <view class="d-flex align-center flex-column py-2">
            <text class="font-weight-bold">最低血糖</text>
            <text class="caption mt-2">{{ minGi }}mmol/L</text>
          </view>
        </view>
      </view>
      <!-- 统计数据 -->
      <view class="d-flex align-center">
        <u-divider class="full-width my-4" color="#666" half-width="200" border-color="#6d6d6d">分析数据</u-divider>
      </view>   
      <!-- 图表 -->
      <u-tabs :list="tabList" :is-scroll="false" :current="current" @change="tabChange"></u-tabs>
      <canvas @touchstart= "seeDetails" canvas-id="reportChart" id="healthReportChart" :style="{width: cWidth*pixelRatio + 'px', height: cHeight*pixelRatio + 'px'}" class="fill-height full-width lowZIndex mb-4"></canvas>
      
     <!-- @touchstart= "seeDetails" -->
      <view class="grey lighten-1 px-4 py-2 text--primary d-flex justify-space-between mb-2">
        <text>心率警报总数：</text>
        <text>
          <text class="red--text font-weight-bold">{{ outBpms }}</text>次
        </text> 
      </view>
      <view class="grey lighten-1 px-4 py-2 text--primary d-flex justify-space-between mb-2">
        <text>血糖警报总数：</text>
        <text>
          <text class="red--text font-weight-bold">{{ outBusg }}</text>次
        </text> 
      </view>
      <view class="grey lighten-1 px-4 py-2 text--primary d-flex justify-space-between mb-2">
        <text>血压警报总数：</text>
        <text>
          <text class="red--text font-weight-bold">{{ outBpre }}</text>次
        </text> 
      </view>
      <view class="grey lighten-1 px-4 py-2 text--primary d-flex justify-space-between mb-2">
        <text>范围警报总数：</text>
        <text>
          <text class="red--text font-weight-bold">{{ outRail }}</text>次
        </text> 
      </view>
      <view class="grey lighten-1 px-4 py-2 text--primary d-flex justify-space-between mb-2">
        <text>SOS警报总数：</text>
        <text>
          <text class="red--text font-weight-bold">{{ outSos }}</text>次
        </text> 
      </view>
    </view>    
    
	</view>
</template>

<script>
  import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js'
  let healthReportChart = null
	export default {
		data() {
			return {
				month: '',
        // showChart: false,
        current: 0,
        tabList: [
          { name: '运动' },
          { name: '睡眠' },
          { name: '心率' },
          { name: '血压' },
          { name: '血糖' }
        ],
        stepStr: '',
        heartStr: '',
        quietStr: '',
        bpmStr: '',
        sbpStr: '',
        dbpStr: '',
        giStr: '',    
        bmi: 0,
        diagnoseBook: [],
        maxGi: '',      
        minGi: '',      
        gi: '',         
        pbm: '',        
        maxBpm: '',     
        minBpm: '',     
        mmhg: '',       
        maxSbp: '',      
        minDbp: '',      
        sportMileage: '',      
        calorie: '',     
        stepHour: '',    
        sleepRatio: '',   
        sleepHour: '',     
        duration: '',      
        outRail: '',       
        outSos: '',        
        outBusg: '',        
        outBpms: '',       
        outBpre: '',   
        birthday: '',    
        sex: 1,    
        height: 0,    
        weight: 0,  
        blood: '',
        // chart
        pixelRatio: 1,
        cWidth: '',
        cHeight: ''
			};
		},
    computed: {
      sessionId(){
        return this.$store.state.app.sessionId
      },      
      memberId: {
        get: function () {
          return this.$store.state.member.memberId
        },
        set: function (res) {
          console.log(res)
        } 
      },
      avatar(){
        return this.$store.state.member.image
      },
      labels() {
        let arr = []
        for(let i=1;i<32;i++){
          arr.push(i+"")
        }
        return arr
      },
      chartData() {
        let dataArr = [
          this.stepStr.split(','),
          [this.heartStr.split(','), this.quietStr.split(',')],
          this.bpmStr.split(','),
          [this.sbpStr.split(','), this.dbpStr.split(',')],
          this.giStr.split(',')
        ]
        console.log(dataArr)
        let types = ['bar','bar','line','line','line']
        const all = [
          [
            {
              'name': '运动步数',
              'data': dataArr[0]
            }
          ],
          [
            {
              'name': '深睡眠',
              'data': dataArr[1][0]
            },
            {
              'name': '浅睡眠',
              'data': dataArr[1][1]
            }
          ],
          [
            {
              'name': '心率',
              'data': dataArr[2]
            }
          ],
          [
            {
              'name': '收缩压',
              'data': dataArr[3][0]
            },
            {
              'name': '舒张压',
              'data': dataArr[3][1]
            }
          ],
          [
            {
              'name': '血糖',
              'data': dataArr[4]
            }
          ]
        ]
        console.log(all)
        
        return all[this.current]
      }
    },
    onLoad(e) {
      const that = this
      console.log(e)
      if (e) {
        this.month = e.month
      }
      this.cWidth=uni.upx2px(750);
      this.cHeight=uni.upx2px(600);
      // uni.getSystemInfo({
      //   success: function (res) {
      //     if(res.pixelRatio > 1){
      //       //正常这里给2就行，如果pixelRatio=3性能会降低一点
      //       //_self.pixelRatio =res.pixelRatio;
      //       that.pixelRatio = 2;
      //     }
      //   }
      // });
    },
    onShow() {
      this.init()
    },
    methods: {
      async init () {
        const data = {
          memberId: this.memberId,
          sessionId: this.sessionId,
          month: this.month
        }
        const res = await this.$http.get('/mobile/healthy/getHealthToDay', data)
        if (res.data.success) {
          const obj = res.data.obj
          for (const x in obj) {
            this[x] = obj[x]
          }
        }
        this.$nextTick(() => {
          console.log(this.chartData, this.labels)
          this.showChart(this.chartData, this.labels)
        })      
      },
      tabChange(e) {
        this.current = e
        this.$nextTick(() => {
          console.log(this.chartData, this.labels)
          this.showChart(this.chartData, this.labels)
        })
      },
      seeDetails (e) {
        const that = this
        const x = healthReportChart.getCurrentDataIndex(e)
        healthReportChart.showToolTip(e, {
            format: function (item, category) {
                console.log(item, category)
                return category + ' ' + item.name + ':' + item.data 
            }
        })
      },
      showChart (series, categories) {
        const that = this
        const extra = this.current > 1 ?
        {
          area:{
            type: 'straight'
          }
        } : {
          column:{
            type: 'meter',
            opacity: 0.2,
            width: 28
          }          
        }

        healthReportChart = new uCharts({
          $this: that,
          canvasId: 'reportChart',
          type: that.current<2?'column':'area',
          dataPointShape: that.current < 2,
          legend: {
            show: true,
            position: 'bottom',
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
        
        // this.showChart = true
      }
    }
	}
</script>

<style lang="scss" scoped>
.largeDot{
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: #009cd8;
}
.chart{
  width: 100%;
  height: 35vh;
}
.main> view {
  margin: 0 15px;
}

</style>
