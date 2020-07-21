<template>
	<view>
    <view class="caption pa-4 d-flex flex-column">
      <text>问题:</text>
      <text class="ml-4 mt-2">{{ feedbackContent }}</text>
    </view>
    <view class="caption pa-4 grey--text d-flex flex-column">
      <text> 颐纳福回复:</text>
      <text class="ml-4 mt-2">{{ dealContent }}</text>
      <view class="text-right full-width">
        {{ dealTime }}
      </view>
    </view>
    <view
      v-if="state===2||state===3"
      class="pa-4"
    >
      <view class="caption">{{ state===2?'请您评价':'您的评价' }}</view>
      <view class="d-flex align-center mt-2">
        <u-button 
          v-for="(item,i) in assessArr"
          :key="i"
          class="mr-2"
          size="mini" 
          @click="setEvaluation(i)"
          type="primary"
          :disabled="state!==2"
        >
          <u-icon size="48" v-if="assess === i" name="icon-test84" customPrefix="mdi"></u-icon>
          <text>{{item}}</text>
        </u-button>
      </view>
    </view>
    
   <view v-if="state===2" class="pa-4">
      <u-button  @click="commit" type="primary">提交评价</u-button>
    </view>   
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedbackId: '',
        feedbackContent: '',
        dealContent: '',
        state: '',
        assessArr: ['有帮助','帮助不大','没有帮助'],
        assess: 0, // 评价 0:有帮助 1:帮助不大 2:没有帮助
        dealTime: '',
        createTime: '',
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      }
    },
    onLoad(e) {
      this.feedbackId = e.id
    },
    onShow() {
      this.init()
    },
    methods: {
      setEvaluation (e) {
        console.log(e)
        this.assess = e
      },
      init () {
        const params = {
          sessionId: this.sessionId,
          feedbackId: this.feedbackId
        }
        this.$http.get('/mobile/personal/getFeedback', params)
          .then(res=>{
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
            }
          }) 
      },
      commit () {
        const data = {
          feedbackId: this.feedbackId,
          sessionId: this.sessionId,
          assess: this.assess
        }
        this.$http.post('/mobile/personal/feedbackAssess', data)
          .then(res => {
            if(res.data.success){
              this.init()
              this.$u.toast('评价成功')
            }
          })
      }
    }
	}
</script>

<style lang="scss">

</style>
