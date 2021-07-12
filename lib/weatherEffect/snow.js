// in an object so the values can be animated in gsap
const settings = {
  windSpeed: 2,
  rainCount: 0,
  leafCount: 0,
  snowCount: 0,
  cloudHeight: 100,
  cloudSpace: 30,
  cloudArch: 50,
  renewCheck: 10,
  splashBounce: 80
}
var tickCount = 0
var rain = []
var leafs = []
var snow = []

var outerSnowHolder

var weather = [
  { type: 'snow', name: 'Snow' },
  { type: 'wind', name: 'Windy' },
  { type: 'rain', name: 'Rain' },
  { type: 'thunder', name: 'Storms' },
  { type: 'sun', name: 'Sunny' }
]

var clouds

function mina() {
  tickCount++
  var check = tickCount % settings.renewCheck
  if (check) {
    if (snow.length < settings.snowCount) makeSnow()
  }
  requestAnimationFrame(mina)
}

function makeSnow() {
  var scale = 0.5 + Math.random() * 0.5
  var newSnow = outerSnowHolder.circle(0, 0, 5).attr({
    fill: 'white'
  })
  snow.push(newSnow)
  var y = -10
  var endY = window.innerHeight + 10
  var x = 20 + Math.random() * (window.innerWidth - 40)

  gsap.fromTo(
    newSnow.node,
    3 + Math.random() * 5,
    {
      x: x,
      y: y
    },
    {
      y: endY,
      onComplete: onSnowEnd,
      onCompleteParams: [newSnow],
      ease: Power0.easeIn
    }
  )
  gsap.fromTo(newSnow.node, 1, { scale: 0 }, { scale: scale, ease: Power1.easeInOut })
  gsap.to(newSnow.node, {
    duration: 3,
    x: x + (Math.random() * 150 - 75),
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut
  })
  // var snow = []
  // var scale = 0.5 + Math.random() * 0.5
  // var newSnow

  // var x = 20 + Math.random() * (window.innerWidth - 40)
  // var endX // = x - ((Math.random() * (areaX * 2)) - areaX)
  // var y = -10
  // var endY

  // if (scale > 0.8) {
  //   newSnow = outerSnowHolder.circle(0, 0, 5).attr({
  //     fill: 'white',
  //   })
  //   endY = window.innerHeight + 10
  //   y = 100
  //   x = 200
  //   //xBezier = x + (sizes.container.width - sizes.card.offset.left) / 2;
  //   //endX = sizes.container.width + 50;
  // }
}
function onSnowEnd(flake) {
  flake.remove()
  flake = null

  for (var i in snow) {
    if (!snow[i].paper) snow.splice(i, 1)
  }

  if (snow.length < settings.snowCount) {
    makeSnow()
  }
}

function drawCloud(cloud, i) {
  var space = settings.cloudSpace * i
  var height = space + settings.cloudHeight
  var arch = height + settings.cloudArch + Math.random() * settings.cloudArch
  var width = window.innerWidth

  var points = []
  points.push('M' + [-width, 0].join(','))
  // points.push([width, 0].join(','))
  points.push('Q' + [width * 2, height / 2].join(','))
  points.push([width, height].join(','))
  points.push('Q' + [width * 0.5, arch].join(','))
  points.push([0, height].join(','))
  points.push('Q' + [width * -0.5, arch].join(','))
  points.push([-width, height].join(','))
  points.push('Q' + [-(width * 2), height / 2].join(','))
  points.push([-width, 0].join(','))

  var path = points.join(' ')
  console.log('最终的path', path)
  if (!cloud.path) cloud.path = cloud.group.path()
  cloud.path.animate(
    {
      d: path
    },
    0
  )
}

// 雪
// function genMinaSnow () {
export default function () {
  // var count = 10
  // for (var i = 0; i < count; i++) {
  //   var $bigSnow = $("<div class='xt-snow xt-bigsnow-${i + 1}'></div>")
  //   var $mediumSnow = $("<div class='xt-snow xt-mediumsnow-${i + 1}'></div>")
  //   var $smallSnow = $("<div class='xt-snow xt-smallsnow-${i + 1}'></div>")
  //   $('.container-bg').append($bigSnow).append($mediumSnow).append($smallSnow)
  // }

  var $el = $("<div class='container-bg'></div>")
  $el.append(
    $(
      "<svg class='svg-stag' id='svg-stag'><defs><path id='leaf' d='M41.9,56.3l0.1-2.5c0,0,4.6-1.2,5.6-2.2c1-1,3.6-13,12-15.6c9.7-3.1,19.9-2,26.1-2.1c2.7,0-10,23.9-20.5,25 c-7.5,0.8-17.2-5.1-17.2-5.1L41.9,56.3z'/></defs><circle id='sun' style='fill: #F7ED47' cx='0' cy='0' r='50'/><g id='layer3'></g><g id='cloud3' class='cloud'></g><g id='layer2'></g><g id='cloud2' class='cloud'></g><g id='layer1'></g><g id='cloud1' class='cloud'></g></svg>"
    )
  )
  $('.container-wrapper').append($el)
  outerSnowHolder = Snap('#svg-stag')
  gsap.to(settings, { duration: 3, snowCount: 70, ease: Power2.easeInOut })
  clouds = [
    { group: Snap.select('#cloud1') },
    { group: Snap.select('#cloud2') },
    { group: Snap.select('#cloud3') }
  ]
  for (var i = 0; i < clouds.length; i++) {
    clouds[i].offset = Math.random() * window.innerWidth
    drawCloud(clouds[i], i)
  }
  requestAnimationFrame(mina)
}
