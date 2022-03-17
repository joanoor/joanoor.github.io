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

import { formatTime } from 'ivy2'
import { http } from '../request'
import { notify } from '../utils'
import * as clouds from './clouds'
import * as fog from './fog'
import * as meteor from './meteor'
import * as moon from './moon'
import * as rain from './rain'
import * as starry from './starry'
import * as sun from './sun'
import * as windmill from './windmill'
import dayjs from 'dayjs'

const modules = Object.assign(
  {},
  clouds,
  fog,
  meteor,
  moon,
  rain,
  starry,
  sun,
  windmill
)
const config = window.config

let isDay = false // 是否白天
const isNight = false // 是否夜晚
let isMoonRise = false // 月亮是否升起

interface NowApiResponse {
  code: string
  fxLink: string
  now: Now
  updateTime: string
  [propName: string]: any
}

interface Now {
  cloud: string
  dew: string
  feelsLike: string
  humidity: string
  icon: string
  obsTime: string
  precip: string
  pressure: string
  temp: string
  text: string
  vis: string
  wind360: string
  windDir: string
  windScale: string
  windSpeed: string
  [propName: string]: string
}

// 获取实时天气
const requestRealWeather = async (lat: number, lon: number) => {
  const res = await http.get<Promise<NowApiResponse>>({
    url: config.qWeatherNowApi,
    data: {
      key: config.qWeatherKey,
      location: lon + ',' + lat,
    },
  })

  const { code, now } = res
  if (code === '200') {
    new Weather(now)
  } else {
    notify('获取实时天气失败')
  }
}

// 获取日出日落
const requestSunStatus = async (lat: number, lon: number) => {
  const res = await http.get({
    url: config.qWeatherSunApi,
    data: {
      key: config.qWeatherKey,
      location: lon + ',' + lat,
      date: formatTime(undefined, 'YYYYMMDD'),
    },
  })

  const { code, sunrise, sunset } = res
  if (code === '200') {
    const nowTime = dayjs().valueOf()
    const sunRiseTime = dayjs(sunrise).valueOf()
    const sunSetTime = dayjs(sunset).valueOf()
    if (nowTime < sunSetTime && nowTime > sunRiseTime) {
      isDay = true
    } else {
      isDay = false
    }
  } else {
    notify('获取日出日落失败')
  }
}

// 获取月升月落
const requestMoonStatus = async (lat: number, lon: number) => {
  const res = await http.get({
    url: config.qWeatherMoonApi,
    data: {
      key: config.qWeatherKey,
      location: lon + ',' + lat,
      date: formatTime(undefined, 'YYYYMMDD'),
    },
  })
  const { code, moonrise, moonset } = res
  if (code === '200') {
    const nowTime = dayjs().valueOf()
    const MoonRiseTime = dayjs(moonrise).valueOf()
    const MoonSetTime = dayjs(moonset).valueOf()
    if (nowTime < MoonSetTime && nowTime > MoonRiseTime) {
      isMoonRise = true
    } else {
      isMoonRise = false
    }
  } else {
    notify('获取月升月落失败')
  }
}

abstract class ABWeather {
  abstract sunMina(): void
  abstract fullMoonMina(): void
  abstract halfMoonMina(): void
  abstract meteorMina(): void
  abstract starryMina(): void
  abstract heavyCloudMina(): void
  abstract darkCloudMina(): void
  abstract cloudMina(): void
  abstract heavyRainMina(): void
  abstract rainMina(): void
  abstract heavySnowMina(): void
  abstract snowMina(): void
  abstract windMillMina(): void
}

class Weather extends ABWeather {
  constructor(data: Now) {
    super()
    this.initWeatherMina(data)
  }
  sunMina = modules['sunMina']
  fullMoonMina = modules['fullMoonMina']
  halfMoonMina = modules['halfMoonMina']
  meteorMina = modules['meteorMina']
  starryMina = modules['starryMina']
  heavyCloudMina = modules['heavyCloudMina']
  darkCloudMina = modules['darkCloudMina']
  cloudMina = modules['cloudMina']
  heavyRainMina = modules['heavyRainMina']
  rainMina = modules['rainMina']
  heavySnowMina = modules['heavySnowMina']
  snowMina = modules['snowMina']
  windMillMina = modules['windMillMina']

  // 初始化天气
  initWeatherMina(data: Now) {
    const $el = $('#container-bg')
    const { icon } = data ?? '0'
    $el.addClass(window.config.bgWeatherType[icon])
    this.startMina(icon)
    this.windMillMina()
  }

  // 开始执行天气动画效果
  startMina(icon: string) {
    const newIcon = parseInt(icon)
    ;[100].indexOf(newIcon) > -1
      ? this.sunMina()
      : [101, 102, 103].indexOf(newIcon) > -1
      ? this.cloudMina()
      : [104, 154].indexOf(newIcon) > -1
      ? (() => {
          this.fullMoonMina()
          this.heavyRainMina()
        })()
      : [150].indexOf(newIcon) > -1
      ? (() => {
          this.halfMoonMina()
          this.starryMina()
        })()
      : [400, 401, 402, 403].indexOf(newIcon) > -1
      ? this.rainMina()
      : this.snowMina()
  }
}

export default function (lat: number, lon: number) {
  requestRealWeather(lat, lon)
  requestSunStatus(lat, lon)
  requestMoonStatus(lat, lon)
}
