<template>
	<view class="page">
    <view class="px-4">
      <view class="py-4 subtitle-1">问题反馈</view>
      <textarea 
        v-model="feedbackContent"  
        placeholder="请描述您遇到的问题，提交问题需要连接网络。如果您有多个问题，请用换行符分开，以便于我们更好的识别您的问题。" 
        class="white full-width pa-4"
      />
<!--       <u-field 
         v-model="feedbackContent" 
         class="white"
         placeholder="请描述您遇到的问题，提交问题需要连接网络。如果您有多个问题，请用换行符分开，以便于我们更好的识别您的问题。" 
         type="textarea" 
       /> -->   
      <view class="py-4 subtitle-1">联系方式（可选）</view>
      <view class="white d-flex align-center mb-2 pl-4">
        <text class="mr-4">电话</text>
        <u-input 
          v-model="phone" 
          :type="number" 
          :border="border" 
          placeholder="请输入手机号"
        />
      </view>
      <view class="white d-flex align-center mb-2 pl-4">
        <text class="mr-4">QQ</text>
        <u-input 
          v-model="qq" 
          :type="number" 
          :border="border" 
          placeholder="请输入QQ号"
        />
      </view>
      <view class="white d-flex align-center mb-2 pl-4">
        <text class="mr-4">邮箱</text>
        <u-input 
          v-model="mail" 
          :border="border" 
          placeholder="请输入邮箱"
        />
      </view>
      
    </view>
		<view class="posFix b0 full-width">
		  <u-button @click="commit" :custom-style="btnStyle" type="primary">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '',
        feedbackContent: '',
        phone: '',
        qq: '',
        mail: '',
        btnStyle: {
          'border-radius': 'unset!important',
          background: '#00aaef'
        }
			};
		},
    computed: {
      sessionId(){
        return this.$store.state.app.sessionId
      }
    },
    onLoad(e) {
      const titles = ['APP应用', '腕表', '耗电', '腕表外观', '其他']
      if (e.type) {
        this.type = Number(e.type)
      }
      uni.setNavigationBarTitle({
        title: titles[this.type] + '反馈'
      })
    },
    methods: {
      commit () {
        if (!this.feedbackContent) {
          this.$u.toast('请填写具体的反馈内容')
          return false
        }
        if (!this.phone && !this.qq && !this.mail) {
          this.$u.toast('请至少选择一种联系方式')
          return false
        }
				const data = {
					sessionId: this.sessionId,
					feedbackType: this.type,
					feedbackContent: this.feedbackContent,
          phone: this.phone,
          qq: this.qq,
          mail: this.mail
				}
        this.$http.post('/mobile/personal/addFeedback', data)
          .then(res=>{
            if(res.data.success){
              this.$u.toast('反馈已收到，客服将尽快处理')
              setTimeout(() => {
                uni.navigateBack()
              }, 1000)
            }
          })
      }
    }
	}
</script>

<style lang="scss" scoped>
.page{
  height: 100vh;
  background: #eeeeee;
}
</style>
