window.config = {
  heKey: 'bd593d99e47f4943adbeabb9b8ccc9f1', // 和风天气
  key: 'CDDBZ-FBNH2-XCYUZ-CB74S-PK35F-4ABJK', // 腾讯地图
  heWeatherNow: 'https://devapi.heweather.net/v7/weather/now',
  heWeatherSunMoon: 'https://devapi.qweather.com/v7/astronomy/sunmoon',
  weatherIcon:
    'https://jtbank.oss-cn-qingdao.aliyuncs.com/image/%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86/weather',
  bingPic: 'https://res.abeim.cn/api-bing_img',
  bgWeatherType: {
    CLOUDYDAY: 'xt-cloudday', // 白天，多云的背景
    HEAVYDAY: 'xt-heavyday', // 白天，阴的背景
    FINEDAY: 'xt-fineday', // 晴天，万里无云时的背景
    STARRY: 'xt-starry', // 晴天夜晚星空的背景
    NIGHT: 'xt-night' // 晴天夜晚（没有星星）的背景
  },
  clock: {
    id: 'time',
    timeFormat: '{HH}<span id="ch1">:</span>{MM}<span id="ch2">:</span>{SS}',
    css: {
      fontSize: '',
      color: '',
      background: '',
      fontWeight: '',
      fontFamily: 'Microsoft JhengHei, Century gothic, Arial'
    },
    bShowHeartBeat: false,
    bAmPm: false
  },
  poerties: [
    'Talk is cheap. Show me the code',
    'Stay hungry, Stay foolish',
    'Any application that can be written in JavaScript, will eventually be written in JavaScript',
    'The sooner you start to code, the longer the program will take',
    "If it ain't broke, don't fix it",
    'Programming is like sex: one mistake and you’re providing support for a lifetime'
  ]
}
