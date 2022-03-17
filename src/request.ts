/* eslint-disable @typescript-eslint/no-explicit-any */
interface Params {
  url: string
  type?: 'GET' | 'POST'
  dataType?: 'json' | 'jsonp'
  headers?: Recordable
  data: Recordable
}

interface ThroughIPGetLotLng {
  message: string
  status: number
  result: {
    ad_info: Recordable
    ip: string
    location: {
      lat: number
      lng: number
    }
  }
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
interface NowApiResponse {
  code: string
  fxLink: string
  now: Now
  updateTime: string
  [propName: string]: any
}

interface Sun {
  code: string
  fxLink: string
  sunrise: string
  sunset: string
  updateTime: string
  [propName: string]: any
}

interface MoonPhase {
  fxTime: string
  icon: string
  illumination: string
  name: string
  value: string
}

interface Moon {
  code: string
  fxLink: string
  moonrise: string
  moonset: string
  updateTime: string
  moonPhase: MoonPhase[]
  [propName: string]: any
}

const request = <T>(params: Params) => {
  return new Promise<T>((resolve, reject) => {
    $.ajax({
      url: params.url,
      type: params.type || 'GET',
      dataType: params.dataType || 'json',
      headers: params.headers || {},
      data: params.data || {},
      success: function (res) {
        resolve(res)
      },
      error: function (err) {
        reject(err)
      },
    })
  })
}

export type { ThroughIPGetLotLng, NowApiResponse, Now, Sun, Moon }
export { request }
