var bold = document.querySelector(".bold")
var italic = document.querySelector(".italic")
var left = document.querySelector(".left")
var mid = document.querySelector(".mid")
var right = document.querySelector(".right")
var upperCase = document.querySelector(".upperCase")
var lowerCase = document.querySelector(".lowerCase")
var camelCase = document.querySelector(".camelCase")
var clear = document.querySelector(".clear")
var fonts = document.querySelector(".fonts")
var textArea = document.querySelector("#textArea")

// function for making text bold
bold.addEventListener("click", function () {
    textArea.style.fontWeight = "bold"
})

// function for making text italic
italic.addEventListener("click", function () {
    textArea.style.fontStyle = "italic"
})

// function for putting text middle
mid.addEventListener("click", function () {
    textArea.style.textAlign = "center"
})

// function for putting text start
left.addEventListener("click", function () {
    textArea.style.textAlign = "start"
})

// function for putting text start
right.addEventListener("click", function () {
    textArea.style.textAlign = "end"
})

// function for making text uppercase
upperCase.addEventListener("click", function () {
    textArea.style.textTransform = "uppercase"
})

// function for making text lowercase
lowerCase.addEventListener("click", function () {
    textArea.style.textTransform = "lowercase"
})

// function for making text camelcase
camelCase.addEventListener("click", function () {
    textArea.style.textTransform = "capitalize"
})

// function for clearing text
clear.addEventListener("click", function () {
    textArea.value = ""
})

// function for font color changing
document.querySelector("#color").addEventListener("change", watchColorPicker, false);

function watchColorPicker(event) {
    textArea.style.color = event.target.value
}

// function for bg-change
document.querySelector("#bg-color").addEventListener("change", watchbgColorPicker, false);

function watchbgColorPicker(e) {
    textArea.style.backgroundColor = e.target.value
}

// function for changing font size.
function changeSize(n) {
    textArea.style.fontSize = n.value + 'px'
}
