// 雾
export const genMinaFog = () => {
  var $fog = $(
    "<div class='xt-fog-container'><div class='xt-fog-img xt-fog-img-first'></div><div class='xt-fog-img xt-fog-img-second'></div></div>"
  )
  $('.container-bg').append($fog)
}
