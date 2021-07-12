import initRequestData from './weather'
import setClock from './clock'
import eventAction from './eventAction'
import { setPoerty } from './utils'
// alert(returnCitySN['cip']+returnCitySN['cname']) // sohu接口通过script标签引入之后的数据
// script标签不加async或者defer，它就会阻塞文档的渲染，等js加载完成，才会继续渲染
const sohuApproUserIp = window.returnCitySN['cip']
const througnIpGetLatLon = `http://ip-api.com/json/${sohuApproUserIp}?fields=61439&lang=zh-CN`

// 浏览器原生能力——>获取用户经纬度
const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout: 3000
    })
  } else {
    console.error('您的浏览器不支持Geolocation')
    handleError()
  }
}

// 浏览器获取用户经纬度成功
function handleSuccess(pos) {
  const { latitude, longitude } = pos.coords
  initRequestData(latitude, longitude)
}

// 浏览器无法获取用户经纬度
function handleError() {
  // 通过ip地址获取用户的经纬度，使用的是国外的接口
  $.ajax({
    url: througnIpGetLatLon,
    type: 'GET',
    success: function (res) {
      const { lat, lon } = res
      initRequestData(lat, lon)
    }
  })
}

$(document).ready(function () {
  getUserLocation()
  setPoerty()
  eventAction($)
  setClock(config.clock)
  window.timer = setInterval(() => {
    setClock(config.clock)
  }, 1000)
})
