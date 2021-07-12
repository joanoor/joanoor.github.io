(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/clock.js":
/*!**********************!*\
  !*** ./lib/clock.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getDD = function getDD(num) {
  return num >= 10 ? num : '0' + num;
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(option) {
  var time = new Date();
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();
  var ampm = '';

  if (option.bAmPm) {
    if (h > 12) {
      h = h - 12;
      ampm = ' PM';
    } else {
      ampm = ' AM';
    }
  }

  var templateStr = option.timeFormat + ampm;
  templateStr = templateStr.replace('{HH}', getDD(h)).replace('{MM}', getDD(m)).replace('{SS}', getDD(s));
  var obj = $("#".concat(option.id));

  for (var item in option.css) {
    obj.css(item, option.css[item]);
  }

  obj.html(templateStr);

  if (option.bShowHeartBeat) {
    obj.find('#ch1').fadeTo(800, 0.1);
    obj.find('#ch2').fadeTo(800, 0.1);
  }
}

/***/ }),

/***/ "./lib/eventAction.js":
/*!****************************!*\
  !*** ./lib/eventAction.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__($) {
  $('.assistant').click(function () {
    // console.log('点击我了')
    gsap.fromTo('.assistant-content', {
      display: 'block',
      duration: 4,
      y: '23em'
    }, {
      display: 'block'
    });
  });
}

/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setPoerty": () => (/* binding */ setPoerty),
/* harmony export */   "timestampToTime": () => (/* binding */ timestampToTime),
/* harmony export */   "autoImport": () => (/* binding */ autoImport)
/* harmony export */ });
;

(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})(); // set poerty


var setPoerty = function setPoerty() {
  var len = window.config.poerties.length;
  var index = parseInt(Math.random() * len);
  var $poerty = $('.poerty');
  $poerty.text(window.config.poerties[index]);
}; // convert timestamp

var timestampToTime = function timestampToTime(timestamp) {
  var date = '';

  if (timestamp.length < 13) {
    date = new Date(timestamp * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  } else {
    date = new Date(timestamp);
  }

  var Y = date.getFullYear();
  var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return Y + M + D;
}; // generate notify

function notify(str, color, t) {
  console.log('执行');

  if (!color) {
    color = 'rgb(60, 80, 152)';
  }

  if (!t) {
    t = 3;
  }

  var $el = $("<div style='position:fixed;margin:auto;top:0;left:50%;transform:translateX(-50%);padding:0.6em 1em;background-color:" + color + ";color:white'>" + str + '</div>');
  $('body').append($el);
  setTimeout(function () {
    $el.remove();
  }, t * 1000);
}

var autoImport = function autoImport(files) {
  var ignores = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['index'];
  var funcObj = {};

  try {
    files.keys().forEach(function (fileName) {
      var pluginName = fileName.split('/').pop().replace(/\.\w+$/, '');

      if (ignores.indexOf(pluginName) === -1) {
        var jsConfig = files(fileName);
        funcObj[pluginName] = jsConfig["default"];
      }
    });
  } catch (err) {
    console.error("\u51FA\u9519\u4E86 ".concat(err));
  }

  return funcObj;
};

/***/ }),

/***/ "./lib/weather.js":
/*!************************!*\
  !*** ./lib/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./lib/utils.js");
/* harmony import */ var _weatherEffect_clouds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherEffect/clouds */ "./lib/weatherEffect/clouds.js");
/* harmony import */ var _weatherEffect_fog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weatherEffect/fog */ "./lib/weatherEffect/fog.js");
/* harmony import */ var _weatherEffect_meteor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./weatherEffect/meteor */ "./lib/weatherEffect/meteor.js");
/* harmony import */ var _weatherEffect_moon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./weatherEffect/moon */ "./lib/weatherEffect/moon.js");
/* harmony import */ var _weatherEffect_rain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./weatherEffect/rain */ "./lib/weatherEffect/rain.js");
/* harmony import */ var _weatherEffect_starry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./weatherEffect/starry */ "./lib/weatherEffect/starry.js");
/* harmony import */ var _weatherEffect_sun__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./weatherEffect/sun */ "./lib/weatherEffect/sun.js");
/* harmony import */ var _weatherEffect_windmill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./weatherEffect/windmill */ "./lib/weatherEffect/windmill.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 该文件存放的是天气以及动画效果
 * 1.白云
 * 2.乌云
 * 3.太阳
 * 4.月亮（圆月）
 * 5.月亮（月牙）
 * 6.下雨
 * 7.下雪
 * 8.夜晚星空
 * 9.流星
 * 10.风车
 * 11.起雾
 */








 // import { genMinaCloud, genMinaHeavy } from './weatherEffect/clouds'
// import { genMinaFog } from './weatherEffect/fog'
// import { genMinaMeteor } from './weatherEffect/meteor'
// import { genMinaMoon, gemMinaMoon2 } from './weatherEffect/moon'
// import { genMinaRain } from './weatherEffect/rain'
// import { genMinaStarry } from './weatherEffect/starry'
// import { genMinaSun } from './weatherEffect/sun'
// import { genMinaWind } from './weatherEffect/windmill'

var modules = Object.assign({}, _weatherEffect_clouds__WEBPACK_IMPORTED_MODULE_1__, _weatherEffect_fog__WEBPACK_IMPORTED_MODULE_2__, _weatherEffect_meteor__WEBPACK_IMPORTED_MODULE_3__, _weatherEffect_moon__WEBPACK_IMPORTED_MODULE_4__, _weatherEffect_rain__WEBPACK_IMPORTED_MODULE_5__, _weatherEffect_starry__WEBPACK_IMPORTED_MODULE_6__, _weatherEffect_sun__WEBPACK_IMPORTED_MODULE_7__, _weatherEffect_windmill__WEBPACK_IMPORTED_MODULE_8__);
var config = window.config;
/**
 * 接口数据的调用
 * @param {number | string} lat 纬度
 * @param {number | string} lon 经度
 */

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(lat, lon) {
  requestRealWeather(lat, lon);
  requestSunmoon(lat, lon);
} // 获取日出日落

var requestSunmoon = function requestSunmoon(lat, lon) {// $.ajax({
  //   url: config.heWeatherSunMoon,
  //   type: 'GET',
  //   data: {
  //     key: config.heKey,
  //     location: lon + ',' + lat,
  //     date: timestampToTime(new Date().getTime())
  //   },
  //   success: function (res) {
  //     if (res.code === '200') {
  //       sunRiseTime = res.sunrise
  //       sunSetTime = res.sunset
  //     } else {
  //       notify('不好意思获取日出日落失败')
  //     }
  //   }
  // })
}; // 获取实时天气


var requestRealWeather = function requestRealWeather(lat, lon) {
  $.ajax({
    url: config.heWeatherNow,
    type: 'GET',
    data: {
      key: config.heKey,
      location: lon + ',' + lat
    },
    success: function success(res) {
      var _ref = res !== null && res !== void 0 ? res : {},
          code = _ref.code,
          now = _ref.now;

      if (code === '200') {
        new Weather(now);
      }
    }
  });
};

var Weather = /*#__PURE__*/function () {
  function Weather(data) {
    _classCallCheck(this, Weather);

    for (var funcName in modules) {
      this[funcName] = modules[funcName];
    }

    this.initWeatherMina(data);
  }

  _createClass(Weather, [{
    key: "initWeatherMina",
    value: function initWeatherMina(data) {
      var weatherClass = '';
      var $el = $('#container-bg');

      var _ref2 = data !== null && data !== void 0 ? data : 0,
          icon = _ref2.icon;

      switch (parseInt(icon)) {
        case 100:
          weatherClass = config.bgWeatherType.FINEDAY;
          console.log('object', weatherClass);
          this.genMinaSun();
          break;

        case 101:
        case 102:
        case 103:
          weatherClass = config.bgWeatherType.CLOUDYDAY;
          this.genMinaCloud();
          break;

        case 104:
        case 154:
          weatherClass = config.bgWeatherType.HEAVYDAY;
          this.genMinaMoon();
          this.genMinaHeavy();
          break;

        case 150:
          weatherClass = config.bgWeatherType.STARRY;
          this.genMinaMoon2();
          this.genMinaStarry();
          break;

        case 153:
          weatherClass = config.bgWeatherType.STARRY;
          break;

        case 300:
        case 301:
        case 302:
        case 303:
        case 304:
        case 305:
        case 306:
        case 307:
        case 308:
        case 309:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 315:
        case 316:
        case 317:
        case 318:
        case 319:
        case 399:
        case 350:
        case 351:
          weatherClass = config.bgWeatherType.HEAVYDAY;
          this.genMinaRain();
          break;

        case 400:
        case 401:
        case 402:
        case 403:
        case 404:
        case 405:
        case 406:
        case 407:
        case 408:
        case 409:
        case 410:
        case 499:
        case 456:
        case 457:
          this.genMinaSnow();
          break;
      }

      $el.addClass(weatherClass);
      this.genMinaWind(); // setPoerty()
    }
  }]);

  return Weather;
}(); // // set animate
// function createNINA(now) {
//   genMinaWind()
//   switch (parseInt(now.icon)) {
//     case 101:
//       break
//     case 104:
//     case 154:
//       genMinaMoon2()
//       // genMinaHeavy(now.precip)
//       genMinaStarry()
//       break
//   }
// }

/***/ }),

/***/ "./lib/weatherEffect/clouds.js":
/*!*************************************!*\
  !*** ./lib/weatherEffect/clouds.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genMinaCloud": () => (/* binding */ genMinaCloud),
/* harmony export */   "genMinaHeavy": () => (/* binding */ genMinaHeavy)
/* harmony export */ });
// 白云
var genMinaCloud = function genMinaCloud() {
  var $cloud1 = $("<div class='xt-cloud1'></div><div class='xt-cloud2'></div>");
  $('.container-bg').append($cloud1);
}; // 乌云

var genMinaHeavy = function genMinaHeavy(precip) {
  for (var i = 0; i < 4; i++) {
    var $cloud2 = $('<div></div>');
    $cloud2.addClass('xt-cloud' + (i + 1) + '' + (i + 1));
    $('.container-bg').append($cloud2);
  }
};

/***/ }),

/***/ "./lib/weatherEffect/fog.js":
/*!**********************************!*\
  !*** ./lib/weatherEffect/fog.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genMinaFog": () => (/* binding */ genMinaFog)
/* harmony export */ });
// 雾
var genMinaFog = function genMinaFog() {
  var $fog = $("<div class='xt-fog-container'><div class='xt-fog-img xt-fog-img-first'></div><div class='xt-fog-img xt-fog-img-second'></div></div>");
  $('.container-bg').append($fog);
};

/***/ }),

/***/ "./lib/weatherEffect/meteor.js":
/*!*************************************!*\
  !*** ./lib/weatherEffect/meteor.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genMinaMeteor": () => (/* binding */ genMinaMeteor)
/* harmony export */ });
// 流星
var genMinaMeteor = function genMinaMeteor() {
  for (var i = 0; i < 3; i++) {
    var $meteor = $("<div class='xt-star2'></div>");

    if (i === 1) {
      $meteor.addClass('xt-star2-second');
    } else if (i === 2) {
      $meteor.addClass('xt-star2-third');
    }

    $meteor.css({
      top: Math.random() * 10,
      left: Math.random() * 200 + 200
    });
    $('.container-bg').append($meteor);
  }
};

/***/ }),

/***/ "./lib/weatherEffect/moon.js":
/*!***********************************!*\
  !*** ./lib/weatherEffect/moon.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genMinaMoon": () => (/* binding */ genMinaMoon),
/* harmony export */   "genMinaMoon2": () => (/* binding */ genMinaMoon2)
/* harmony export */ });
// 月亮（圆月）
var genMinaMoon = function genMinaMoon() {
  var $moon = $("<div class='xt-moon'></div>");

  for (var i = 0; i < 11; i++) {
    var $mooncrater = $("<div class='xt-moon-crater '></div>");
    $mooncrater.addClass('xt-moon-crater-' + (i + 1));
    $moon.append($mooncrater);
  }

  $('.container-bg').append($moon);
}; // 月亮（月牙）

var genMinaMoon2 = function genMinaMoon2() {
  var $moon = $("<svg t='1610938534319' class='xt-moon2' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2127' xmlns:xlink='http://www.w3.org/1999/xlink' width='64' height='64'><path d='M557.8 727.2c-175-175-175-458.6 0-633.6 10.5-10.5 21.4-20.4 32.6-29.6-113.4 0.9-226.7 44.6-313.3 131.2-175 175-175 458.6 0 633.6 164.5 164.5 425 174.3 600.9 29.6-115.7 0.9-231.8-42.8-320.2-131.2z' p-id='2128' fill='#f6edbd'></path><circle cx='400' cy='200' r='50' fill='#ece1a8'></circle><circle cx='230' cy='500' r='80' fill='#ece1a8'></circle><circle cx='500' cy='800' r='66' fill='#ece1a8'></circle></svg>");
  $('.container-bg').append($moon);
};

/***/ }),

/***/ "./lib/weatherEffect/rain.js":
/*!***********************************!*\
  !*** ./lib/weatherEffect/rain.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genMinaRain": () => (/* binding */ genMinaRain)
/* harmony export */ });
// 雨
var genMinaRain = function genMinaRain() {// var counter = 50
  // for (var i = 0; i < counter; i++) {
  //   var $hr = $('<hr />')
  //   if (i == counter - 1) {
  //     $hr.addClass('xt-weather-thunder')
  //   } else {
  //     $hr.css({
  //       left: Math.floor(Math.random() * window.innerWidth - 50) + 'px',
  //       animationDuration: 0.8 + Math.random() * 0.3 + 's',
  //       animationDelay: Math.random() * 5 + 's',
  //     })
  //   }
  // $('.container-bg').append($hr)
  // }
};

/***/ }),

/***/ "./lib/weatherEffect/starry.js":
/*!*************************************!*\
  !*** ./lib/weatherEffect/starry.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genMinaStarry": () => (/* binding */ genMinaStarry)
/* harmony export */ });
// 星空
var genMinaStarry = function genMinaStarry() {
  $('.container-bg').append("<div class='xt-stars'></div>");
  var stars = 800;
  /*星星的密集程度，数字越大越多*/

  var $stars = $('.xt-stars');
  var r = 1000;
  /*星星的看起来的距离,值越大越远,可自行调制到自己满意的样子*/

  for (var i = 0; i < stars; i++) {
    var $star = $('<div/>').addClass('xt-star');
    $stars.append($star);
  }

  $('.xt-star').each(function () {
    var cur = $(this);
    var s = 0.2 + Math.random() * 1;
    var curR = r + Math.random() * 300;
    cur.css({
      transformOrigin: '0 0 ' + curR + 'px',
      transform: ' translate3d(0,0,-' + curR + 'px) rotateY(' + Math.random() * 360 + 'deg) rotateX(' + Math.random() * -50 + 'deg) scale(' + s + ',' + s + ')'
    });
  });
};

/***/ }),

/***/ "./lib/weatherEffect/sun.js":
/*!**********************************!*\
  !*** ./lib/weatherEffect/sun.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genMinaSun": () => (/* binding */ genMinaSun)
/* harmony export */ });
// 太阳
var genMinaSun = function genMinaSun() {
  var $sun = $("<div class='xt-sun xt-weather-zindex100'></div>");
  $('.container-bg').append($sun);
};

/***/ }),

/***/ "./lib/weatherEffect/windmill.js":
/*!***************************************!*\
  !*** ./lib/weatherEffect/windmill.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genMinaWind": () => (/* binding */ genMinaWind)
/* harmony export */ });
// 风车
var genMinaWind = function genMinaWind() {
  var $wind = $("\n      <div class='xt-windmill-wrapper'>\n      <div class='xt-windmill-pole-wrap'>\n        <div class='xt-windmill-pole'>\n        </div>\n      </div>\n      <div class='xt-windmill-pole-ellipses'>\n        <div class='xt-windmill-pole-ellipses-wrapper'>\n          <div class='xt-windmill-pole-ellipses-wrap'>\n            <div class='xt-windmill-pole-ellipses-center'></div>\n            <div class='ellipses'>\n              <span></span>\n              <span></span>\n              <span></span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class='xt-windmill-pole-wrap right'>\n        <div class='xt-windmill-pole'></div>\n      </div>\n      <div class='xt-windmill-pole-ellipses right'>\n        <div class='xt-windmill-pole-ellipses-wrapper'>\n          <div class='xt-windmill-pole-ellipses-wrap'>\n            <div class='xt-windmill-pole-ellipses-center'></div>\n            <div class='ellipses delayed'>\n              <span></span>\n              <span></span>\n              <span></span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class='xt-windmill-pole-wrap back-left'>\n        <div class='xt-windmill-pole'></div>\n      </div>\n      <div class='xt-windmill-pole-ellipses back-left'>\n        <div class='xt-windmill-pole-ellipses-wrapper'>\n          <div class='xt-windmill-pole-ellipses-wrap'>\n            <div class='xt-windmill-pole-ellipses-center'></div>\n            <div class='ellipses delayed'>\n              <span></span>\n              <span></span>\n              <span></span>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    ");
  $('.container-bg').append($wind);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ "./lib/weather.js");
/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clock */ "./lib/clock.js");
/* harmony import */ var _eventAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventAction */ "./lib/eventAction.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./lib/utils.js");



 // alert(returnCitySN['cip']+returnCitySN['cname']) // sohu接口通过script标签引入之后的数据
// script标签不加async或者defer，它就会阻塞文档的渲染，等js加载完成，才会继续渲染

var sohuApproUserIp = window.returnCitySN['cip'];
var througnIpGetLatLon = "http://ip-api.com/json/".concat(sohuApproUserIp, "?fields=61439&lang=zh-CN"); // 浏览器原生能力——>获取用户经纬度

var getUserLocation = function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      timeout: 3000
    });
  } else {
    console.error('您的浏览器不支持Geolocation');
    handleError();
  }
}; // 浏览器获取用户经纬度成功


function handleSuccess(pos) {
  var _pos$coords = pos.coords,
      latitude = _pos$coords.latitude,
      longitude = _pos$coords.longitude;
  (0,_weather__WEBPACK_IMPORTED_MODULE_0__.default)(latitude, longitude);
} // 浏览器无法获取用户经纬度


function handleError() {
  // 通过ip地址获取用户的经纬度，使用的是国外的接口
  $.ajax({
    url: througnIpGetLatLon,
    type: 'GET',
    success: function success(res) {
      var lat = res.lat,
          lon = res.lon;
      (0,_weather__WEBPACK_IMPORTED_MODULE_0__.default)(lat, lon);
    }
  });
}

$(document).ready(function () {
  getUserLocation();
  (0,_utils__WEBPACK_IMPORTED_MODULE_3__.setPoerty)();
  (0,_eventAction__WEBPACK_IMPORTED_MODULE_2__.default)($);
  (0,_clock__WEBPACK_IMPORTED_MODULE_1__.default)(config.clock);
  window.timer = setInterval(function () {
    (0,_clock__WEBPACK_IMPORTED_MODULE_1__.default)(config.clock);
  }, 1000);
});
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map