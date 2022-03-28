import { request } from './request'
import type { ThroughIPGetLotLng } from './request'
import { setPoerty } from './utils'
import setClock from './clock'
import initRequestData from './weathers'
const config = window.config

// script标签不加async或者defer，它就会阻塞文档的渲染，等js加载完成，才会继续渲染

/**
 * 通过腾讯地图免费接口https://apis.map.qq.com/ws/location/v1/ip，通过ip地址获取用户经纬度（如果不提供ip，则该接口会默认客户端的ip）
 * 拿到用户经纬度之后，就可以通过调用和风天气公共接口，来执行相关操作
 */
const getUserLatLng = async () => {
  const res = await request<ThroughIPGetLotLng>({
    url: config.througnIpGetLatLon,
    data: {
      key: config.txMapKey,
      output: 'jsonp',
    },
    dataType: 'jsonp',
  })

  if (res.status === 0) {
    const { lat, lng } = res.result.location
    initRequestData(lat, lng)
  }
}

// 脚本加载完成时执行
$(function () {
  getUserLatLng() // 获取经纬度
  setPoerty() // 书写文字
  setClock(config.clock)
  setInterval(() => {
    setClock(config.clock)
  }, 1000)
})

// *******************************
