<template>
	<view class="pa-1">
		<view class="title font-weight-bold mb-4">
		  {{newTitle}}
		</view>
    <view class="mb-2 grey--text">{{createTime}}</view>
    <rich-text class="richText" :nodes="newContent"></rich-text>
    <image :src="newPic" mode="widthFix"></image>
	</view>
</template>

<script>293961
	export default {
		data() {
			return {
				newsId: '',
        createTime: '',
        newPic: '',
        newTitle: '',
        newContent: ''
			};
		},
    computed: {
      sessionId(){
        return this.$store.state.app.sessionId
      },				
      memberId(){
        return this.$store.state.member.memberId
      }
    },
    onLoad(e) {
      console.log(e)
      this.newsId = e.newsId
      this.init()
    },
    methods: {
      init () {
        const params = {
          newId: this.newsId,
        }
        if (this.memberId) {
          params.memberId = this.memberId
        }
        if (this.sessionId) {
          params.sessionId = this.sessionId
        }
        this.$http.get('mobile/index/getNews', params)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
              let richText = obj.newContent
              this.newContent = `${richText}`.replace(/\<img/gi, '<img class="richImg"')
            }
          })
      }
    }
	}
</script>

<style lang="scss">
  
.richImg{
  width: 100%;
  height: auto;
}
</style>
