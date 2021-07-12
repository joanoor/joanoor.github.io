// 白云
export const genMinaCloud = () => {
  var $cloud1 = $("<div class='xt-cloud1'></div><div class='xt-cloud2'></div>")
  $('.container-bg').append($cloud1)
}

// 乌云
export const genMinaHeavy = (precip) => {
  for (var i = 0; i < 4; i++) {
    var $cloud2 = $('<div></div>')
    $cloud2.addClass('xt-cloud' + (i + 1) + '' + (i + 1))
    $('.container-bg').append($cloud2)
  }
}
