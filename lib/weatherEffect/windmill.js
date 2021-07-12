// 风车
export const genMinaWind = () => {
  const $wind = $(
    `
      <div class='xt-windmill-wrapper'>
      <div class='xt-windmill-pole-wrap'>
        <div class='xt-windmill-pole'>
        </div>
      </div>
      <div class='xt-windmill-pole-ellipses'>
        <div class='xt-windmill-pole-ellipses-wrapper'>
          <div class='xt-windmill-pole-ellipses-wrap'>
            <div class='xt-windmill-pole-ellipses-center'></div>
            <div class='ellipses'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div class='xt-windmill-pole-wrap right'>
        <div class='xt-windmill-pole'></div>
      </div>
      <div class='xt-windmill-pole-ellipses right'>
        <div class='xt-windmill-pole-ellipses-wrapper'>
          <div class='xt-windmill-pole-ellipses-wrap'>
            <div class='xt-windmill-pole-ellipses-center'></div>
            <div class='ellipses delayed'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div class='xt-windmill-pole-wrap back-left'>
        <div class='xt-windmill-pole'></div>
      </div>
      <div class='xt-windmill-pole-ellipses back-left'>
        <div class='xt-windmill-pole-ellipses-wrapper'>
          <div class='xt-windmill-pole-ellipses-wrap'>
            <div class='xt-windmill-pole-ellipses-center'></div>
            <div class='ellipses delayed'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  )
  $('.container-bg').append($wind)
}
