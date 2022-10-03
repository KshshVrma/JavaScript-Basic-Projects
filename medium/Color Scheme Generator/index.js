const getColorBtn = document.getElementById("btn");
const divWithColors = document.getElementsByClassName("color-div");
const colorDivContainer = document.getElementById("colors-container");
const colorEl = document.getElementById("colorEl");
const selectEl = document.getElementById("selectEl");
const hexPara = document.getElementsByClassName("hex");

getColorBtn.addEventListener("click", () => {
  fetchColorsData();
});

fetchColorsData();
copyToClipboard();

function fetchColorsData() {
  const colorElValue = colorEl.value.slice(1);
  const selectElValue = selectEl.value;
  const url = `https://www.thecolorapi.com/scheme?hex=${colorElValue}&mode=${selectElValue}&count=${divWithColors.length}`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((colorData) => {
      const colorArray = colorData.colors;
      let ColorArrayData = randomGeneratedColor(colorArray);
      displayDivsWithColors(ColorArrayData);
      copyToClipboard();
    });
}

function randomGeneratedColor(colorArray) {
  let newArray = [];
  for (let i = 0; i < colorArray.length; i++) {
    let randNum = Math.floor(Math.random() * colorArray.length);
    newArray.push(colorArray[randNum].hex.value);
  }

  return newArray;
}

function displayDivsWithColors(randomColorArray) {
  for (let i = 0; i < divWithColors.length; i++) {
    divWithColors[i].style.backgroundColor = randomColorArray[i];
    hexPara[i].value = randomColorArray[i];
  }
}

function copyToClipboard() {
  for (let i = 0; i < hexPara.length; i++) {
    hexPara[i].addEventListener("click", () => {
      hexPara[i].select();
      hexPara[i].setSelectionRange(0, 99999);
      navigator.clipboard.writeText(hexPara[i].value);
    });
  }
}
