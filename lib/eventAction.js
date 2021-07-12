export default function ($) {
  $('.assistant').click(() => {
    // console.log('点击我了')
    gsap.fromTo(
      '.assistant-content',
      {
        display: 'block',
        duration: 4,
        y: '23em'
      },
      {
        display: 'block'
      }
    )
  })
}
