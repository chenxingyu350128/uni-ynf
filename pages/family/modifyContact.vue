<template>
	<view>
    <u-field 
      v-model="trueName" 
      label="联系人" 
      placeholder="请输入联系人姓名" 
    />  		 
    <u-field 
      v-model="phone" 
      label="联系电话" 
      placeholder="请输入手机号码" 
    />  
    <u-cell-group>
      <u-cell-item @click="showSelect=true" title="关系" :value="rela||relatives[12].value"></u-cell-item>
      <u-cell-item @click="showPicker=true" title="所在区域" :value="region || '请选择'"></u-cell-item>
    </u-cell-group>
    <u-field
      v-model="address" 
      label="详细地址" 
      placeholder="请输入详细地址" 
      type="textarea"
    /> 
    <u-select @confirm="relaConfirm" :default-value="defaultRela" :list="relatives" v-model="showSelect"/>
    <u-picker @confirm="regionConfirm" :default-region="defaultRegion" mode="region" v-model="showPicker"/>
    <view class="pa-4">
      <u-button @click="addContact" type="primary">{{item?'修改':'添加'}}</u-button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emergency: false,
				showSelect: false,
				showPicker: false,
        item: null,
        trueName: '',
        rela: '',
        address: '',
        province: '',
        city: '',
        areas: '',
        phone: '',
        contactsId: '',
        bookId: '',
        relatives: [
          {
            value: '父亲',
            label: '父亲',
            extra: 1
          },
          {
            value: '母亲',
            label: '母亲',
            extra: 2
          },
          {
            value: '丈夫',
            label: '丈夫',
            extra: 1
          },
          {
            value: '妻子',
            label: '妻子',
            extra: 2
          },
          {
            value: '爷爷',
            label: '爷爷',
            extra: 1
          },
          {
            value: '奶奶',
            label: '奶奶',
            extra: 2
          },
          {
            value: '外公',
            label: '外公',
            extra: 1
          },
          {
            value: '外婆',
            label: '外婆',
            extra: 2
          },
          {
            value: '儿子',
            label: '儿子',
            extra: 1
          },
          {
            value: '女儿',
            label: '女儿',
            extra: 2
          },
          {
            value: '亲戚',
            label: '亲戚',
            extra: 0
          },
          {
            value: '朋友',
            label: '朋友',
            extra: 0
          },
          {
            value: '其他',
            label: '其他',
            extra: 0
          },
          {
            value: '本人',
            label: '本人',
            extra: 0
          }
        ]
			};
		},
    computed: {
      sessionId () {
        return this.$store.state.app.sessionId
      },
      region () {
        if (this.province && this.city && this.areas) {
          return this.province + '-' + this.city + '-' + this.areas
        } else {
          return ''
        }
      },
      memberId: {
        get: function () {
          return this.$store.state.member.memberId
        },
        set: function () {}
      },
      defaultRela () {
        let result = 12
        this.relatives.forEach((res, i) => {
          if (res.value == this.rela) {
            result = i
          }
        })
        return [result]
      },
      defaultRegion () {
        let result = []
        if (this.province && this.city && this.province) {
          result = [this.province, this.city, this.areas]
        } 
        return result
      }
    },
    onLoad(e) {
      console.log(e)
      if (e.emergency) {
        this.emergency = true
      }
      if (e.item)  {
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
      relaConfirm (e) {
        console.log(e)
        this.rela = e[0].value
      },
      regionConfirm (e) {
        console.log(e)
        this.province = e.province.label
        this.city = e.city.label
        this.areas = e.area.label
      },
      addContact () {
        console.log('cvv')
        if (!this.trueName) {
          this.$u.toast('姓名不得为空')
          return false
        }
        if (!this.phone) {
          this.$u.toast('手机号不得为空')
          return false
        }
        if (!this.region || this.region.split('-').length !== 3) {
          this.$u.toast('请选择所在区域')
          return false
        }
        if (!this.address) {
          this.$u.toast('详细地址不得为空')
          return false
        }
        
        const data = {
          sessionId: this.sessionId,
          trueName: this.trueName,
          phone: this.phone,
          address: this.address,
          province: this.province,
          city: this.city,
          areas: this.areas,
          rela: this.rela || relatives[12].value,
        }
        let url = ''
        if (this.emergency) {
          url = this.item ? '/mobile/user/editContacts' : '/mobile/user/addContacts'
          if (this.contactsId) {
            data.contactsId = this.contactsId
          } else {
            data.memberId = this.memberId
          }
        } else {
          url = this.item ? '/mobile/user/editBooks' : '/mobile/user/addBooks'
          if (this.bookId) {
            data.bookId = this.bookId
          } else {
            data.memberId = this.memberId
          }
        }
        console.log(data, url)
        this.$http.post(url, data)
          .then(res => {
            if (res.data.success) {
              this.$u.toast(res.data.msg)
              uni.navigateBack()
            }
          })
      },
    }
	}
</script>

<style lang="scss">

</style>
