const config = window.config

/**
 * 首屏页面的诗
 */
export const setPoerty = () => {
  const len = config.poerties.length
  const index = Math.floor(Math.random() * len)
  const $poerty = $('.poerty')
  $poerty.text(config.poerties[index])
}

/**
 * 页面提示
 * @param str 提示文字
 * @param color 背景颜色
 * @param t 持续事件
 */
export const notify = (str: string, color = 'rgb(60,80,152)', t = 3) => {
  const $el = $(
    `
    <div style="position:fixed;margin:auto;top:0;left:50%;transform:translateX(-50%);padding:0.6em 1em;background-color:${color};color:white">${str}</div>
    `
  )
  $('body').append($el)
  setTimeout(() => {
    $el.remove()
  }, t * 1000)
}
