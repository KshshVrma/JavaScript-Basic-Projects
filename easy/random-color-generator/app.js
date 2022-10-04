const App = {
  rgbTitle: document.querySelector('h1#rgb'),
  hexTitle: document.querySelector('h1#hex'),
  button: document.querySelector('button'),

  getRandomColorHexNumber: () => Math.floor(Math.random() * (255 - 0) + 0),

  componentToHex: (value) => {
    const hex = value.toString(16)

    return hex,length == 1 ? `0${hex}` : hex
  },

  generateColor: () => {
    const red = App.getRandomColorHexNumber()
    const green = App.getRandomColorHexNumber()
    const blue = App.getRandomColorHexNumber()

    return {
      rgb: `rgb(${red}, ${green}, ${blue})`,
      hex: `#${App.componentToHex(red)}${App.componentToHex(green)}${App.componentToHex(blue)}`,
      contrast: red*0.299 + green*0.587 + blue*0.114 > 186 ? 'black' : 'white'
    }
  },

  generateRGBColor: () => {
    const newColor = App.generateColor()

    document.getElementById('app').style.backgroundColor = newColor.rgb

    App.rgbTitle.innerText = newColor.rgb
    App.rgbTitle.style.color = newColor.contrast

    App.hexTitle.innerText = newColor.hex
    App.hexTitle.style.color = newColor.contrast

    App.button.style.backgroundColor = newColor.contrast
    App.button.style.color = newColor.contrast = newColor.rgb
  },

  init: () => {
    App.generateRGBColor()
  },
}

App.init()
