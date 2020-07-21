<template>
	<view>
    <view class="primary">
      <view class="d-flex align-center px-6 py-4 ">
        <view class="flex-fill white--text">
          <view class="d-flex flex-column">
            <text class="font-weight-bold subtitle-1">到账微信：{{ wechatType === 1 ? vxName : '未绑定' }}</text>
            <text class="mt-2 caption">
              审核通过后在3个工作日内到账
            </text>
          </view>
        </view>
        <u-button 
          size="mini" 
          class="caption" 
          type="primary" 
          shape="circle" 
          :custom-style="bindBtnStyle"
          @click="bind"
        >
          {{ wechatType === 1 ? '已绑定' : '请绑定' }}
        </u-button>
      </view>
    </view>
    <view class="ma-4 px-4">
      <view class="subtitle-1 primary--text font-weight-bold">
        提现金额
      </view>
<!--      <v-text-field
        v-model="want"
        color="error"
        class="title font-weight-bold mb-1"
        prefix="￥"
        type="number"
        placeholder="请输入提现金额"
      /> -->
<!--       <u-field 
         v-model="want" 
         label="￥" 
         type="number"
         placeholder="请输入提现金额" 
       /> --> 
      <view class="d-flex align-center">
        <text class="primary--text">￥</text>
        <!-- #ifdef H5 -->
        <u-input v-model="want" placeholder="请输入提现金额" type="number" />
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <u-input v-model="want" placeholder="请输入提现金额" type="digit" />
        <!-- #endif -->
      </view>
      <u-line color="grey" />
      <view class="caption py-2 font-weight-bold">
        当前账户余额{{ money }}元 ,
        <text
          style="color: #F91A34"
          @click="takeAll"
        >全部提现</text>
      </view>
    </view>
    <view class="px-4">
<!--      <v-btn
        block
        dark
        rounded
        depressed
        large
        :color="wechatType === 1 ? 'blue' : 'grey'"
        @click="apply"
      >
        申请提交
      </v-btn> -->
      <u-button 
        shape="circle" 
        type="primary" 
        :custom-style="btnStyle"
        @click="submit"
      >
        申请提交
      </u-button>
    </view>
    <!-- <view class="d-flex justify-center grey--text py-2">
      <text
        class="subtitle-2"
        @click="showRecord=true"
      >提现记录</text>
    </view> -->
    <view class="mt-4 mx-6 caption font-weight-bold grey--text text--darken-1">
      <h3 class="my-2">
        提现规则：
      </h3>
      <p>1、目前提现只支持微信提现，暂不支持其他方式提现。</p>
      <p>2、未判定微信的账户无法提现。</p>
      <p>3、单次提现申请必须满足20元，才能进行提现。</p>
      <p>4、提现审核通过后在3个工作日到达您绑定的微信余额。</p>
      <p>5、提现失败可重新发起提现申请或联系客服人员询问后处理</p>
    </view>    
	</view>
</template>

<script>
	export default {
		data() {
			return {
        want: '',
        money: 0
			};
		},
    computed: {
      bindBtnStyle () {
        return this.wechatType ? {
          'font-size': '20rpx',
          color: '#fff',
          border: '1px solid #fff'
        } : {
          'font-size': '20rpx',
          color: '#00aaef',
          background: '#fff'
        }
      },
      btnStyle () {
        const valid = this.want && (Number(this.want) <= Number(this.money))
        return {
          'background': valid ? '#00aaef': '#9e9e9e'
        }
      },
      wechatType(){
        return this.$store.state.app.wechatType
      },
      userName(){
        return this.$store.state.app.userName
      },
      vxName(){
        return this.$store.state.app.vxName||'未绑定'
      },
      sessionId(){
        return this.$store.state.app.sessionId
      },
      userId(){
        return this.$store.state.app.userId
      }
    },
    onLoad(e) {
      console.log(e)
      if (e.money) {
        this.money = e.money
      }
    },
    methods: {
      takeAll () {
        this.want = this.money
      },
      submit () {
        if(this.want>500){
          this.$u.toast('单次提现最大金额为500元')
          return false
        }
        if(this.want>this.money){
          this.$u.toast('可提现余额不足')
          return false
        }
        const data = {
          sessionId: this.sessionId,
          userId: this.userId,
          amount: this.want
        }
        this.$http.post('/mobile/activity/applicationDeposit', data)
          .then(res => {
            if(res.data.success){
              this.$u.toast(res.data.msg)
            }
          })
      }
    }
	}
</script>

<style lang="scss">

</style>
