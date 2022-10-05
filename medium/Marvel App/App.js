const key = "5a8c32c388f6d60cfb79758f85fb9e29";
const loaderEl = document.getElementById("loader");

let CharacterId,
  comicOffset = 0,
  comicTotal,
  seriesOffset = 0,
  seriesTotal,
  eventsOffset = 0,
  eventsTotal;

const hideLoader = () => {
  loaderEl.classList.remove("show");
};

const showLoader = () => {
  loaderEl.classList.add("show");
};

// Main Code
document.getElementById("submitBtn").addEventListener("click", (e) => {
  e.preventDefault;
  // const characterName = document.getElementById("searchName").textContent;
  let searchNameEle = document.getElementById("searchName");
  let searchName = searchNameEle.value.trim();
  if (searchName == null || searchName == "") {
    console.log("Not Valid");
    searchNameEle.style.border = "2px solid red";
    searchNameEle.style.borderRadius = "5px";
    searchNameEle.value = "";
    searchNameEle.focus();
  } else {
    searchNameEle.style.border = "";
    searchNameEle.style.borderRadius = "";
    const characterName = searchName;
    fetchDetails(characterName);
  }
});

// Fetching Character Details when character is searched
function fetchDetails(characterName) {
  fetch(
    "https://gateway.marvel.com:443/v1/public/characters?name=" +
      characterName +
      "&apikey=" +
      key
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.data.count == 0) {
        removeElements();
      } else {
        showLoader();
        addElements();
        updateCharacterData(response);

        CharacterId = response.data.results[0].id;

        const comicUrl =
          "https://gateway.marvel.com:443/v1/public/characters/" +
          CharacterId +
          "/comics?apikey=" +
          key;
        printComicDetails(comicUrl);

        const seriesUrl =
          "https://gateway.marvel.com:443/v1/public/characters/" +
          CharacterId +
          "/series?apikey=" +
          key;
        printSeriesDetails(seriesUrl);

        const eventsUrl =
          "https://gateway.marvel.com:443/v1/public/characters/" +
          CharacterId +
          "/events?apikey=" +
          key;
        printEventsDetails(eventsUrl);

        hideLoader();
      }
    })
    .catch((err) => console.error(err));
}

// Removing unnecessary elements from page
function removeElements() {
  document.getElementById("container").style.display = "none";
  document.getElementById("characterNotFound").style.display = "flex";
  document.querySelector("footer").style.position = "fixed";
  document.querySelector("footer").style.bottom = "0px";
}

// Adding those elements to page
function addElements() {
  document.getElementById("container").style.removeProperty("display");
  document.getElementById("characterNotFound").style.display = "none";
  document.querySelector("footer").style.removeProperty("position");
  document.querySelector("footer").style.removeProperty("bottom");
}

// Updating Character Card as soon as other character is searched
function updateCharacterData(response) {
  const CharacterId = response.data.results[0].id;
  // console.log(CharacterId);
  const name = response.data.results[0].name;
  const description = response.data.results[0].description.trim();
  const imgPath =
    response.data.results[0].thumbnail.path +
    "." +
    response.data.results[0].thumbnail.extension;

  const imgTag = document.getElementById("mainImage");
  imgTag.src = imgPath;

  const nameTag = document.getElementById("characterName");
  nameTag.innerText = name;

  const desTag = document.getElementById("characterDescription");
  if (description == null || description == "") {
    desTag.classList.add("noCharDes");
    desTag.innerText = "No Description Mentioned :(";
  } else {
    desTag.classList.remove("noCharDes");
    desTag.innerText = description;
  }
}

// Close more details popup
function closeMoreDetail() {
  document.getElementById("moreDetails").innerHTML = "";
  document.getElementById("moreDetails").style.display = "none";
  document.getElementById("body").style.overflow = "auto";
}

// Popup more details about comics when click on any comic
function moreDetailsAboutComics(comicId) {
  const moreDetails = document.getElementById("moreDetails");
  moreDetails.style.display = "flex";
  moreDetails.innerHTML = "";

  fetch(
    "https://gateway.marvel.com:443/v1/public/comics/" +
      comicId +
      "?apikey=" +
      key
  )
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      let comicDetails = res.data.results[0];
      let comicImg =
        comicDetails.thumbnail.path + "." + comicDetails.thumbnail.extension;
      let comicTitle = comicDetails.title;
      let comicDes =
        comicDetails.description == null || comicDetails.description == ""
          ? "No Description Mentioned"
          : comicDetails.description;
      let seriesName = comicDetails.series.name;
      let prices = comicDetails.prices[0].price;
      let images = comicDetails.images;

      moreDetails.innerHTML = ` <div class="closeBtn" onclick="closeMoreDetail()">X</div>
      <div class="info">
      <div class="combo">
          <img
            src="${comicImg}"
            alt=""
          />
          <div class="moreInfo">
            <p id="moreComicTitle">${comicTitle}</p>
            <p id="comicDes">
              ${comicDes}
            </p>
            <p id="fromSeries">
              Series : <span>${seriesName}</span>
            </p>
            <div id="comicPrice">$${prices}</div>
          </div>
        </div>
      </div>
      `;

      const info = document.querySelector(".info");

      const imageContainer = document.createElement("div");
      imageContainer.id = "imageContainer";

      if (images.length > 0) {
        const comicImgTitle = document.createElement("p");
        comicImgTitle.classList.add("comicImgTitle");
        comicImgTitle.textContent = "Comic Images :";

        imageContainer.append(comicImgTitle);

        const comicImages = document.createElement("div");
        comicImages.id = "comicImages";

        for (image of images) {
          const img = document.createElement("img");
          img.src = image.path + "." + image.extension;
          img.classList.add("comicImage");
          comicImages.append(img);
        }

        imageContainer.append(comicImages);
        info.append(imageContainer);
      }

      const characterCon = document.createElement("div");
      characterCon.id = "characterCon";

      const characterTitle = document.createElement("p");
      characterTitle.textContent = "Characters :";

      characterCon.append(characterTitle);

      const characters = document.createElement("div");
      characters.id = "characters";

      fetch(
        "https://gateway.marvel.com:443/v1/public/comics/" +
          comicId +
          "/characters?limit=100&apikey=" +
          key
      )
        .then((res) => res.json())
        .then((res) => {
          let characterDetails = res.data.results;
          if (characterDetails.length > 0) {
            for (character of characterDetails) {
              const characterContainer = document.createElement("div");
              characterContainer.classList.add("characterContainer");

              const img = document.createElement("img");
              img.src =
                character.thumbnail.path + "." + character.thumbnail.extension;

              const p = document.createElement("p");
              p.classList.add("characteraName");
              p.textContent = character.name;

              characterContainer.append(img, p);
              characters.append(characterContainer);
            }
          } else {
            const noCharacter = document.createElement("div");
            noCharacter.id = "noDetails";
            noCharacter.innerHTML =
              "<span>No characters details provided. :( </span>";
            characters.append(noCharacter);
          }
        })
        .catch((err) => console.log(err));

      characterCon.append(characters);

      info.append(characterCon);

      const creatorCon = document.createElement("div");
      creatorCon.id = "creatorCon";

      const creatorTitle = document.createElement("p");
      creatorTitle.textContent = "Creators :";

      creatorCon.append(creatorTitle);

      const creators = document.createElement("div");
      creators.id = "creators";

      fetch(
        "https://gateway.marvel.com:443/v1/public/comics/" +
          comicId +
          "/creators?limit=100&apikey=" +
          key
      )
        .then((res) => res.json())
        .then((res) => {
          let creatorDetails = res.data.results;
          if (creatorDetails.length > 0) {
            for (creator of creatorDetails) {
              const creatorContainer = document.createElement("div");
              creatorContainer.classList.add("creatorContainer");

              const img = document.createElement("img");
              img.src =
                creator.thumbnail.path + "." + creator.thumbnail.extension;

              const p = document.createElement("p");
              p.classList.add("createrName");
              p.textContent = creator.fullName;

              creatorContainer.append(img, p);
              creators.append(creatorContainer);
            }
          } else {
            const noCharacter = document.createElement("div");
            noCharacter.id = "noDetails";
            noCharacter.innerHTML =
              "<span>No creator details provided. :( </span>";
            creators.append(noCharacter);
          }

          creatorCon.append(creators);

          info.append(creatorCon);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// Popup more details about series when click on any series
function moreDetailsAboutSeries(seriesId) {
  // console.log(seriesId);
  const moreDetails = document.getElementById("moreDetails");
  moreDetails.style.display = "flex";
  moreDetails.innerHTML = "";

  fetch(
    "https://gateway.marvel.com:443/v1/public/series/" +
      seriesId +
      "?apikey=" +
      key
  )
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      let seriesDetails = res.data.results[0];
      let seriesImg =
        seriesDetails.thumbnail.path + "." + seriesDetails.thumbnail.extension;
      let seriesTitle = seriesDetails.title;
      let seriesDes =
        seriesDetails.description == null || seriesDetails.description == ""
          ? "No Description Mentioned"
          : seriesDetails.description;

      moreDetails.innerHTML = ` <div class="closeBtn" onclick="closeMoreDetail()">X</div>
      <div class="info">
      <div class="combo">
          <img
            src="${seriesImg}"
            alt=""
          />
          <div class="moreInfo">
            <p id="moreComicTitle">${seriesTitle}</p>
            <p id="comicDes">
              ${seriesDes}
            </p>
          </div>
        </div>
      </div>
      `;

      const info = document.querySelector(".info");

      const characterCon = document.createElement("div");
      characterCon.id = "characterCon";

      const characterTitle = document.createElement("p");
      characterTitle.textContent = "Characters :";

      characterCon.append(characterTitle);

      const characters = document.createElement("div");
      characters.id = "characters";

      fetch(
        "https://gateway.marvel.com:443/v1/public/series/" +
          seriesId +
          "/characters?limit=100&apikey=" +
          key
      )
        .then((res) => res.json())
        .then((res) => {
          let characterDetails = res.data.results;
          if (characterDetails.length > 0) {
            for (character of characterDetails) {
              const characterContainer = document.createElement("div");
              characterContainer.classList.add("characterContainer");

              const img = document.createElement("img");
              img.src =
                character.thumbnail.path + "." + character.thumbnail.extension;

              const p = document.createElement("p");
              p.classList.add("characteraName");
              p.textContent = character.name;

              characterContainer.append(img, p);
              characters.append(characterContainer);
            }
          } else {
            const noCharacter = document.createElement("div");
            noCharacter.id = "noDetails";
            noCharacter.innerHTML =
              "<span>No characters details provided. :( </span>";
            characters.append(noCharacter);
          }
        })
        .catch((err) => console.log(err));

      characterCon.append(characters);

      info.append(characterCon);

      const creatorCon = document.createElement("div");
      creatorCon.id = "creatorCon";

      const creatorTitle = document.createElement("p");
      creatorTitle.textContent = "Creators :";

      creatorCon.append(creatorTitle);

      const creators = document.createElement("div");
      creators.id = "creators";

      fetch(
        "https://gateway.marvel.com:443/v1/public/series/" +
          seriesId +
          "/creators?limit=100&apikey=" +
          key
      )
        .then((res) => res.json())
        .then((res) => {
          let creatorDetails = res.data.results;
          if (creatorDetails.length > 0) {
            for (creator of creatorDetails) {
              const creatorContainer = document.createElement("div");
              creatorContainer.classList.add("creatorContainer");

              const img = document.createElement("img");
              img.src =
                creator.thumbnail.path + "." + creator.thumbnail.extension;

              const p = document.createElement("p");
              p.classList.add("createrName");
              p.textContent = creator.fullName;

              creatorContainer.append(img, p);
              creators.append(creatorContainer);
            }
          } else {
            const noCharacter = document.createElement("div");
            noCharacter.id = "noDetails";
            noCharacter.innerHTML =
              "<span>No creator details provided. :( </span>";
            creators.append(noCharacter);
          }

          creatorCon.append(creators);

          info.append(creatorCon);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// Popup more details about events when click on any event
function moreDetailsAboutEvents(eventId) {
  console.log(eventId);
  const moreDetails = document.getElementById("moreDetails");
  moreDetails.style.display = "flex";
  moreDetails.innerHTML = "";

  fetch(
    "https://gateway.marvel.com:443/v1/public/events/" +
      eventId +
      "?apikey=" +
      key
  )
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      let eventDetails = res.data.results[0];
      let eventImg =
        eventDetails.thumbnail.path + "." + eventDetails.thumbnail.extension;
      let eventTitle = eventDetails.title;
      let eventDes =
        eventDetails.description == null || eventDetails.description == ""
          ? "No Description Mentioned"
          : eventDetails.description;

      moreDetails.innerHTML = ` <div class="closeBtn" onclick="closeMoreDetail()">X</div>
      <div class="info">
      <div class="combo">
          <img
            src="${eventImg}"
            alt=""
          />
          <div class="moreInfo">
            <p id="moreComicTitle">${eventTitle}</p>
            <p id="comicDes">
              ${eventDes}
            </p>
          </div>
        </div>
      </div>
      `;

      const info = document.querySelector(".info");

      const characterCon = document.createElement("div");
      characterCon.id = "characterCon";

      const characterTitle = document.createElement("p");
      characterTitle.textContent = "Characters :";

      characterCon.append(characterTitle);

      const characters = document.createElement("div");
      characters.id = "characters";

      fetch(
        "https://gateway.marvel.com:443/v1/public/events/" +
          eventId +
          "/characters?limit=100&apikey=" +
          key
      )
        .then((res) => res.json())
        .then((res) => {
          let characterDetails = res.data.results;
          if (characterDetails.length > 0) {
            for (character of characterDetails) {
              const characterContainer = document.createElement("div");
              characterContainer.classList.add("characterContainer");

              const img = document.createElement("img");
              img.src =
                character.thumbnail.path + "." + character.thumbnail.extension;

              const p = document.createElement("p");
              p.classList.add("characteraName");
              p.textContent = character.name;

              characterContainer.append(img, p);
              characters.append(characterContainer);
            }
          } else {
            const noCharacter = document.createElement("div");
            noCharacter.id = "noDetails";
            noCharacter.innerHTML =
              "<span>No characters details provided. :( </span>";
            characters.append(noCharacter);
          }
        })
        .catch((err) => console.log(err));

      characterCon.append(characters);

      info.append(characterCon);

      const creatorCon = document.createElement("div");
      creatorCon.id = "creatorCon";

      const creatorTitle = document.createElement("p");
      creatorTitle.textContent = "Creators :";

      creatorCon.append(creatorTitle);

      const creators = document.createElement("div");
      creators.id = "creators";

      fetch(
        "https://gateway.marvel.com:443/v1/public/events/" +
          eventId +
          "/creators?limit=100&apikey=" +
          key
      )
        .then((res) => res.json())
        .then((res) => {
          let creatorDetails = res.data.results;
          if (creatorDetails.length > 0) {
            for (creator of creatorDetails) {
              const creatorContainer = document.createElement("div");
              creatorContainer.classList.add("creatorContainer");

              const img = document.createElement("img");
              img.src =
                creator.thumbnail.path + "." + creator.thumbnail.extension;

              const p = document.createElement("p");
              p.classList.add("createrName");
              p.textContent = creator.fullName;

              creatorContainer.append(img, p);
              creators.append(creatorContainer);
            }
          } else {
            const noCharacter = document.createElement("div");
            noCharacter.id = "noDetails";
            noCharacter.innerHTML =
              "<span>No creator details provided. :( </span>";
            creators.append(noCharacter);
          }

          creatorCon.append(creators);

          info.append(creatorCon);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// Generic function which calls other functions
function showMoreDetails() {
  const type = this.dataset.type;
  if (type == "comic") {
    moreDetailsAboutComics(this.dataset.id);
  } else if (type == "series") {
    moreDetailsAboutSeries(this.dataset.id);
  } else if (type == "events") {
    moreDetailsAboutEvents(this.dataset.id);
  }
  document.getElementById("body").style.overflow = "hidden";
}

// Printing Comic Details of character being searched
function printComicDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      // console.log(res);
      comicTotal = res.data.total;
      if (comicTotal == 0) {
        const comics = document.getElementById("comics");
        comics.innerHTML = "<h3>No Comics Available for this character :(</h3>";
      } else {
        const allComicData = res.data.results;

        const comics = document.getElementById("comics");
        comics.innerHTML = "";

        allComicData.forEach((comic) => {
          const comicPoster =
            comic.thumbnail.path + "." + comic.thumbnail.extension;
          const comicTitle = comic.title;

          const comicCard = document.createElement("div");
          comicCard.classList.add("comicCard");
          comicCard.dataset.type = "comic";
          comicCard.dataset.id = comic.id;

          comicCard.addEventListener("click", showMoreDetails);

          const poster = document.createElement("img");
          poster.classList.add("tmp");
          poster.src = comicPoster;
          poster.alt = comicTitle;

          const comicDetail = document.createElement("div");
          comicDetail.classList.add("comicDetail");

          const comicName = document.createElement("div");
          comicName.classList.add("comicName");
          comicName.innerText = comicTitle;

          comicDetail.append(comicName);

          comicCard.append(poster, comicDetail);

          comics.append(comicCard);
        });
      }
    })
    .catch((error) => console.log(error));
}

// Printing Series Details of character being searched
function printSeriesDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      seriesTotal = res.data.total;
      if (seriesTotal == 0) {
        const series = document.getElementById("series");
        series.innerHTML = "<h3>No Series Available for this character :(</h3>";
      } else {
        const series = document.getElementById("series");
        series.innerHTML = "";

        const allSeriesData = res.data.results;

        allSeriesData.forEach((seriesData) => {
          const seriesTitle = seriesData.title;

          const thumbnail =
            seriesData.thumbnail.path + "." + seriesData.thumbnail.extension;

          const seriesCard = document.createElement("div");
          seriesCard.classList.add("seriesCard");
          seriesCard.addEventListener("click", showMoreDetails);
          seriesCard.dataset.type = "series";
          seriesCard.dataset.id = seriesData.id;
          seriesCard.innerHTML = ` <img class='tmp' src='${thumbnail}' alt='${seriesTitle}' />
            <div class='seriesDetail'>
              <div class='seriesName'>${seriesTitle}</div>
            </div>`;

          series.append(seriesCard);
        });
      }
    })
    .catch((error) => console.log(error));
}

// Printing Event Details of character being searched
function printEventsDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      eventsTotal = res.data.total;
      if (eventsTotal == 0) {
        const events = document.getElementById("events");
        events.innerHTML = "<h3>No events Available for this character :(</h3>";
      } else {
        const events = document.getElementById("events");
        events.innerHTML = "";

        const alleventsData = res.data.results;

        alleventsData.forEach((eventsData) => {
          const eventsTitle = eventsData.title;

          const thumbnail =
            eventsData.thumbnail.path + "." + eventsData.thumbnail.extension;

          const eventsCard = document.createElement("div");
          eventsCard.classList.add("eventsCard");
          eventsCard.dataset.type = "events";
          eventsCard.dataset.id = eventsData.id;

          eventsCard.addEventListener("click", showMoreDetails);

          eventsCard.innerHTML = ` <img class='tmp' src='${thumbnail}' alt='${eventsTitle}' />
            <div class='eventsDetail'>
              <div class='eventsName'>${eventsTitle}</div>
            </div>`;

          events.append(eventsCard);
        });
      }
    })
    .catch((error) => console.log(error));
}

// Load series when series button clicked
function showSeries() {
  const allCatBtns = document.getElementsByClassName("catBtns");
  for (let i = 0; i < allCatBtns.length; i++) {
    allCatBtns[i].classList.remove("active");
  }

  document.getElementById("showSeries").classList.add("active");

  document.getElementById("comicTitle").style.display = "none";
  document.getElementById("comics").style.display = "none";

  document.getElementById("seriesTitle").style.display = "block";
  document.getElementById("series").style.display = "grid";

  document.getElementById("eventsTitle").style.display = "none";
  document.getElementById("events").style.display = "none";
}

// Load series when comic button pressed
function showComics() {
  const allCatBtns = document.getElementsByClassName("catBtns");
  for (let i = 0; i < allCatBtns.length; i++) {
    allCatBtns[i].classList.remove("active");
  }

  document.getElementById("showComics").classList.add("active");

  document.getElementById("comicTitle").style.display = "block";
  document.getElementById("comics").style.display = "grid";

  document.getElementById("seriesTitle").style.display = "none";
  document.getElementById("series").style.display = "none";

  document.getElementById("eventsTitle").style.display = "none";
  document.getElementById("events").style.display = "none";
}

// Load series when event button pressed
function showEvents() {
  const allCatBtns = document.getElementsByClassName("catBtns");
  for (let i = 0; i < allCatBtns.length; i++) {
    allCatBtns[i].classList.remove("active");
  }

  document.getElementById("showEvents").classList.add("active");

  document.getElementById("eventsTitle").style.display = "block";
  document.getElementById("events").style.display = "grid";

  document.getElementById("comicTitle").style.display = "none";
  document.getElementById("comics").style.display = "none";

  document.getElementById("seriesTitle").style.display = "none";
  document.getElementById("series").style.display = "none";
}

// Load more comics while scrolling
function addMoreComics() {
  showLoader();
  let url =
    "https://gateway.marvel.com:443/v1/public/characters/" +
    CharacterId +
    "/comics?offset=" +
    comicOffset +
    "&apikey=" +
    key;

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      if (res.data.results.length > 0) {
        const allComicData = res.data.results;
        const comics = document.getElementById("comics");

        allComicData.forEach((comic) => {
          const comicPoster =
            comic.thumbnail.path + "." + comic.thumbnail.extension;
          const comicTitle = comic.title;

          const comicCard = document.createElement("div");
          comicCard.classList.add("comicCard");

          comicCard.addEventListener("click", showMoreDetails);

          comicCard.dataset.type = "comic";
          comicCard.dataset.id = comic.id;

          const poster = document.createElement("img");
          poster.classList.add("tmp");
          poster.src = comicPoster;
          poster.alt = comicTitle;

          const comicDetail = document.createElement("div");
          comicDetail.classList.add("comicDetail");

          const comicName = document.createElement("div");
          comicName.classList.add("comicName");
          comicName.innerText = comicTitle;

          comicDetail.append(comicName);

          comicCard.append(poster, comicDetail);

          comics.append(comicCard);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  hideLoader();
}

// Load more Series while scrolling
function addMoreSeries() {
  let url =
    "https://gateway.marvel.com:443/v1/public/characters/" +
    CharacterId +
    "/series?offset=" +
    seriesOffset +
    "&apikey=" +
    key;

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data.results.length > 0) {
        const series = document.getElementById("series");

        const allSeriesData = res.data.results;

        allSeriesData.forEach((seriesData) => {
          const seriesTitle = seriesData.title;

          const thumbnail =
            seriesData.thumbnail.path + "." + seriesData.thumbnail.extension;

          const seriesCard = document.createElement("div");
          seriesCard.classList.add("seriesCard");
          seriesCard.dataset.type = "series";
          seriesCard.dataset.id = seriesData.id;
          seriesCard.addEventListener("click", showMoreDetails);
          seriesCard.innerHTML = ` <img class='tmp' src='${thumbnail}' alt='${seriesTitle}' />
            <div class='seriesDetail'>
              <div class='seriesName'>${seriesTitle}</div>
            </div>`;

          series.append(seriesCard);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Load more events while scrolling
function addMoreEvents() {
  let url =
    "https://gateway.marvel.com:443/v1/public/characters/" +
    CharacterId +
    "/events?offset=" +
    eventsOffset +
    "&apikey=" +
    key;

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data.results.length > 0) {
        const events = document.getElementById("events");

        const alleventsData = res.data.results;

        alleventsData.forEach((eventsData) => {
          const eventsTitle = eventsData.title;

          const thumbnail =
            eventsData.thumbnail.path + "." + eventsData.thumbnail.extension;

          const eventsCard = document.createElement("div");
          eventsCard.classList.add("eventsCard");
          eventsCard.dataset.type = "events";
          eventsCard.dataset.id = eventsData.id;

          eventsCard.addEventListener("click", showMoreDetails);

          eventsCard.innerHTML = ` <img class='tmp' src='${thumbnail}' alt='${eventsTitle}' />
            <div class='eventsDetail'>
              <div class='eventsName'>${eventsTitle}</div>
            </div>`;

          events.append(eventsCard);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Check if more Comics | Series | Events are available while scrolling
window.addEventListener("scroll", () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 110) {
    // console.log(scrollTop, scrollHeight, clientHeight);
    if (document.getElementById("comics").style.display != "none") {
      if (comicOffset < comicTotal) {
        comicOffset += 20;
        addMoreComics();
      }
    } else if (document.getElementById("series").style.display != "none") {
      if (seriesOffset < seriesTotal) {
        seriesOffset += 20;
        addMoreSeries();
      }
    } else {
      if (eventsOffset < eventsTotal) {
        eventsOffset += 20;
        addMoreEvents();
      }
    }
  }
});
