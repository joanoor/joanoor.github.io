/**
 * 月亮
 */

// 满月
export const fullMoonMina = () => {
  const $moon = $("<div class='xt-moon'></div>")
  for (let i = 0; i < 11; i++) {
    const $mooncrater = $("<div class='xt-moon-crater '></div>")
    $mooncrater.addClass('xt-moon-crater-' + (i + 1))
    $moon.append($mooncrater)
  }
  $('.container-bg').append($moon)
}

// 月牙
export const halfMoonMina = () => {
  const $moon = $(
    "<svg t='1610938534319' class='xt-moon2' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2127' xmlns:xlink='http://www.w3.org/1999/xlink' width='64' height='64'><path d='M557.8 727.2c-175-175-175-458.6 0-633.6 10.5-10.5 21.4-20.4 32.6-29.6-113.4 0.9-226.7 44.6-313.3 131.2-175 175-175 458.6 0 633.6 164.5 164.5 425 174.3 600.9 29.6-115.7 0.9-231.8-42.8-320.2-131.2z' p-id='2128' fill='#f6edbd'></path><circle cx='400' cy='200' r='50' fill='#ece1a8'></circle><circle cx='230' cy='500' r='80' fill='#ece1a8'></circle><circle cx='500' cy='800' r='66' fill='#ece1a8'></circle></svg>"
  )
  $('.container-bg').append($moon)
}
