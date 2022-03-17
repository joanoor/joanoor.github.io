/* eslint-disable @typescript-eslint/no-explicit-any */

namespace ConfigModule {
  interface ClockStyle {
    id: string
    timeFormat: string
    style: CSSStyleDeclaration
    heartBeat: boolean
  }

  interface BgWeatherType {
    '0': string
    '100': string
    '101': string
    '104': string
    '105': string
    [propName: string]: string
  }

  export interface Config {
    // 腾讯地图key
    txMapKey: string
    // 腾讯接口：通过ip地址获取用户经纬度
    througnIpGetLatLon: string
    // 和风天气key
    qWeatherKey: string
    // 和风天气接口：获取当前天气
    qWeatherNowApi: string
    // 和风天气接口：获取日出日落时间
    qWeatherSunApi: string
    // 和风天气接口：获取月升月落时间
    qWeatherMoonApi: string
    // 和风天气icon地址（嘉拓——阿里云oss）
    qWeatherIconApi: string
    // 获取必应每日图片接口
    bingDailyPicApi: string
    // navigator页面的背景天气类型
    bgWeatherType: BgWeatherType
    // 时间的样式
    clock: ClockStyle
    // 首页的诗句
    poerties: string[]
    [propName: string]: any
  }
}

interface Window {
  readonly config: ConfigModule.Config
  returnCitySN: any
  timer: NodeJS.Timer
}

type Recordable<T = any> = Record<string, T>
