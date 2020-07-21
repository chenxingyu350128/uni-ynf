<template>
	<view>
    <view>
      <!-- <text @click="showPicker=true">{{showTime}}</text> -->
      <u-cell-group>
        <u-cell-item @click="getDate(0)" title="提醒时间" :value="showTime"></u-cell-item>
      </u-cell-group>
      <u-field 
        v-model="medicineTitle" 
        label="标题" 
        placeholder="请填写标题" 
      />
      <u-cell-group>
       <u-cell-item @click="getDate(1)" title="开始日期" :value="startTime||'请选择'"></u-cell-item>
       <u-cell-item @click="getDate(2)" title="结束日期" :value="endTime||'请选择'"></u-cell-item>
      </u-cell-group>
      <u-field
        v-model="medicineRemarks" 
        label="备注" 
        placeholder="请填写备注" 
      />
    </view>
    <view class="posFix b0 full-width">
      <u-button @click="commitModify" hair-line="false" :custom-style="customStyle" type="primary">{{medicineId?'保存修改':'添加提醒'}}</u-button>
    </view> 
		<u-picker @confirm="timeConfirm" mode="time" :default-time="defaultTime" :params="params" v-model="showPicker"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        customStyle: {
          'border-radius': 'unset!important'
        },
        showPicker: false,
        isTime: true,
        isStart: true,
        item: null,
				endTime: '',
				medicineId: '',
				medicineRemarks: '',
				medicineTitle: '',
				remindTime: '',
				startTime: ''
			};
		},
    computed: {
      params () {
        return this.isTime ? {
          year: false,
          month: false,
          day: false,
          hour: true,
          minute: true,
          second: false
        } : {
          year: true,
          month: true,
          day: true,
          hour: false,
          minute: false,
          second: false
        }
      },
      currentTime () {
        return this.$u.timeFormat(new Date(), 'yyyy-mm-dd hh:MM')
      },
      currentDate () {
        return this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
      },
      dataTime () {
        return this.remindTime ? this.$u.timeFormat(new Date(), 'yyyy-mm-dd') + ' ' + this.remindTime : ''
      },
      dataDate () {
        if (this.isStart) {
          return this.startTime ? this.startTime + ' ' + this.showTime : ''
        } else {
          return this.endTime ? this.endTime + ' ' + this.showTime : ''
        }
      },
      defaultTime () {
        if (this.isTime) {
          return this.dataTime || this.currentTime 
        } else {
          return this.dataDate || this.currentDate
        }
      },
      showTime () {
        return this.dataTime.split(' ') [1] || this.currentTime.split(' ') [1] 
      },
      sessionId(){
        return this.$store.state.app.sessionId
      },      
      memberId(){
        return this.$store.state.member.memberId
      },        
      watchId(){
        return this.$store.state.member.watchId
      }      
    },
    onLoad(e) {
      if (e.item) {
        this.item = JSON.parse(decodeURIComponent(e.item))
      }
    },
    onShow() {
      if (this.item) {
        for (const x in this.item) {
          this[x] = this.item[x]
        }
      }
    },
    methods: {
      timeConfirm (e) {
        console.log(e)
        if (this.isTime) {
          this.remindTime = e.hour+':'+e.minute
        } else {
          const val = `${e.year}-${e.month}-${e.day}`
          if (this.isStart && this.endTime) {
             if (Date.parse(val) > Date.parse(this.endTime)) {
               this.$u.toast('开始日期不得大于结束日期')
               return false
             } else {
               this.startTime = val
               return false
             }
          }
          if (!this.isStart && this.startTime) {
             if (Date.parse(val) < Date.parse(this.startTime)) {
               this.$u.toast('结束日期不得小于开始日期')
               return false
             } else {
               this.endTime = val
               return false
             }
          }
          this.isStart ? this.startTime = val : this.endTime = val
        }
      },
      getDate (e) {
        this.isTime = !e
        this.isStart = e === 1
        this.showPicker = true
      },
      commitModify () {
        const verifyArr = [
          { state: !this.medicineTitle, alert: '请填写标题' },
          { state: !this.startTime, alert: '请选择开始日期' },
          { state: !this.endTime, alert: '请选择结束日期' }
        ]
        let valid = true
        verifyArr.some(res => {
          if (res.state) {
            valid = false
            this.$u.toast(res.alert)
            return true
          }
        })
        if (!valid) return false
        const url = this.medicineId ? '/mobile/healthy/updateWatchMedicine' : '/mobile/healthy/addWatchMedicine'
        const data = {
          watchId: this.watchId,
          memberId: this.memberId,
          sessionId: this.sessionId,
          medicineTitle: this.medicineTitle,
          medicineRemarks: this.medicineRemarks,
          startTime: this.startTime,
          endTime: this.endTime,
          remindTime: this.showTime
        }
        if(this.medicineId){
          data['medicineId'] = this.medicineId
        }  
        this.$http.post(url, data)  
          .then(res => {
            if (res.data.success) {
              uni.navigateBack()
            }
          })
      }
    }
	}
</script>

<style lang="scss">

</style>
