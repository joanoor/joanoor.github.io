/**
 * 该文件存放的是天气以及动画效果
 * 1.白云
 * 2.乌云
 * 3.太阳
 * 4.月亮（圆月）
 * 5.月亮（月牙）
 * 6.下雨
 * 7.下雪
 * 8.夜晚星空
 * 9.流星
 * 10.风车
 * 11.起雾
 */
import { notify } from './utils'
import * as clouds from './weatherEffect/clouds'
import * as fog from './weatherEffect/fog'
import * as meteor from './weatherEffect/meteor'
import * as moon from './weatherEffect/moon'
import * as rain from './weatherEffect/rain'
import * as starry from './weatherEffect/starry'
import * as sun from './weatherEffect/sun'
import * as windmill from './weatherEffect/windmill'
// import { genMinaCloud, genMinaHeavy } from './weatherEffect/clouds'
// import { genMinaFog } from './weatherEffect/fog'
// import { genMinaMeteor } from './weatherEffect/meteor'
// import { genMinaMoon, gemMinaMoon2 } from './weatherEffect/moon'
// import { genMinaRain } from './weatherEffect/rain'
// import { genMinaStarry } from './weatherEffect/starry'
// import { genMinaSun } from './weatherEffect/sun'
// import { genMinaWind } from './weatherEffect/windmill'

const modules = Object.assign({}, clouds, fog, meteor, moon, rain, starry, sun, windmill)
const config = window.config

var isDay = false // 是否白天
var isMoonRise = false // 月亮是否升起

/**
 * 接口数据的调用
 * @param {number | string} lat 纬度
 * @param {number | string} lon 经度
 */
export default function (lat, lon) {
  requestRealWeather(lat, lon)
  requestSun(lat, lon)
  requestMoon(lat, lon)
}

// 获取实时天气
const requestRealWeather = (lat, lon) => {
  $.ajax({
    url: config.heWeatherNow,
    type: 'GET',
    data: {
      key: config.heKey,
      location: lon + ',' + lat
    },
    success: (res) => {
      const { code, now } = res ?? {}
      if (code === '200') {
        new Weather(now)
      } else {
        notify('获取实时天气失败')
      }
    },
    error: () => {
      console.log('实时天气接口出错了！')
    }
  })
}

// 获取日出日落
const requestSun = (lat, lon) => {
  $.ajax({
    url: config.heWeatherSun,
    type: 'GET',
    data: {
      key: config.heKey,
      location: lon + ',' + lat,
      date: window.dayjs().format('YYYYMMDD')
    },
    success: (res) => {
      const { code, sunrise, sunset } = res
      if (code === '200') {
        const nowTime = window.dayjs().valueOf()
        const sunRiseTime = window.dayjs(sunrise).valueOf()
        const sunSetTime = window.dayjs(sunset).valueOf()
        if (nowTime < sunSetTime && nowTime > sunRiseTime) {
          isDay = true
        } else {
          isDay = false
        }
      } else {
        notify('获取日出日落失败')
      }
    },
    error: () => {
      console.log('日出日落接口出错了！')
    }
  })
}

// 获取月升月落
const requestMoon = (lat, lon) => {
  $.ajax({
    url: config.heWeatherMoon,
    type: 'GET',
    data: {
      key: config.heKey,
      location: lon + ',' + lat,
      date: window.dayjs().format('YYYYMMDD')
    },
    success: (res) => {
      const { code, moonrise, moonset } = res
      if (code === '200') {
        const nowTime = window.dayjs().valueOf()
        const MoonRiseTime = window.dayjs(moonrise).valueOf()
        const MoonSetTime = window.dayjs(moonset).valueOf()
        if (nowTime < MoonSetTime && nowTime > MoonRiseTime) {
          isMoonRise = true
        } else {
          isMoonRise = false
        }
      } else {
        notify('获取月升月落失败')
      }
    },
    error: () => {
      console.log('月升月落接口出错了！')
    }
  })
}

class Weather {
  constructor(data) {
    for (const funcName in modules) {
      this[funcName] = modules[funcName]
    }
    this.initWeatherMina(data)
  }
  initWeatherMina(data) {
    const $el = $('#container-bg')
    const { icon } = data ?? '0'
    $el.addClass(config.bgWeatherType[icon])
    this.startMina(icon) // 开始动画
    this.genMinaWindMill()
  }
  startMina(icon) {
    const newIcon = parseInt(icon)
    ;[100].indexOf(newIcon) > -1
      ? this.genMinaSun()
      : [101, 102, 103].indexOf(newIcon) > -1
      ? this.genMinaCloud()
      : [104, 154].indexOf(newIcon) > -1
      ? (() => {
          this.genMinaMoon()
          this.genMinaHeavy()
        })()
      : [150].indexOf(newIcon) > -1
      ? (() => {
          this.genMinaMoon2()
          this.genMinaStarry()
        })()
      : [400, 401, 402, 403].indexOf(newIcon) > -1
      ? this.genMinaRain()
      : this.genMinaSnow()
  }
}
