import config from './config.json'
// import Styles from './app.sass'
// import Content from './content/index'
import STATE from './state'
import start from './startApp'
import layout from './layout'
import debounce from './functions/debounce'

let loadCounter = 0
const maxLoad = 50
let Content = null

function checkForContent () {
  if (window._dt1206satellitesmokescrubber) {
    Content = window._dt1206satellitesmokescrubber
    start()

    const { appContainer } = STATE
    appContainer.innerHTML = layout()
    appContainer.style.maxWidth = '650px'
    appContainer.style.margin = '0 auto'
    appContainer.style.position = 'relative'

    const slider = appContainer.querySelector('[data-type="input_slider"]')
    const playButton = appContainer.querySelector('[data-type="input_autoplay"]')
    const slides = Array.from(appContainer.querySelectorAll('[data-type="slide"]'))
    let scrub = false
    let autoPlayTimer = null
    const autoplayDelay = 0.75


    function setHeight() {
      // const { ratio } = Content.parts[0].img.ImgData
      // const images = appContainer.querySelectorAll('img')
      const wrapper = appContainer.querySelector('[data-type="slideswrapper"]')
      // const { height } = images[0].getBoundingClientRect()
      // console.log(images[0].naturalHeight)
      // wrapper.style.height = `${(wrapper.offsetWidth * 0) + 100}px`
      // wrapper.style.border = 'solid 1px red'
    }



    function setActiveSlide(imageToShow) {
      slides.forEach((slide, i) => { slide.style.opacity = i === imageToShow ? 1 : 0 })
    }

    function setSliderPosition(activeIndex) {
      slider.value = (100 / (slides.length - 1)) * activeIndex
    }

    const getActiveIndex = val => Math.round((slides.length - 1) * (val / 100))

    function handleSlider() {
      if (!scrub) return
      const { value } = this
      const imageToShow = Math.round((slides.length - 1) * (value / 100))
      setActiveSlide(imageToShow)
    }

    function handleEndSwipe() {
      setSliderPosition(getActiveIndex(slider.value))
      scrub = false
    }

    let activeIndex = 0

    function updateAutoSlide() {
      setActiveSlide(activeIndex)
      setSliderPosition(activeIndex)
      activeIndex = activeIndex === (slides.length - 1) ? 0 : activeIndex + 1
    }

    function handleAutoPlay() {
      const status = this.getAttribute('data-active')
      activeIndex = 0
      if (status !== 'true') {
        this.value = 'Stop'
        // call update function immediately to prevent delay in first frame...
        updateAutoSlide()
        // ...then set inteval updater
        autoPlayTimer = setInterval(updateAutoSlide, autoplayDelay * 1000)
      } else {
        clearInterval(autoPlayTimer)
        this.value = 'Start auto play'
      }
      this.setAttribute('data-active', status !== 'true')
    }

    slider.addEventListener('mousedown', () => { scrub = true })
    slider.addEventListener('touchstart', () => { scrub = true })
    slider.addEventListener('mousemove', debounce(handleSlider))
    slider.addEventListener('touchmove', debounce(handleSlider))
    appContainer.addEventListener('mouseup', handleEndSwipe)
    appContainer.addEventListener('touchend', handleEndSwipe)

    playButton.addEventListener('click', handleAutoPlay)


    setHeight()
    window.addEventListener('resize', setHeight)
    document.addEventListener('DOMContentLoaded', setHeight)
  } else if (loadCounter < maxLoad) {
    loadCounter++
    setTimeout(checkForContent, 100)
  }
  return
}

checkForContent()

// set up STATE ready for app use

