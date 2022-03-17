/**
 * 星空，满天繁星
 */
export const starryMina = () => {
  $('.container-bg').append("<div class='xt-stars'></div>")
  const stars = 800 /*星星的密集程度，数字越大越多*/
  const $stars = $('.xt-stars')
  const r = 1000 /*星星的看起来的距离,值越大越远,可自行调制到自己满意的样子*/
  for (let i = 0; i < stars; i++) {
    const $star = $('<div/>').addClass('xt-star')
    $stars.append($star)
  }
  $('.xt-star').each(function () {
    const cur = $(this)
    const s = 0.2 + Math.random() * 1
    const curR = r + Math.random() * 300
    cur.css({
      transformOrigin: '0 0 ' + curR + 'px',
      transform:
        ' translate3d(0,0,-' +
        curR +
        'px) rotateY(' +
        Math.random() * 360 +
        'deg) rotateX(' +
        Math.random() * -50 +
        'deg) scale(' +
        s +
        ',' +
        s +
        ')',
    })
  })
}
