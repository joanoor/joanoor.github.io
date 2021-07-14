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
import { timestampToTim } from './utils'
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

/**
 * 接口数据的调用
 * @param {number | string} lat 纬度
 * @param {number | string} lon 经度
 */
export default function (lat, lon) {
  requestRealWeather(lat, lon)
  requestSunmoon(lat, lon)
}

// 获取日出日落
const requestSunmoon = (lat, lon) => {
  // $.ajax({
  //   url: config.heWeatherSunMoon,
  //   type: 'GET',
  //   data: {
  //     key: config.heKey,
  //     location: lon + ',' + lat,
  //     date: timestampToTime(new Date().getTime())
  //   },
  //   success: function (res) {
  //     if (res.code === '200') {
  //       sunRiseTime = res.sunrise
  //       sunSetTime = res.sunset
  //     } else {
  //       notify('不好意思获取日出日落失败')
  //     }
  //   }
  // })
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
    success: function (res) {
      const { code, now } = res ?? {}
      if (code === '200') {
        new Weather(now)
      }
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
    let weatherClass = ''
    const $el = $('#container-bg')
    const { icon } = data ?? 0
    switch (parseInt(icon)) {
      case 100:
        weatherClass = config.bgWeatherType.FINEDAY
        this.genMinaSun()
        break
      case 101:
      case 102:
      case 103:
        weatherClass = config.bgWeatherType.CLOUDYDAY
        this.genMinaCloud()
        break
      case 104:
      case 154:
        weatherClass = config.bgWeatherType.HEAVYDAY
        this.genMinaMoon()
        this.genMinaHeavy()
        break
      case 150:
        weatherClass = config.bgWeatherType.STARRY
        this.genMinaMoon2()
        this.genMinaStarry()
        break
      case 153:
        weatherClass = config.bgWeatherType.STARRY
        break
      case 300:
      case 301:
      case 302:
      case 303:
      case 304:
      case 305:
      case 306:
      case 307:
      case 308:
      case 309:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 315:
      case 316:
      case 317:
      case 318:
      case 319:
      case 399:
      case 350:
      case 351:
        weatherClass = config.bgWeatherType.HEAVYDAY
        this.genMinaRain()
        break
      case 400:
      case 401:
      case 402:
      case 403:
      case 404:
      case 405:
      case 406:
      case 407:
      case 408:
      case 409:
      case 410:
      case 499:
      case 456:
      case 457:
        this.genMinaSnow()
        break
    }

    $el.addClass(weatherClass)
    this.genMinaWindMill()
  }
}
