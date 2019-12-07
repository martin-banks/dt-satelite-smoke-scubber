import Styles from './app.sass'
// import Content from './content/index'
// Template content
const Content = window._dt1206satellitesmokescrubber
const imageUrl = 'https://media.news.com.au/DTinteractive/dt-1206-satellite-smoke-scrubber/images'

const image = part => `<div class="${Styles.img}" data-type="slide">
  <img
    class="${Styles.img__image}"
    src="${imageUrl}/${part.img}"
    alt="${part.caption}"
  />
  <h3 class="${Styles.img__caption}">
    ${part.caption}
  </h3>
</div>`


function layout() {
  const template = `
    <section class="${Styles.wrapper}" data-type="contentwrapper">
      ${Content.header ? `<img style="width: 100%; height: auto; margin: 0" src="${imageUrl}/${Content.header}" />` : ''}
      <section class="${Styles.slides}" data-type="slideswrapper">
        ${Content.parts.map(part => image(part)).join('')}
      </section>

      <section class="${Styles.input__wrapper}" data-type="inputwrapper">
        <input 
          class="${Styles.input__slider}" 
          type="range" 
          data-type="input_slider"
          value=0
        />
        <input 
          class="${Styles.input__play}"
          type="button" 
          value="Start auto play"
          data-active="false"
          data-type="input_autoplay"
        />
      </section>
    </section>
  `

  return template
}

export default layout
