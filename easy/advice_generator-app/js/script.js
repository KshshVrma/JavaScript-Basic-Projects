const num = document.querySelector(".num");
const advice = document.querySelector(".advice");
const btn = document.querySelectorAll(".btn");

const adviceGenerator = function () {
  fetch("https://api.adviceslip.com/advice")
    .then((res) => res.json())
    .then((data) => {
      num.textContent = data.slip.id;
      advice.textContent = data.slip.advice;
    });
};

btn.forEach((el) =>
  el.addEventListener("click", () => {
    adviceGenerator();
  })
);
