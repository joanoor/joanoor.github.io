/**
 * 流星
 */

export const meteorMina = () => {
  for (let i = 0; i < 3; i++) {
    const $meteor = $("<div class='xt-star2'></div>")
    if (i === 1) {
      $meteor.addClass('xt-star2-second')
    } else if (i === 2) {
      $meteor.addClass('xt-star2-third')
    }
    $meteor.css({
      top: Math.random() * 10,
      left: Math.random() * 200 + 200,
    })
    $('.container-bg').append($meteor)
  }
}
