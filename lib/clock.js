const getDD = (num) => {
  return num >= 10 ? num : '0' + num
}

export default function (option) {
  const time = new Date()
  let h = time.getHours()
  let m = time.getMinutes()
  let s = time.getSeconds()
  let ampm = ''
  if (option.bAmPm) {
    if (h > 12) {
      h = h - 12
      ampm = ' PM'
    } else {
      ampm = ' AM'
    }
  }

  let templateStr = option.timeFormat + ampm
  templateStr = templateStr
    .replace('{HH}', getDD(h))
    .replace('{MM}', getDD(m))
    .replace('{SS}', getDD(s))
  const obj = $(`#${option.id}`)
  for (const item in option.css) {
    obj.css(item, option.css[item])
  }
  obj.html(templateStr)

  if (option.bShowHeartBeat) {
    obj.find('#ch1').fadeTo(800, 0.1)
    obj.find('#ch2').fadeTo(800, 0.1)
  }
}
