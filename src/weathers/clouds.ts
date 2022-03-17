/**
 * 云
 */

// 多云
export const heavyCloudMina = () => {
  for (let i = 0; i < 4; i++) {
    const $cloud2 = $('<div></div>')
    $cloud2.addClass('xt-cloud' + (i + 1) + '' + (i + 1))
    $('.container-bg').append($cloud2)
  }
}

// 乌云
export const darkCloudMina = () => {
  console.log('darkCloudMina')
}

// 白云
export const cloudMina = () => {
  const $cloud1 = $(
    "<div class='xt-cloud1'></div><div class='xt-cloud2'></div>"
  )
  $('.container-bg').append($cloud1)
}
