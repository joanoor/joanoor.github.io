import { notify, setPoerty } from './utils'
import setClock from './clock'
import initRequestData from './weathers'
import { http } from './request'
const config = window.config

// alert(returnCitySN['cip']+returnCitySN['cname']) // sohu接口通过script标签引入之后的数据
// script标签不加async或者defer，它就会阻塞文档的渲染，等js加载完成，才会继续渲染

// 浏览器获取用户经纬度成功时执行
const handleSuccess: PositionCallback = pos => {
  console.log('成功！执行这里...')
  const { latitude, longitude } = pos.coords
  console.log('经纬度', latitude, longitude)
  initRequestData(latitude, longitude)
}

// 浏览器获取用户经纬度失败时执行
const handleError: PositionErrorCallback = (
  error: GeolocationPositionError
) => {
  console.log('失败，执行这里...')
  const { message } = error
  notify(message)
  throughIpGetLatLon()
}

const throughIpGetLatLon = async () => {
  const sohuApproUserIp = window.returnCitySN['cip']
  const res = await http.get<{
    result: {
      location: {
        lat: number
        lng: number
      }
    }
  }>({
    url: config.througnIpGetLatLon,
    data: {
      key: config.txMapKey,
      // ip: sohuApproUserIp, // 如果没有，则默认使用客户端的ip
    },
  })
  const { lat, lng } = res.result.location
  console.log('sohu的呢', sohuApproUserIp)
  initRequestData(lat, lng)
}

/**
 * 浏览器原生能力——>获取用户经纬度
 * 1、首先执行浏览器原生能力，如果浏览器拥有此原生能力并且能执行成功，则可以直接获取用户的经纬度（跳过2、3步）
 * 2、否则，通过调用sohu的免费公共接口http://pv.sohu.com/cityjson?ie=utf-8，来先获取当前用户的的ip地址
 * 3、再通过腾讯地图免费接口https://apis.map.qq.com/ws/location/v1/ip，通过ip地址获取用户经纬度
 * 4、拿到用户经纬度之后，就可以通过调用和风天气公共接口，来执行相关操作
 */
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout: 3000,
    })
  } else {
    console.error('您的浏览器不支持Geolocation')
    throughIpGetLatLon()
  }
}

// 脚本加载完成时执行
$(function () {
  getUserLocation() // 获取经纬度
  setPoerty() // 书写文字
  setClock(config.clock)
  setInterval(() => {
    setClock(config.clock)
  }, 1000)
})
