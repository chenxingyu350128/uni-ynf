export default {
  // 获取
  getLocal (key) {
    let result = null
    uni.getStorage({
      key,
      success (e) {
        console.log(e)
        result = e.data
      },
      fail (e) {
        console.log(key)
        console.log(e)
      }
    })
    console.log('result:', result)
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
