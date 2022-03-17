window.config = {
  txMapKey: 'CDDBZ-FBNH2-XCYUZ-CB74S-PK35F-4ABJK',
  througnIpGetLatLon: 'https://apis.map.qq.com/ws/location/v1/ip',
  qWeatherKey: 'bd593d99e47f4943adbeabb9b8ccc9f1',
  qWeatherNowApi: 'https://devapi.heweather.net/v7/weather/now',
  qWeatherSunApi: 'https://devapi.qweather.com/v7/astronomy/sun',
  qWeatherMoonApi: 'https://devapi.qweather.com/v7/astronomy/moon',
  qWeatherIconApi:
    'https://jtbank.oss-cn-qingdao.aliyuncs.com/image/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86/weather',
  bingDailyPicApi: 'https://res.abeim.cn/api-bing_img',
  // 首页背景类名
  bgWeatherType: {
    101: 'xt-cloudday', // 白天，多云的背景
    104: 'xt-heavyday', // 白天，阴的背景
    100: 'xt-fineday', // 晴天，万里无云时的背景
    150: 'xt-starry', // 晴天夜晚星空的背景
    0: 'xt-night', // 晴天夜晚（没有星星）的背景
  },
  // 控制时钟的样式
  clock: {
    id: 'time',
    timeFormat: '{HH}<span id="ch1">:</span>{MM}<span id="ch2">:</span>{SS}',
    style: {
      fontSize: '',
      color: '',
      background: '',
      fontWeight: '',
      fontFamily: 'Microsoft JhengHei, Century gothic, Arial',
    },
    heartBeat: false,
  },
  poerties: [
    'Talk is cheap. Show me the code',
    'Stay hungry, Stay foolish',
    'Any application that can be written in JavaScript, will eventually be written in JavaScript',
    'The sooner you start to code, the longer the program will take',
    "If it ain't broke, don't fix it",
    'Programming is like sex: one mistake and you’re providing support for a lifetime',
  ],
}
