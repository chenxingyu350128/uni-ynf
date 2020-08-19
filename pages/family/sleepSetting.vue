<template>
	<view class="page">
    <u-cell-group>
      <u-cell-item :arrow="false" title="午休时间">
        <u-switch @change="switchChange(0)" size="40" v-model="switch0" />
      </u-cell-item>
      <u-cell-item @click="openPicker(asleep0, 0)" :arrow="false" title="入睡时间" :value="asleep0"></u-cell-item>
      <u-cell-item @click="openPicker(awake0, 1)" :arrow="false" title="起床时间" :value="awake0"></u-cell-item>
    </u-cell-group>
    <view class="my-2"></view>
    <u-cell-group>
      <u-cell-item :arrow="false" title="夜间睡眠">
        <u-switch @change="switchChange(1)" size="40" v-model="switch1" />
      </u-cell-item>
      <u-cell-item @click="openPicker(asleep1, 2)" :arrow="false" title="入睡时间" :value="asleep1"></u-cell-item>
      <u-cell-item @click="openPicker(awake1, 3)" :arrow="false" title="起床时间" :value="awake1"></u-cell-item>
    </u-cell-group>
    <view class="my-2"></view>
    
    <view class="white caption px-4 py-2">
      提示：如开启夜间自定义睡眠时间，系统将按照自定义时间进行睡眠统计
    </view>
		<view class="posFix b0 full-width">
      <u-button @click="sleepSetting" :custom-style="style" type="primary">保存</u-button>
    </view>
    <u-picker 
      @confirm="timeConfirm" 
      :params="params" 
      mode="time" 
      v-model="showPicker"
      :default-time="defaultValue"
     />
	</view>
</template>

<script>
	export default {
		data() {
			return {
        style: {
          'border-radius': 'unset',
          background: '#00aaef'
        },
        params: {
          year: false,
          month: false,
          day: false,
          hour: true,
          minute: true,
          second: false
        },
        activedTime: '',
        showPicker: false,
        timeIndex: '',
        switch0: false,
        switch1: false,
        asleep0: '20:00',
        asleep1: '12:00',
        awake0: '09:00',
        awake1: '15:00'
			};
		},
    computed: {
      memberId: {
        get: function () {
          return this.$store.state.member.memberId
        },
        set: function () {}
      },
      watchId: {
        get: function () {
          return this.$store.state.member.watchId
        },
        set: function () {}
      },
      defaultValue () {
        return this.$u.timeFormat(new Date(), 'yyyy-mm-dd') + ' ' + this.activedTime
      },
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onShow() {
      this.init()
    },
    methods: {
      openPicker (e, i) {
        this.activedTime = e
        this.timeIndex = i
        this.showPicker = true
      },
      timeConfirm (e) {
        console.log(e)
        const res = e.hour + ':' + e.minute
        const arr = ['asleep0', 'awake0', 'asleep1', 'awake1']
        this[arr[this.timeIndex]] = res
      },
      sleepSetting () {
        const data = {
          type: 1,
          startTime: this.asleep0,
          endTime: this.awake0,
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        const data1 = {
          type: 2,
          startTime: this.asleep1,
          endTime: this.awake1,
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.post('/mobile/healthy/setSleepTimeQuantum', data)
        this.$http.post('/mobile/healthy/setSleepTimeQuantum', data1)
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      },
      switchChange (e) {
        const data = {
          swich: Number(this['switch'+e]),
          type: e + 1,
          memberId: this.memberId,
          sessionId: this.sessionId
        }
        this.$http.post('/mobile/healthy/updateSleepTimeQuantum', data)
      },
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getSleepTimeQuantum', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              if (obj.length) {
                obj.forEach((r, i) => {
                  if(r.type===1) {
                    this.switch0 = Boolean(r.swich)
                    this.asleep0 = r.startTime
                    this.awake0 = r.endTime
                  }
                  if(r.type===2) {
                    this.switch1 = Boolean(r.swich)
                    this.asleep1 = r.startTime
                    this.awake1 = r.endTime
                  }
                })
              }
            }
          })
      }
    }
	}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
  background: #ccc;
}
</style>
