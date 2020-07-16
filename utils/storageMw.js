export default {
  // 获取
  getLocal (key) {
    
    return uni.getStorageSync(key)
  },
  // 设置用
  setLocal (key, data) {
    uni.setStorageSync(key, data)
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
    uni.clearStorageSync()
  }
}
