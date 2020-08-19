// 防抖： 对于短时间内连续触发的事件， 防抖的含义就是让某个时间期限内的事件处理函数，只处理一次。
function debounce (fun, delay) {
  let timer = null
  if (timer) {
    clearTimeout(timer)
  }
  setTimeout(fun, delay)
}

// 节流 让函数执行一次，在某个时间段内暂时失效，过了这段时间再重新激活
function throttle (fun, delay) {
  let valid = true
  return function () {
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(() => {
      fun()
      valid = true
    }, delay)
  }
}

 export {debounce, throttle}