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

  // 夜间晴天（金黄的月牙）
  const $moon2 = $(
    '<svg t="1647575961444" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2465" width="200" height="200"><path d="M466.2784 386.048c-41.9328-115.2-35.0208-236.288 10.0864-340.5312A462.4896 462.4896 0 0 0 397.6704 66.56C158.5152 153.6 35.2256 418.048 122.2656 657.2032s351.488 362.4448 590.592 275.4048c123.9552-45.1072 216.7296-137.8816 265.3184-250.0608-215.8592 37.7856-434.3296-83.3536-511.8976-296.4992z" fill="#FFB612" p-id="2466"></path></svg>'
  )

  // 手绘月亮
  const $moon3 = $(
    '<svg t="1647582971000" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2610" width="200" height="200"><path d="M537.2928 121.7536a293.5808 293.5808 0 0 0-49.7664-6.3488 467.968 467.968 0 0 0-88.2688 5.5296 581.632 581.632 0 0 0-125.8496 37.4784h-0.9216l-4.5056 2.3552a9.5232 9.5232 0 0 0 3.6864 17.92l11.776 0.9216a325.2224 325.2224 0 0 1 153.6 48.7424 299.4176 299.4176 0 0 1 41.8816 31.6416l1.2288 1.3312c33.5872 44.1344 75.1616 86.4256 80.6912 150.1184a284.16 284.16 0 0 1 4.7104 58.5728 321.9456 321.9456 0 0 1-5.3248 51.2v1.024a288.9728 288.9728 0 0 1-51.2 140.8q-8.4992 12.288-18.2272 23.7568C414.1056 785.6128 282.8288 802.0992 163.84 795.648a12.3904 12.3904 0 0 0-10.24 20.48 396.8 396.8 0 0 0 30.72 30.0032A425.3696 425.3696 0 0 0 307.2 911.36a444.0064 444.0064 0 0 0 45.3632 12.5952C481.28 942.08 607.3344 931.84 710.3488 862.4128A375.9104 375.9104 0 0 0 747.52 834.1504a351.1296 351.1296 0 0 0 104.448-153.6 387.9936 387.9936 0 0 0 15.7696-46.3872 393.3184 393.3184 0 0 0 10.24-49.152q2.4576-22.528 2.7648-44.3392t-1.2288-43.008c-9.6256-128.2048-72.6016-256-189.2352-319.2832a437.6576 437.6576 0 0 0-43.2128-22.8352 453.7344 453.7344 0 0 0-44.7488-17.8176 361.0624 361.0624 0 0 0-65.024-15.9744z" fill="#FAB414" p-id="2611"></path><path d="M694.6816 160.5632a865.28 865.28 0 0 0-103.3216-46.8992 363.008 363.008 0 0 0-35.4304-10.24c-141.5168-31.744-309.4528 0.3072-382.976 138.3424 83.968-53.0432 209.5104-31.8464 282.3168 20.48 23.2448 16.7936 52.3264 52.1216 64.1024 58.7776a19.6608 19.6608 0 0 0 23.3472-1.2288 124.416 124.416 0 0 0 25.1904-26.8288c34.9184-45.9776 76.9024-83.1488 112.64-120.5248z" fill="#F15921" p-id="2612"></path><path d="M615.2192 491.52a50.0736 50.0736 0 0 0 47.8208 23.3472 63.2832 63.2832 0 0 0 40.0384-17.92c15.2576-13.4144 5.4272-30.72-11.776-19.8656A63.7952 63.7952 0 0 1 662.4256 491.52 40.3456 40.3456 0 0 1 634.88 478.5152c-13.824-11.264-29.9008-4.4032-19.2512 13.1072zM598.528 609.1776a15.36 15.36 0 0 0 0-30.72 15.36 15.36 0 0 0 0 30.72z" fill="#3A3635" p-id="2613"></path><path d="M497.664 321.1264c4.3008-29.696 46.08-67.584 88.6784-103.3216 53.76-45.056 109.9776-89.2928 150.9376-52.224S634.88 313.1392 576.6144 343.8592 491.52 361.1648 497.664 321.1264zM239.616 228.0448c-7.5776 40.1408-60.0064 68.096-91.5456 25.6-20.992-42.496 32.768-91.5456 78.6432-55.9104a44.032 44.032 0 0 1 12.9024 30.3104z" fill="#136CA8" p-id="2614"></path></svg>'
  )

  $('.container-bg').append($moon)
}
