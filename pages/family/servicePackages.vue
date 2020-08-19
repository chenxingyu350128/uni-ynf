<template>
	<view class="body-2">
		<view class="px-4 py-2 grey lighten-3 grey--text subtitle-1">到期时间</view>
    <u-cell-group>
      <u-cell-item title="设备IMEI" :value="imei" :arrow="false"></u-cell-item>
      <u-cell-item title="电话号码" :value="phone" :arrow="false"></u-cell-item>
      <u-cell-item title="套餐到期时间" :value="baseEndTime" :arrow="false"></u-cell-item>
    </u-cell-group>
		<view class="px-4 py-2 grey lighten-3 grey--text subtitle-1">服务续费</view>
    <u-cell-group>
      <u-cell-item @click="showSelect=true" title="服务时长" :value="serviceDuration" :arrow="false">
        <u-icon slot="right-icon" name="arrow-down-fill"></u-icon>
      </u-cell-item>
      <u-cell-item title="到期时间" :value="newEndTime" :arrow="false"></u-cell-item>
      <u-cell-item title="套餐" value="标准套餐" :arrow="false"></u-cell-item>
      <u-cell-item title="服务费" value="1元/天" :arrow="false"></u-cell-item>
      <u-cell-item title="合计" :value="price" :arrow="false"></u-cell-item>
    </u-cell-group>
		<view class="px-4 py-2 grey lighten-3 grey--text subtitle-1">功能描述</view>
    <view class="px-4 py-2">
      健康报告、数据监测、健康管理、健康饮食
    </view>
    <view class="posFix b0 full-width">
      <u-button @click="createOrder" :custom-style="customStyle" type="primary">生成订单</u-button>
    </view>
    <u-select 
      @confirm="selectConfirm" 
      :list="packages" 
      v-model="showSelect"
      :default-value="[index]"
    />
	</view>
</template>

<script>
	export default {
		data() {
			return {
        customStyle: {
          'border-radius': 'unset',
          background: '#00aaef',
          color: '#fff'
        }, 
        endTime: "",
        imei: "",
        phone: "",
        index: 4,
        goodsNum: 720,
        showSelect: false,
        serviceDuration: '两年（24x30天）',
        packages: [
          {
            label: '一个月（30天）',
            value: 30
          },
          {
            label: '三个月（3x30天）',
            value: 90
          },
          {
            label: '半年（6x30天）',
            value: 180
          },
          {
            label: '一年（12x30天）',
            value: 360
          },
          {
            label: '两年（24x30天）',
            value: 720
          },
        ]
			}
		},
    computed: {
      memberId () {
        return this.$store.state.member.memberId
      },
      sessionId () {
        return this.$store.state.app.sessionId
      },
      // serviceDuration () {
      //   return this.packages[this.index].label
      // },
      price () {
        return this.packages[this.index].value + '元'
      },
      baseEndTime () {
        return this.endTime || this.$u.timeFormat(new Date(), 'yyyy-mm-dd')
      },
      newEndTime () {
        const arr = this.baseEndTime.split('-')
        console.log(arr)
        const numArr = arr.map(res => parseInt(res))
        let [y, m, d] = numArr
        switch (this.goodsNum) {
          case 30:
            // m < 12 ? m++ : m=1 y++; 
            if (m===12) {
              m = 1
              y++
            } else {
              m++
            }
            break;
          case 90:
            if (m < 9) {
              m += 3
            } else {
              m = (m + 3) % 12
              y++
            }
            // m < 9 ? m += 3 : m=(m+3)%12 y++; 
            break;
          case 180:
            // m < 6 ? m += 6 : m=(m+6)%12 y++; 
            if (m < 6) {
              m += 6
            } else {
              m = (m + 6) % 12
              y++
            }
            break;
          case 360:
            y++
            break;
          case 720:
            y += 2
            break;
        }
        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d : d
        return `${y}-${m}-${d}`
      },
    },
    onShow() {
      this.init()
    },
    methods: {
      init () {
        const data = {
          sessionId: this.sessionId,
          memberId: this.memberId
        }
        this.$http.get('/mobile/healthy/getPackageInfo', data)
          .then(res => {
            if (res.data.success) {
              const obj = res.data.obj
              for (const x in obj) {
                this[x] = obj[x]
              }
            }
          })
      },
      async createOrder () {
        const current = Date.parse(this.$u.timeFormat(new Date(), 'yyyy-mm-dd'))
        const base = Date.parse(this.baseEndTime)
        // 套餐未到期,提醒
        if (current < base) {
          uni.showModal({
            title: '续费提醒',
            content: '您的套餐还未到期，确认续费吗？',
            cancelColor: '#f00',
            success: result => {
              if (result.confirm) {
                this.realCreateOrder()
              }
            }
          })
          return false
        }
        this.realCreateOrder()
        
      },
      // 接口返回的package参数有问题，提示去app支付
      realCreateOrder () {
        this.$u.toast('套餐购买，请前往颐纳福APP')
      },
      // async realCreateOrder () {
      //   const data = {
      //     sessionId: this.sessionId,
      //     memberId: this.memberId,
      //     goodsNum: this.goodsNum,
      //     payWay: 1
      //   }
      //   const res = await this.$http.post('/mobile/healthy/addPackageOrder', data)
      //   if (res.data.success) {
      //     const obj = res.data.obj
      //     const result = await uni.getProvider({
      //           service: 'payment'
      //         })
      //     if (result[1].errMsg === 'getProvider:ok') {
      //       const provider = result[1].provider[0]
      //       const timeStamp = obj.timestamp
      //       const nonceStr = obj.noncestr
      //       const packages = obj.package
      //       const paySign = obj.sign
      //       uni.requestPayment({
      //         provider,
      //         timeStamp,
      //         nonceStr,
      //         package: packages,
      //         signType: 'MD5',
      //         paySign,
      //         success: function (e) {
      //           console.log(JSON.stringify(e))
      //         },
      //         fail: function (err) {
      //           console.log(JSON.stringify(err))
      //         }
      //       })
      //     }  
      //   }
      // },
      selectConfirm (e) {
        console.log(e)
        this.serviceDuration = e[0].label
        this.goodsNum = e[0].value
      }
    }
	}
</script>

<style lang="scss">

</style>
