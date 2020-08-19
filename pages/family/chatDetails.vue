<template>
	<view>
		<!-- 聊天区域 -->
    <view
      v-for="(dia,i) in list"
      :key="i"
      :class="dia.send_type==1?'flex-row-reverse':'flex-row'"
      class="posRela d-flex align-center justify-start pa-2"
    >
      <u-avatar :src="dia.img" mode="circle"></u-avatar>
      <u-button @click="playAudio(dia)" class="mx-4" size="medium" type="info" shape="circle">
        <u-icon :class="dia.send_type===1?'mdi-rotate-270':'mdi-rotate-90'" name="wifi"></u-icon>
        {{dia.voice_length}}
        <u-badge v-if="dia.read_status === 0" :is-dot="true" type="success"></u-badge>
      </u-button>
    </view>
    <!-- 录音按钮 -->
    <view 
      @touchstart="startRec($event)"
      @touchmove="onTouch($event)"
      @touchend="finishIt($event)"
      :class="processing?'green darken-2':'primary'"
      class="d-inline-flex white--text primary posFix posStyle align-center justify-center elevation-10"
    >
      {{ processing?'松开结束':'长按录音' }}
    </view>
    <view
      v-if="processing"
      :class="notChanged?'primary':'teal'"
      class="posFix d-flex flex-column align-center pa-2 b50vh white--text"
    >
<!--      <v-icon>
        {{ notChanged?'mdi-ear-hearing':'mdi-ear-hearing-off' }}
      </v-icon> -->
      <u-icon size="55" customPrefix="mdi" :name="notChanged?'microphone':'microphone-off'"></u-icon>
      <text class="mt-4">{{ notChanged?'正在录音\n(上滑取消)':'取消发送' }}</text>
    </view>
	</view>
</template>

<script>
  const recorderManager = uni.getRecorderManager();
  const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				memberId: '',
        realName: '',
        type: '',
        list: [],
        processing: false,
        isCancel: false,
        notChanged: true,
        startY: '',
        endY: '',
        duration: '',
        startTime: '',
        endTime: ''
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      },
      scope_record () {
        return this.$store.state.app.scope_record
      },
    },
    onLoad(e) {
      if (e.memberId) {
        this.memberId = e.memberId
      }
      if (e.realName) {
        this.realName = e.realName
      }
      if (e.type) {
        this.type = parseInt(e.type)
      }
      // 获取录音权限
      if (!this.scope_record) {
        uni.authorize({
          scope: 'scope.record',
          success: res => {
            console.log(res)
            if (res.errMsg === 'authorize:ok') {
              this.$store.commit('SET_SINGLE_ITEM', ['scope_record', true])
            } else {
              uni.navigateBack()
            }
          }
        })
      }
    },
    onShow() {
      uni.setNavigationBarTitle({
        title: this.type === 1 ? '和'+this.realName+'聊天中...' : this.realName
      })
      this.init()
    },
    methods: {
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/user/getMemberMessages', data)
          .then(res => {
            if (res.data.success) {
              this.list = res.data.obj
              this.list.reverse()
            }
          })
      },
      startRec (e) {
        console.log(e)
        let that = this
        console.log('start');
        this.isCancel = false//开始录音时初始化状态
        this.startY = e.changedTouches[0].clientY
        this.processing = true
        // 开始录音
        recorderManager.start({
          format: 'mp3'
        });
      },
      onTouch (e) {
        this.endY = e.changedTouches[0].clientY
        console.log('ing');
        let factor = (this.endY<this.startY)&&(this.startY-this.endY>50)
        this.notChanged = !factor
        this.isCancel = factor
      },
      finishIt (e) {
        this.notChanged = true
        this.processing = false
        this.endTime = Date.now()
        recorderManager.stop();
        if(this.isCancel){
          return false
        }
        // 处理录音结束事件
        let self = this;
        recorderManager.onStop(function (res) {
            console.log('recorder stop' + JSON.stringify(res));
            self.duration = Number(res.duration/1000).toFixed(1)
            const audioPath = res.tempFilePath;
            innerAudioContext.src = audioPath
            innerAudioContext.play()
            console.log(audioPath)
            let postData = {
              sessionId: self.sessionId,
              memberId: self.memberId,
              length: self.duration,
              messageType: parseInt(self.type)
            }
            uni.uploadFile({
              url: 'https://www.yinaf.net/mobile/user/sendMessage',
              // url: 'http://192.168.1.101:8090/yinaf/mobile/user/sendMessage',
              fileType: 'audio',
              filePath: audioPath,
              name: 'file',
              formData: postData,
              success: e => {
                console.log(e)
              },
              fail: err => {
                console.log(err)
              }
              
            })
        });
      },
      playAudio (e) {
        // const theAudio = uni.createInnerAudioContext()
        console.log(e.voice_url)
        innerAudioContext.src = e.voice_url
        innerAudioContext.play()
        innerAudioContext.onError(err => {
          this.$u.toast(err.errMsg)
          console.log(err)
        })
        
        if (e.read_status === 0) {
          this.setStatus(e)
        }
      },
      setStatus (e) {
        // 设置阅读状态
        const data = {
          sessionId: this.sessionId,
          // groupId: e.group_id,
          mId: item.m_id
        }
        this.$http.post('/mobile/user/setMessagesRecord', data)
        .then(res=>{
          if(res.data.success){
            this.init()
          }
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
.avatar{
  height: 80rpx;
  width: 80rpx;
  border-radius: 50%;
}
.posStyle{
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  left: 50%;
  bottom: 20rpx;
  transform: translate(-50%, 0);
  z-index: 999;
}
.b50vh{
  left: 50%;
  bottom: 50vh;
  border-radius: 20rpx;
  transform: translate(-50%, 0);
  z-index: 999;
}
</style>
