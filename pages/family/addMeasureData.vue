<template>
	<view class="page grey lighten-3">
		<u-navbar title-color="#fff" back-icon-color="#fff" back-icon-name="arrow-left" :background="background">
      <view @click="showPicker(0)" class="slot-wrap white--text">
        {{dateStr}}
        <u-icon class="ml-2" :name="showDatePicker?'arrow-up-fill':'arrow-down-fill'" size="30"></u-icon>
      </view>
    </u-navbar>
    <!-- 血压 -->
    <view v-if="type===3">
      <view class="d-flex px-4 py-2 align-center justify-space-between">
        <view class="d-flex align-center caption">
          <image class="bloodPressureImg"  src="./static/img/bloodPressure@2x.png" mode=""></image>
          <text>血压测量时间</text>
        </view>
        <view @click="showPicker(1)" class="caption">{{timeStr||'请选择时间'}}</view>
      </view>
      <view class="d-flex px-4 py-2 align-center justify-space-between">
        <view class="d-flex align-center caption">
          <image class="bloodPressureImg"  src="./static/img/bloodPressure@2x.png" mode=""></image>
          <text>血压</text>
        </view>
        <view @click="showSelect=true" class="caption">{{bpValue||'请选择时间'}}</view>
      </view>
    </view>
    <!-- 血糖 -->
    <view v-else>
      <view class="white d-flex px-4 py-2 align-center justify-space-between">
        <view class="d-flex align-center caption">
          <image class="bloodSugarImg"  src="./static/img/bloodSugar@2x.png" mode=""></image>
          <text>血糖值</text>
        </view>
        <view class="caption">建议，目标3.9~6.1mmol/L</view>
      </view> 
      <view class="py-10 grey d-flex justify-center align-end">
        <input placeholder="？" class="largeFont" maxlength="3" type="digit" v-model="gi" />mmol/L
      </view>
      <view class="white d-flex px-4 py-2 align-center justify-space-between">
        <view class="d-flex align-center caption">
          <image class="bloodSugarImg"  src="./static/img/bloodSugar@2x.png" mode=""></image>
          <text>血糖值测量时间</text>
        </view>
        <view @click="showPicker(1)" class="caption">{{timeStr||'请选择时间'}}</view>
      </view>           
    
      <view class="white py-2 px-4 my-2 caption">
        <view class="d-flex align-center">
          <image class="bloodSugarImg"  src="./static/img/bloodSugar@2x.png" mode=""></image>
          <text>血糖值测量时间段</text>
        </view>
        <view class="mt-4 d-flex border-box">
          <view 
            class="border-box col-4 d-flex align-center px-4"
            v-for="(item, i) in mealTypes"
            :key="i"
          >
            <button 
              @click="mealTypeChange(i)" 
              class="white--text full-width" 
              :style="{background: mealType===i?BG:'grey'}" 
              type="default"
            >
              {{item}}
            </button>
          </view>
        </view>
      </view>
      <view class="white py-2 px-4 my-2">
        <view class="d-flex align-center">
          <image class="bloodSugarImg"  src="./static/img/bloodSugar@2x.png" mode=""></image>
          <text>饭前饭后</text>
        </view>
        <view class="mt-4 d-flex border-box">
          <view 
            class="border-box col-4 d-flex align-center px-4"
            v-for="(item, i) in timeType"
            :key="i"
          >
            <button 
              @click="mealTimeChange(i)" 
              class="white--text full-width" 
              :style="{background: beforeMeal===i?BG:'grey'}" 
              type="default"
            >
              {{item}}
            </button>
          </view>
        </view>
      </view>
    </view>
    <view class="posFix b0 full-width">
      <button @click="commitData" type="default" :style="{background: BG}" class="b-radius0 white--text">保存</button>
    </view>
		<u-picker 
      @confirm="timeChange" 
      :default-time="defaultTime"
      mode="time" 
      :params="params"
      v-model="showDatePicker"
    />
    <u-select @confirm="selectConfirm" mode="mutil-column" :list="list" :default-value="defaultBp" v-model="showSelect"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				BG: '',
        date: '',
        time: '',
        type: '',
        sbp: 90,
        dbp: 60,
        gi: 3.6,
        mealType: 0,
        mealTypes: ['早餐', '午餐', '晚餐'],
        timeType: ['饭前', '饭后'],
        beforeMeal: 0,
        datePickerValue: '',
        timePickerValue: '',
        showDatePicker: false,
        showSelect: false,
        showTime: false,
			};
		},
    computed: {
      background () {
        return {
          backgroundColor: this.BG
        }
      }, 
      dateStr () {
        return this.datePickerValue || this.date
      },
      timeStr () {
        return this.timePickerValue || this.$u.timeFormat(new Date(), 'hh:MM')
      },
      defaultTime () {
        return this.dateStr + ' ' + this.timeStr
      },
      defaultBp () {
        return [this.sbp, this.dbp]
      },
      bpValueColumn () {
        const arr = []
        for (let i = 0;i<201;i++) {
          arr.push({
            value: i,
            label: i+'mmHg'
          })
        }
        return arr
      },
      bpValue () {
        return `收缩压:${this.sbp}mmHg|舒张压:${this.dbp}mmHg`
      },
      list () {
        return [this.bpValueColumn, this.bpValueColumn]
      },
      params () {
        return this.showTime ? {
          year: false,
          month: false,
          day: false,
          hour: true,
          minute: true,
          second: true
        } : {
          year: true,
          month: true,
          day: true,
          hour: false,
          minute: false,
          second: false
        }
      }
    },
    onLoad(e) {
      this.type = Number(e.type)
      this.BG = e.BG
      this.date = e.date
    },
    methods: {
      timeChange (e) {
        console.log(e)
        if (this.showTime) {
          this.timePickerValue = e.hour + ':' + e.minute
        } else {
          this.datePickerValue = e.year +'-' + e.month + '-' + e.day
        }
      },
      selectConfirm (e) {
        console.log(e)
        this.sbp = e[0].value
        this.dbp = e[1].value
      },
      showPicker (e) {
        this.showTime = !!e
        this.showDatePicker = true
      },
      mealTypeChange (e) {
        console.log(e)
        this.mealType = e
      },
      mealTimeChange (e) {
        console.log(e)
        this.beforeMeal = e
      },
      commitData () {
        if (this.type === 4) {
          if (!this.gi) {
            this.$u.toast('请输入血糖值')
            return false
          }
        }
        const url = this.type === 3 ? '/mobile/healthy/addBloodPressure' : '/mobile/healthy/addBloodSugar'
        const data = {
          memberId: Number(this.$store.state.member.memberId),
          sessionId: this.$store.state.app.sessionId,
          deviceTime: this.dateStr+' '+this.timeStr
        };
        if (this.type === 3) {
          data.sbp = this.sbp
          data.dbp = this.dbp
        } else {
          data.gi = this.gi
          data['fullBarrier'] = this.mealType + 1
          data['bsState'] = this.beforeMeal + 1
        }
        this.$http.post(url, data)
          .then(res => {
            if (res.data.success) {
              this.$u.toast(res.data.msg)
              uni.navigateBack()
            }
          })
      },
    }
	}
</script>

<style lang="scss" scoped>
  .page{
    height: 100vh;
  }
.slot-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 30rpx;
  margin-left: calc(97px - 68rpx);
}
.bloodPressureImg{
  height: 56rpx;
  width: 30rpx;
}
.bloodSugarImg{
  height: 40rpx;
  width: 40rpx;
}
.largeFont{
  font-size: 34px;
  height: 1em;
  width: 1.5em;
}
</style>
