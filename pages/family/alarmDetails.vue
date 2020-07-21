<template>
	<view class="page d-flex flex-column">
    <view class="v-msgs pa-4 grey--text text--darken-3 caption white">
      <view class="mb-2">
        警报时间：{{ time }}
      </view>
      <view class="mb-2">
        警报内容：{{ content }}
      </view>
      <view class="mb-2">
        平台建议：{{ suggest }}
      </view>
      <view
        v-if="type>3"
        class="mb-2"
      >
        警报地址：{{ address }}
      </view>
      <view v-else>
        <view class="py-2">
          {{ typeName }}参考：
        </view>
        <view v-if="type==1">
          {{ HR_Reference }}
        </view>
        <view
          v-if="type===2"
          class="border-r-b"
        >
          <view 
            v-for="(item,i) in tb2" 
            :key="i"
            class="d-flex"
          >
            <view
              v-for="(itm,idx) in item"
              :key="idx"
              class="text-center col-4 border-l-t"
              v-text="itm"
            />
          </view>
        </view>
        
        <view
          v-if="type===3"
          class="mt-4 border-r-b"
        >
          <view class="d-flex">
            <view class="col-4 border-l-t">
              糖代谢分类
            </view>
            <view class="col-8 d-flex flex-column">
              
              <view class="border-l-t">
                静脉血浆葡萄糖(mmol/L)
              </view>
              <view class="d-flex">
                <view class="col-6 border-l-t">空腹血糖FPG</view>
                <view class="col-6 border-l-t px-1">糖负荷后2小时血糖mmol/L</view>
              </view>
            </view>
          </view>
          <view
            v-for="(item,i) in tb3"
            :key="i"
            class="d-flex"
            style="border-collapse: collapse;"
          >
            <view
              v-for="(itm,idx) in item"
              :key="idx"
              class="text-center col-4 border-l-t"
              v-text="itm"
            />
          </view>
        </view>

        <view class="mt-4">
          常见症状：{{ symptoms }}
        </view>
      </view>
    </view>
    <map 
      v-if="showMap" 
      :style="{width: cWidth*pixelRatio + 'px', height: cHeight*pixelRatio + 'px'}"  
      :latitude="finalLat" 
      :longitude="finalLon"
      :markers="markers"
    ></map>
  </view>
</template>

<script>
	export default {
		data() {
			return {
        showMap: false,
        cHeight: '',
        cWidth: '',
        pixelRatio: 1,
				alarmId: '',
        memberId: '',
        type: '',
        radius: '',
        time: '',
        content: '',
        suggest: '',
        lat: '',
        lon: '',
        address: '',
        watchAddress: '',
        watchLat: '',
        watchLon: '',
        tb2: [
          ['类别','收缩压','舒张压'],
          ['理想血压','<120','<80'],
          ['正常高值','120~139','80~89'],
          ['高血压','<140','<90'],
          ['1级高血压','140~159','90~99'],
          ['2级高血压','160~179','100~109'],
          ['3级高血压','<180','<110'],
          ['单纯收缩期高血压','<140','<90'],
        ],
        tb3: [
          ['正常血糖','<6.1','<7.8'],
          ['空腹血糖受损','6.1~7.0','<7.8'],
          ['糖耐量减低','<7.0','7.8~11.1'],
          ['糖尿病','>7.0','>11.1'],
        ],
        HR_Reference: '正常人安静状态下每分钟心跳次数，一般为60~100次/分钟，可因年龄、性别活其他生理因素产生个体差异。年龄越小，心率越快，老年人心跳比年轻人慢，女性的心率比同龄男性快，这些都是正常现象。',
			};
		},
    computed: {
      markers () {
        if (this.lon && this.lat) {
          return [{
            id: 'alarmMap',
            longitude: this.watchLon || this.lon,
            latitude: this.watchLat || this.lat,
            iconPath: '/static/img/map/currentPosition.png'
          }]
        } else {
          return []
        }
      },
      finalLon () {
        return this.watchLon || this.lon
      },
      finalLat () {
        return this.watchLat || this.lat
      },
      typeName(){
        if(this.type==1){
          return '心率'
        }
        if(this.type==2){
          return '血压'
        }
        if(this.type==3){
          return '血糖'
        }
      },
      symptoms(){
        if(this.type==1){
          return '胸闷气短、心情烦躁、心肺功能差、高热、贫血、甲亢、出血、疼痛、缺氧、心衰和心肌病等疾病。'
  
        }
        if(this.type==2){
          return '头晕、头痛、颈项板紧、疲劳、心悸等，也可出现视力模糊、鼻出血等较重症状，典型的高血压头痛在血压下降后即可消失。'
  
        }
        if(this.type==3){
          return '多饮、多尿、多食、消瘦、皮肤瘙痒。血糖升高较快可视力模糊。'
  
        }      
      },
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onLoad(e) {
      this.alarmId = e.alarmId
      this.memberId = e.memberId
      this.type = parseInt(e.type)
    },
    onShow() {
      let warpper = uni.createSelectorQuery().in(this).select('.page')
      warpper.fields(
        {
          size: true,
          scrollOffset: true
        },
        data => {
          console.log(data)
          this.cHeight= data.height;
          this.cWidth= data.width;
        }
      ).exec() 
      this.init()
    },
    methods: {
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          type: this.type,
          alarId: this.alarmId
        }
        let url
        switch (this.type) {
          case 0:
          case 1:
          case 2:
          case 3:
            url = '/mobile/healthy/getAlarmDetails'
            break;
          case 4:  
            url = '/mobile/healthy/getRailDetails'
            break;
          case 5:  
            url = '/mobile/healthy/getSosDetails'
            break;
        }
        this.$http.get(url, data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
              this.showMap = this.type > 3
            }
          })
      }
    }
	}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
}
.border-l-t{
  border-left: 1px solid;
  border-top: 1px solid;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.border-r-b{
  border-right: 1px solid;
  border-bottom: 1px solid;
  box-sizing: border-box;
}
</style>
