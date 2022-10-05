const logos = [
  "../images/king.jpeg",
  "../images/hearts.png",
  "../images/queen.jpeg",
  "../images/joker.png",
  "../images/spade.png"
];

let st = true;

let selected = [];
const check = () => {
  let c = 0;
  selected = [];
  let responses = [];
  if (document.getElementById("card1"))
    responses.push(document.getElementById("card1").getAttribute("src"));
  else responses.push(undefined);
  if (document.getElementById("card2"))
    responses.push(document.getElementById("card2").getAttribute("src"));
  else responses.push(undefined);
  if (document.getElementById("card3"))
    responses.push(document.getElementById("card3").getAttribute("src"));
  else responses.push(undefined);
  if (document.getElementById("card4"))
    responses.push(document.getElementById("card4").getAttribute("src"));
  else responses.push(undefined);
  if (document.getElementById("card5"))
    responses.push(document.getElementById("card5").getAttribute("src"));
  else responses.push(undefined);
  if (document.getElementById("card6"))
    responses.push(document.getElementById("card6").getAttribute("src"));
  else responses.push(undefined);
  if (document.getElementById("card7"))
    responses.push(document.getElementById("card7").getAttribute("src"));
  else responses.push(undefined);
  if (document.getElementById("card8"))
    responses.push(document.getElementById("card8").getAttribute("src"));
  else responses.push(undefined);
  if (document.getElementById("card9"))
    responses.push(document.getElementById("card9").getAttribute("src"));
  else responses.push(undefined);
  if (document.getElementById("card10"))
    responses.push(document.getElementById("card10").getAttribute("src"));
  responses.map((item, index) => {
    if (logos.includes(item)) {
      c++;
      selected.push(index);
    }
  });
  if (c == 1) return 1;
  if (c == 2) {
    //console.log(selected);
    if (responses[selected[0]] == responses[selected[1]]) return 2;
    else return 3;
  }
  if (c > 2) return 4;
  if (c == 0) return 0;
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
}
var arr = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
shuffle(arr);
//console.log(arr);

const cardclicked = (ids, item) => {
  if (st) {
    st = false;
    var audio = document.getElementById("audio");
    audio.play();
    document.getElementById(ids).classList.add("div1");
    setTimeout(() => {
      document.getElementById(ids).setAttribute("src", logos[arr[item]]);
      setTimeout(() => {
        document.getElementById(ids).classList.remove("div1");
        const ch = check();
        st = true;
        if (ch == 2) {
          st = false;
          const a1 = document.getElementById("cont_card");
          let ids1 = "card" + String(selected[0] + 1);
          let ids2 = "card" + String(selected[1] + 1);
          const a2 = document.getElementById(ids1);
          const a3 = document.getElementById(ids2);
          document.getElementById("tick").play();
          a2.remove(a2);
          a3.remove(a3);
          st = true;
          const headdiv = document.getElementById("cont_card");
          console.log("headidc ", headdiv.childNodes);
          console.log(headdiv.childNodes);
          const collection = document.getElementsByTagName("img");
          console.log(collection.length);
          if (collection.length == 0) {
            document.getElementById("win").play();
            document.getElementById("app").innerHTML = `
            <div align="center" class="levelpass">
            <h1>Level Passed!!!<h1>
            <a href="../pages/play2.html">Go to Next Level</a>
          </div>
            `;
          }
        }
        if (ch == 3) {
          st = false;
          setTimeout(() => {
            setTimeout(() => {
              document.getElementById(ids).classList.remove("div1");
              document
                .getElementById(ids)
                .setAttribute("src", logos[arr[item]]);
              setTimeout(() => {
                setTimeout(() => {
                  //console.log(selected);
                  selected.map((item, index) => {
                    let xx = "card" + String(item + 1);
                    if (document.getElementById(xx))
                      document
                        .getElementById(xx)
                        .setAttribute("src", "../images/card.jpg");
                  });
                  document
                    .getElementById(ids)
                    .setAttribute("src", "../images/card.jpg");
                  st = true;
                  const headdiv = document.getElementById("cont_card");
                  console.log("headidc ", headdiv.childNodes);
                  if (headdiv.childNodes.length == 11) {
                    document.getElementById("app").innerHTML = `
                  <div align="center" class="levelpass">
                    <h1>Level Passed!!!<h1>
                    <a href="../pages/play2.html">Go to Next Level</a>
                  </div>
                    `;
                  }
                }, 300);
              }, 400);
            }, 400);
          }, 100);
        }
        if (ch == 4) {
          st = false;
          setTimeout(() => {
            document.getElementById(ids).setAttribute("src", logos[arr[item]]);
            setTimeout(() => {
              document.getElementById(ids).classList.remove("div1");
              setTimeout(() => {
                selected.map((item, index) => {
                  let xx = "card" + String(item + 1);
                  document
                    .getElementById(xx)
                    .setAttribute("src", "../images/card.jpg");
                });
                document
                  .getElementById(ids)
                  .setAttribute("src", "../images/card.jpg");
                st = true;
                const headdiv = document.getElementById("cont_card");
                console.log("headidc ", headdiv.childNodes);
                if (headdiv.childNodes.length == 11) {
                  document.getElementById("app").innerHTML = `
                  <div align="center" class="levelpass">
                    <h1>Level Passed!!!<h1>
                    <a href="../pages/play2.html">Go to Next Level</a>
                  </div>
                  `;
                }
              }, 0);
            }, 400);
          }, 400);
        }
      }, 400);
    }, 250);
  } else {
    let audio = document.getElementById("wrong");
    audio.play();
    const headdiv = document.getElementById("cont_card");
    if (headdiv.childNodes.length == 11) {
      document.getElementById("app").innerHTML = `
      <div align="center" class="levelpass">
        <h1>Level Passed!!!<h1>
        <a href="../pages/medium.html">Go to Next Level</a>
      </div>
      `;
    }
  }
};
