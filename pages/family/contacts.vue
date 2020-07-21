<template>
	<view class="page">
		<view class="text-right">
       <u-swipe-action 
       :show="item.show" 
        v-for="(item, index) in memberList" 
       :index="index" 
        :key="index" 
        @click="click" 
        @open="open"
        :options="item.isLead?options1:options0"
       >
        <view @click="turnMember(item)" class="d-flex px-6 py-3 align-center">
          <u-image shape="circle" height="80" width="80" :src="item.image"></u-image>
          <!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
          <view class="d-flex flex-column ml-4 text-left">
            <text>{{ item.realName }}</text>
            <text class="mt-2">{{ item.rela }}</text>
          </view>
          <view class="flex-fill d-flex align-center justify-end">
           <view class="d-inline-flex circle-border my-auto">
              <text class="primary--text ma-auto">{{item.isLead?'主':'副'}}</text>
            </view>          
          </view>

        </view>
       </u-swipe-action>
    </view>
    <!-- 可转让联系人 -->
    <u-popup v-model="showRelaMembers" :mask-close-able="false" mode="center">
      <view class="white pa-4">
        <view 
          v-for="(item, idx) in assoUser"
          :key="idx"
          class="d-flex flex-column"
        >
          <view @click="radioChange(idx)" class="d-flex align-center my-2">
            <u-image shape="circle" height="60" width="60" :src="item.image" mode=""></u-image>
            <text class="mx-2">{{item.rela}}</text>
            <text class="flex-fill">{{item.relaName}}</text>
            <u-icon size="50" :color="idx===radioValue?'#00aaef':'#ccc'" :name="idx===radioValue?'check-circle-outline':'circle'" customPrefix="mdi"></u-icon>
          </view>
        </view>
        <view>
          <u-button size="medium" type="error" plain @click="showRelaMembers=false">取消</u-button>
          <text class="ml-2"></text>
          <u-button @click="transferMethod" size="medium" type="primary">确定</u-button>
        </view>
      </view>
    </u-popup>
    <u-popup v-model="showNumberInput" :mask-close-able="false" mode="center">
      <!-- 绑定 -->
      <view v-if="BindContact" class="px-4 pb-4">
        <text class="d-flex py-2 primary--text font-weight-bold title justify-center">绑定联系人</text>
        <u-field 
         v-model="memberNum" 
         :border-top="true"
         :focus="true"
         label="用户编码"
         placeholder="请填写用户编码" 
         required 
        />   
        <text class="d-flex py-2 px-4 caption primary--text">以下条件，至少填写一项</text>
        <u-field
         v-model="realName" 
         :border-top="true"
         :focus="true"
         label="真实姓名"
         placeholder="请填写成员真实姓名" 
        /> 
        <u-field
         v-model="phone" 
         :border-top="true"
         :focus="true"
         label="手机号码"
         placeholder="请输入成员手机号码" 
        /> 
        <u-field
         v-model="idCard" 
         :border-top="true"
         :focus="true"
         label="身份证号"
         placeholder="请输入成员身份证号" 
        /> 
        <view class="d-flex justify-end mt-2">
          <u-button size="mini" type="error" plain @click="showNumberInput=false">取消</u-button>
          <text class="ml-2"></text>
          <u-button @click="commitForm" size="mini" type="primary">确定</u-button>
        </view>         
      </view>
      <!-- 添加 -->
      <view v-else class="px-4 pb-4"> 
        <text class="d-flex py-2 primary--text font-weight-bold title justify-center">添加联系人</text>
        <u-field 
         v-model="memberNum" 
         :border-top="true"
         :focus="true"
         label="用户编码"
         placeholder="请填写用户编码" 
         required 
        />   
        <view class="d-flex justify-end mt-2">
          <u-button size="mini" type="error" plain @click="showNumberInput=false">取消</u-button>
          <text class="ml-2"></text>
          <u-button @click="commitForm" size="mini" type="primary">确定</u-button>
        </view>                
      </view>
    </u-popup>
    <u-action-sheet @click="actionSheetClick" :list="bsList" v-model="showBS"></u-action-sheet>
    <view @click="showBS=true" class="posFix b0 full-width">
      <u-line color="grey" />
      <view class="py-2 d-flex align-center justify-center primary--text">
        <u-icon size="60" name="plus-circle"></u-icon>
        <text class="ml-4">添加联系人</text>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        bsList: [
          {
            text: '扫二维码添加联系人',
            color: '#00aaef',
            fontSize: 28
          },
          {
            text: '手动添加联系人',
            color: '#00aaef',
            fontSize: 28
          },
          {
            text: '绑定联系人',
            color: '#00aaef',
            fontSize: 28
          },
          {
            text: '创建新成员',
            color: '#dd524d',
            fontSize: 28
          }
        ],
        assoUser: [], // 转让的成员列表
        showRelaMembers: false, // 显示转让成员
        showBS: false, // show bottomSheet
        radioValue: 0,
        options0: [
          {
            text: '删除',
            style: {
              backgroundColor: '#dd524d'
            }
          }
        ],
        options1: [
          {
            text: '转让',
            style: {
              backgroundColor: '#007aff'
            }
          },
          {
            text: '删除',
            style: {
              backgroundColor: '#dd524d'
            }
          }
        ],
        showNumberInput: false,
        memberNum: '',
        realName: '',
        phone: '',
        idCard: '',
        deleteData: null,
        showModal: false,
        BindContact: false
      }
		},
    computed: {
      memberList () {
        const arr = this.$store.state.app.memberList
        let arrs = []
        if (arr && arr.length) {
          arrs = arr
        }
        arrs.forEach(res => {
          this.$set(res, 'show', false)
        })
        return arrs
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      userId () {
        return this.$store.state.app.userId
      },
      memberId () {
        return this.$store.state.member.memberId
      }
    },
		methods: {
      radioChange (e) {
        console.log(e)
        this.radioValue = e
      },
      turnMember (e) {
        console.log(e)
        const memberId = e.memberId
        this.$store.commit('SET_MEMBER_ITEM', ['memberId', memberId])
        uni.navigateBack()
      },
      commitForm () {
        this.showNumberInput = false
        if (this.BindContact) { // 绑定
          if (!this.memberNum) {
            this.$u.toast('请输入用户编码')
            return false
          }
          if (!this.realName && !this.phone && !this.idCard) {
            this.$u.toast('姓名、手机号、身份证号至少填一项')
            return false
          }
          const data = {
            memberNum: this.memberNum,
            sessionId: this.sessionId,
            userId: this.userId,
            trueName: this.realName,
            phone: this.phone,
            idCard: this.idCard
          }
          this.$http.post('/mobile/user/boundMember', data)
            .then(res => {
              if (res.data.success) {
                this.$u.toast(res.data.msg)
              }
            })
        } else { // 添加
          
          if (!this.memberNum) {
            this.$u.toast('请输入用户编码')
            return  false
          }
          const data = {
            sessionId: this.sessionId,
            memberNum: this.memberNum
          }
          this.$http.get('/mobile/healthy/getEwmMember', data)
            .then(res => {
              if (res.data.success) {
                const memberId = res.data.obj.memberId
                const data = {
                  memberId,
                  sessionId: this.sessionId
                }
                this.$http.post('/mobile/healthy/addEwmMember', data)
                  .then(res => {
                    if (res.data.success) {
                      uni.$emit('getMemberList')
                      this.$u.toast('添加成功')
                    }
                  })
              }
            })
        }
      },
      actionSheetClick (e) {
        console.log(e)
        if (e === 1 || e === 2) {
          this.BindContact = e === 2
          this.showNumberInput = true
        } else if (e === 3) {
          uni.navigateTo({
            url: './addNewMember'
          })
        } else {
          uni.$emit('scanCode', 1)
        }
      },
			click(i, index) {
        // console.log(index, index1)
        const memberId = this.memberList[i].memberId
        const isLead = this.memberList[i].isLead
        const data = {
          sessionId: this.sessionId,
          memberId
        }
        const status = index===1 || (index===0 && !isLead)
        status ? this.deleteMember(data) : this.transfer(data)
			},
      deleteMember (data) {
        uni.showModal({
          title: '删除联系人',
          cancelColor: '#f00',
          content: '删除后该成员的数据将被清空，此操作不可恢复',
          success: res => {
            if (res.confirm) {
              this.$http.post('/mobile/user/delMemberOrUser', data)
              .then(res=>{
                if(res.data.success){
                  // this.getMemberList()
                  uni.$emit('getMemberList')
                  this.$u.toast('删除成功！')
                }
              })                
            }
          }
        })
      },
      transfer (data) {
        uni.showModal({
          title: '权限转让',
          cancelColor: '#f00',
          content: '转让后你将失去对该成员的相关操作权限，请谨慎操作，如查询相关权限请查看使用帮助',
          success: res => {
            if (res.confirm) {
              this.$http.get('/mobile/user/userAppList', data)
                .then(res=>{
                  if(res.data.success){
                    this.assoUser = res.data.obj
                    this.showRelaMembers = !!this.assoUser.length
                  }
                })               
            }
          }
        })
      },
      transferMethod () {
        this.showRelaMembers = false
        const data = {
          memberId: this.memberId,
          sessionId: this.sessionId,
          userId: this.assoUser[this.radioValue].userId
        }
        this.$http.post('/mobile/healthy/editAssignment',data).then(res=>{
          if(res.data.success){
            uni.$emit('getMemberList')
            this.$u.toast(res.data.msg)
            this.radioValue = 0
          }
        })        
      },
      // getMemberList () {
      //   this.$http.get('/mobile/user/getMemberList', { sessionId: this.sessionId })
      //     .then(res => {
      //       if (res.data.success) {
      //         this.$store.commit('SET_SINGLE_ITEM', res.data.obj)
      //       }
      //     })
      // },
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
        
        this.memberList.forEach((res, i) => {
          this.$set(res, 'show', i===index)
        })
			}      
		}
	}
</script>

<style lang="scss" scoped>
.circle-border{
  width: 53rpx;
  height: 53rpx;
  border-radius: 50%;
  border: 1px solid #00aaef;
}
</style>
