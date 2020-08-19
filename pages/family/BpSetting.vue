<template>
	<view class="page grey lighten-2">
    <view class="white">
      
      <u-field
        v-model="sbpMin" 
        label="收缩压最低"
        type="number"
        placeholder="请输入最低收缩压"
      > 
        <view slot="right">mmHg</view>
      </u-field>
      <u-field 
        v-model="sbpMax" 
        label="收缩压最高"
        type="number"
        placeholder="请输入最高收缩压" 
      > 
        <view slot="right">mmHg</view>
      </u-field>
      <u-field 
        v-model="sbpStandard" 
        label="收缩压校准值"
        type="number"
        placeholder="请输入收缩压校准值" 
      > 
        <view slot="right">mmHg</view>
      </u-field>
      <u-field
        v-model="dbpMin" 
        label="舒张压最低"
        type="number"
        placeholder="请输入最低舒张压"
      > 
        <view slot="right">mmHg</view>
      </u-field>
      <u-field 
        v-model="dbpMax" 
        label="舒张压最高"
        type="number"
        placeholder="请输入最高舒张压" 
      > 
        <view slot="right">mmHg</view>
      </u-field>
      <u-field 
        v-model="dbpStandard" 
        label="舒张压校准值"
        type="number"
        placeholder="请输入舒张压校准值" 
      > 
        <view slot="right">mmHg</view>
      </u-field>
    </view>
    <view class="mt-2 white">
      <u-field 
        v-model="bloodPressure" 
        label="发送频率"
        type="number"
        placeholder="请输入发送频率" 
      > 
        <view slot="right">秒/次</view>
      </u-field>
    </view>
		<view class="posFix b0 full-width">
      <u-button @click="setting" :custom-style="style" type="primary">保存</u-button>
    </view>
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
        dbpMax: '',
        dbpMin: '',
        dbpStandard: '',
        sbpMax: '',
        sbpMin: '',
        sbpStandard: '',
        bloodPressure: 600
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
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onShow() {
      this.init()
      this.getRate()
      
    },
    methods: {
      setting () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId,
          watchId: this.watchId,
          sbpMin: this.sbpMin,
          sbpMax: this.sbpMax,
          dbpMin: this.dbpMin,
          dbpMax: this.dbpMax,
          sbpStandard: this.sbpStandard,
          dbpStandard: this.dbpStandard,
          bloodPressure: this.bloodPressure
        }
        this.$http.post('mobile/healthy/setWatch', data)
          .then(res => {
            if (res.data.success) {
              this.$u.toast(res.data.msg)
              setTimeout(() => {
                uni.navigateBack()
              }, 500)
            }
          })
      },
      getRate () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getRate', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              if (obj) {
                this.bloodPressure = obj.bloodPressure
              }
            }
          })
      },
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getHealthyRange', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
            }
          })
      }
    }
	}
</script>

<style lang="scss" scoped>
/deep/.u-label-text{
  white-space: nowrap!important;
}
/deep/.fild-body{
  input{
    text-align: center!important;
  }
}
</style>
