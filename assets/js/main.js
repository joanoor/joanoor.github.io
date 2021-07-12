if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (s) {
      let matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1
    }
}

// Get Scroll position
function getScrollPos() {
  let supportPageOffset = window.pageXOffset !== undefined
  let isCSS1Compat = (document.compatMode || '') === 'CSS1Compat'

  let x = supportPageOffset
    ? window.pageXOffset
    : isCSS1Compat
    ? document.documentElement.scrollLeft
    : document.body.scrollLeft
  let y = supportPageOffset
    ? window.pageYOffset
    : isCSS1Compat
    ? document.documentElement.scrollTop
    : document.body.scrollTop

  return { x: x, y: y }
}

let _scrollTimer = []

// Smooth scroll
function smoothScrollTo(y, time) {
  time = time == undefined ? 500 : time

  let scrollPos = getScrollPos()
  let count = 60
  let length = y - scrollPos.y

  function easeInOut(k) {
    return 0.5 * (Math.sin((k - 0.5) * Math.PI) + 1)
  }

  for (let i = _scrollTimer.length - 1; i >= 0; i--) {
    clearTimeout(_scrollTimer[i])
  }

  for (let i = 0; i <= count; i++) {
    ;(function () {
      let cur = i
      _scrollTimer[cur] = setTimeout(function () {
        window.scrollTo(scrollPos.x, scrollPos.y + length * easeInOut(cur / count))
      }, (time / count) * cur)
    })()
  }
}
