export default {
  // 获取
  async getLocal (key) {
    let result = null
    await uni.getStorage({
      key,
      success (e) {
        result = e.data
      }
    })
    return result
  },
  // 设置用
  setLocal (key, data) {
    uni.setStorage({
      key,
      data
    })
  },
  removeLocal (key) {
    uni.removeStorage({
        key,
        success: function (res) {
            console.log(res);
        }
    });
  },
  clearLocal () {
    uni.clearStorage()
  }
}
