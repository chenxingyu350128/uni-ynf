<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
.nowrap{
  white-space: nowrap;
}
.full-width{
  width: 100%;
}
.flexFill{
  flex: 1
}
.posRela{
  position: relative!important;
}
.posAbs{
  position: absolute!important;
}
.posFixed{
  position: fixed!important;
}
.border-flat{
  border-radius: unset!important;
}
</style>
