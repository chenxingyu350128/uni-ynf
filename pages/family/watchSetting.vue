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
