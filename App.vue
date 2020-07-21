<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
  /* 导入iconfont uview组件也能用 */
  @import "./static/css/iconfont.css";
  @import "./common/vuetify.min.css";
  .nowrap{
    white-space: nowrap;
  }
  .full-width{
    width: 100%;
    box-sizing: border-box;
  }
  .full-size{
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
  .border-box{
    box-sizing: border-box;
  }
  .posAbs{
    position: absolute!important;
  }
  .posFix{
    position: fixed!important;
  }
  .posRela{
    position: relative;
  }
  .posSticky{
    position: sticky;
    top: 0;
  }
  .zIndexHigh{
    z-index: 999;
  }
  .borderBox{
    box-sizing: border-box;
  }
  .r0{
    right: 0;
  }
  .t0{
    top: 0;
  }
  .b0{
    bottom: 0;
  }
  .b-radius0{
    border-radius: 0!important;
  }
</style>
