<template>
	<view>
		<u-cell-group>
		  <u-cell-item @click="cellClick(i)" v-for="(item, i) in list" :key="i" :title="item.title"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
          { title: '成员设置' },
          { title: 'SOS设置' },
          { title: '腕表信息' },
          { title: '通讯录' },
          { title: '闹钟提醒' },
          { title: '运动设置' },
          { title: '睡眠设置' },
          { title: '心率设置' },
          { title: '血压设置' },
          { title: '血糖设置' },
          { title: '定位设置' },
          { title: '关联APP' }
        ]
			};
		},
    methods: {
      cellClick (e) {
        console.log(e)
        const urls = [
          './InformationDetails',
          './sosSetting',
          './watchInfo',
          './AddressBook',
          './alarmAlert',
          './sportSetting',
          './sleepSetting',
          './HrSetting',
          './BpSetting',
          './BsSetting',
          './locationSetting',
          './AssociatedApp',
        ]
        uni.navigateTo({
          url: urls[e]
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
