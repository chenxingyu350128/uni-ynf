<template>
	<view class="page">
		<view class="primary white--text py-2 d-flex flex-column align-center">
      <u-image @click="updateAvatar" width="160" height="160" :src="image" shape="circle"></u-image>
      <view class="mt-2">
        {{isUser?'账号':'成员编号'}} : {{isUser?userName:memberNum}}
      </view>
    </view>
    <u-cell-group v-if="isUser">
      <u-cell-item 
        v-for="(cell, i) in userCells" 
        :key="i" 
        :title="cell.label" 
        :value="cell.name === 'sex' ? genderFilter(cell.key) : cell.key"
        @click="cellClick(cell)"
      >
      </u-cell-item>
    </u-cell-group>
    <u-cell-group v-else>
      <u-cell-item 
        v-for="(cell, i) in memberCells" 
        :key="i" 
        :title="cell.label" 
        :value="cell.name === 'sex' ? genderFilter(cell.key) : cell.key"
        @click="cellClick(cell)"
      >
      </u-cell-item>
    </u-cell-group>
	</view>
</template>

<script>
  let _this = null
	export default {
		data() {
			return {
        isUser: false,
        relatives: [
          {
            rela: '父亲',
            gender: 1
          },
          {
            rela: '母亲',
            gender: 2
          },
          {
            rela: '丈夫',
            gender: 1
          },
          {
            rela: '妻子',
            gender: 2
          },
          {
            rela: '爷爷',
            gender: 1
          },
          {
            rela: '奶奶',
            gender: 2
          },
          {
            rela: '外公',
            gender: 1
          },
          {
            rela: '外婆',
            gender: 2
          },
          {
            rela: '儿子',
            gender: 1
          },
          {
            rela: '女儿',
            gender: 2
          },
          {
            rela: '亲戚',
            gender: 0
          },
          {
            rela: '朋友',
            gender: 0
          },
          {
            rela: '其他',
            gender: 0
          },
          {
            rela: '本人',
            gender: 0
          }
        ]
      };
		},
    computed: {
      member () {
        return this.$store.state.member
      },
      user () {
        return this.$store.state.app
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      realName () {
        return this.$store.state[this.isUser?'app':'member'].realName
      },
      trueName () {
        return this.$store.state['member'].trueName
      },
      memberId () {
        return this.$store.state['member'].memberId
      },
      // nickName () {
      //   return this.$store.state[this.isUser?'app':'member']
      // },
      birthday () {
        return this.$store.state[this.isUser?'app':'member'].birthday
      },
      identity () {
        return this.$store.state['member'].identity
      },
      address () {
        return this.$store.state['member'].address
      },
      sex () {
        return this.$store.state[this.isUser?'app':'member'].sex
      },
      blood () {
        return this.$store.state[this.isUser?'app':'member'].blood
      },
      height () {
        return this.$store.state['member'].height
      },
      weight () {
        return this.$store.state['member'].weight
      },
      phone () {
        return this.$store.state['member'].phone
      },
      rela () {
        return this.$store.state['member'].rela
      },
      domicile () {
        return this.$store.state[this.isUser?'app':'member'].domicile
      },
      mail () {
        return this.$store.state['app'].mail
      },
      occupation () {
        return this.$store.state['app'].occupation
      },
      householdRegister () {
        return this.$store.state['app'].householdRegister
      },
      image () {
        return this.$store.state[this.isUser?'app':'member'].image
      },
      userName () {
        return this.$store.state['app'].userName
      },
      memberNum () {
        return this.$store.state['member'].memberNum
      },
      memberCells() {
        return [
          {
            key: this.realName,
            name: 'realName',
            label: '昵称'
          },
          {
            key: this.trueName,
            name: 'trueName',
            label: '真实姓名'
          },
          {
            key: this.birthday,
            name: 'birthday',
            label: '生日'
          },
          {
            key: this.identity,
            name: 'identity',
            label: '身份证号'
          },
          {
            key: this.address,
            name: 'address',
            label: '家庭住址'
          },
          {
            key: this.sex,
            name: 'sex',
            label: '性别'
          },
          {
            key: this.blood,
            name: 'blood',
            label: '血型'
          },
          {
            key: this.height,
            name: 'height',
            label: '身高'
          },
          {
            key: this.weight,
            name: 'weight',
            label: '体重'
          },
          {
            key: this.phone,
            name: 'phone',
            label: '手机号码'
          },
          {
            key: this.rela,
            name: 'rela',
            label: '与用户关系'
          },
          {
            key: this.domicile,
            name: 'domicile',
            label: '所在地'
          }
        ]
      },
      userCells () {
        return [
        {
          key: this.realName,
          name: 'realName',
          label: '昵称'
        },
        {
          key: this.sex,
          name: 'sex',
          label: '性别'
        },
        {
          key: this.birthday,
          name: 'birthday',
          label: '生日'
        },
        {
          key: this.blood,
          name: 'blood',
          label: '血型'
        },
        {
          key: this.mail,
          name: 'mail',
          label: '邮箱'
        },
        {
          key: this.occupation,
          name: 'occupation',
          label: '职业'
        },
        {
          key: this.householdRegister,
          name: 'householdRegister',
          label: '户籍地'
        },
        {
          key: this.domicile,
          name: 'domicile',
          label: '所在地'
        }
      ]
      } 
    },
    onLoad(e) {
      if (e.isUser) {
        this.isUser = true
      }
      _this = this
    },
    methods: {
      genderFilter (e) {
        const arr = ['未知', '男', '女']
        return arr[e]
      },
      updateAvatar () {
        const that = this
        uni.chooseImage({
          count: 1,
          success: e => {
            console.log(e)
            if (e.errMsg === 'chooseImage:ok') {
              const img = e.tempFiles[0].path
              uni.uploadFile({
                // url: 'http://192.168.1.101:8090/yinaf/mobile/file/fileUpload',
                url: 'http://mobile.yinaf.com/mobile/file/fileUpload',
                filePath: img,
                fileType: 'image',
                name: 'file',
                success: res => {
                  console.log(res)
                  const data = JSON.parse(res.data)
                  if (data.success) {
                    const avatar = data.obj.url
                    that.uploadAvatar(avatar)
                  }
                }
              })
              // const size = e.tempFiles[0].size // 用于图片大小限制
            }
          }
        })
      },
      uploadAvatar (e) {
        const data = {
          sessionId: this.sessionId,
          image: e
        }
        if (!this.isUser) {
          data.memberId = this.memberId
        }
        
        const url = this.isUser ? '/mobile/user/editUser' : '/mobile/user/updateMember'
        this.$http.post(url, data)
          .then(res => {
            if (res.data.success) {
              this.isUser ? uni.$emit('getUser') : this.updateMember()
              this.$u.toast(res.data.msg)
            }
          })
                
      },
      updateMember () {
        uni.$emit('getMemberList')
        uni.$emit('getMember')
      },
      cellClick (e) {
        console.log(e)
        const key = e.name
        const value = e.key
        const label = e.label
        let available = true
        if (key === 'sex' && !this.isUser) { // 用户设置可以改性别 成员设置看请款
          this.relatives.some(res => {
            if (res.gender && this.rela && res.rela === this.rela) {
              const gender = res.gender
              available = !gender
              return true
            }
          })
        }
        if (!available) {
          this.$u.toast('性别已固定，不可更改')
          return false
        }
        uni.navigateTo({
          url: `./modifySingleItem?key=${key}&value=${value}&label=${label}&isUser=${Number(this.isUser)}`
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
