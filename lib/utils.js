;(function () {
  var lastTime = 0
  var vendors = ['webkit', 'moz']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
})()

// set poerty
export const setPoerty = () => {
  const len = window.config.poerties.length
  const index = parseInt(Math.random() * len)
  const $poerty = $('.poerty')
  $poerty.text(window.config.poerties[index])
}

// convert timestamp
export const timestampToTime = (timestamp) => {
  var date = ''
  if (timestamp.length < 13) {
    date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  } else {
    date = new Date(timestamp)
  }
  var Y = date.getFullYear()
  var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return Y + M + D
}

// generate notify
export const notify = (str, color, t) => {
  if (!color) {
    color = 'rgb(60, 80, 152)'
  }
  if (!t) {
    t = 3
  }
  var $el = $(
    "<div style='position:fixed;margin:auto;top:0;left:50%;transform:translateX(-50%);padding:0.6em 1em;background-color:" +
      color +
      ";color:white'>" +
      str +
      '</div>'
  )
  $('body').append($el)
  setTimeout(() => {
    $el.remove()
  }, t * 1000)
}

export const autoImport = (files, ignores = ['index']) => {
  const funcObj = {}
  try {
    files.keys().forEach((fileName) => {
      const pluginName = fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
      if (ignores.indexOf(pluginName) === -1) {
        const jsConfig = files(fileName)
        funcObj[pluginName] = jsConfig.default
      }
    })
  } catch (err) {
    console.error(`出错了 ${err}`)
  }
  return funcObj
}
