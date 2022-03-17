import dayjs from 'dayjs'

export default function (option: ConfigModule.ClockStyle) {
  const hour = dayjs().format('HH')
  const minute = dayjs().format('mm')
  const seconds = dayjs().format('ss')

  const templateStr = option.timeFormat
    .replace('{HH}', hour)
    .replace('{MM}', minute)
    .replace('{SS}', seconds)
  const $el = $(`#${option.id}`)
  for (const key in option.style) {
    $el.css(key, option.style[key])
  }
  $el.html(templateStr)
  if (option.heartBeat) {
    $el.find('#ch1').fadeTo(800, 0.1)
    $el.find('#ch2').fadeTo(800, 0.1)
  }
}
