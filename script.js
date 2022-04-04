const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const prevPageBtn = document.querySelector("#prevPageBtn");
const nextPageBtn = document.querySelector("#nextPageBtn");
const pageNumber = document.querySelector("#pageNumber");
const moviesResults = document.querySelector("#moviesResults");
let page = 1;

const getsearchresult = (movie_name, count) => {
  fetch(
    `https://yts.mx/api/v2/list_movies.json?query_term=${movie_name}&page=${count}`
  )
    .then((res) => {
      return res.json();
    })
    .then((movieInfo) => {
      const moviesData = movieInfo.data.movies;
      let moviesPoster = "";

      moviesData.forEach((movie) => {
        const title = movie.title;
        const img = movie.large_cover_image;
        const date = movie.year;
        const download = movie.torrents[0].url;

        moviesPoster += `
       <div class="movies">
          <h1>${title}</h1>
          <p>${date}</p>
          <img src="${img}" alt="" />
          <button class="btn_style">
            <a href="${download}">download</a>
          </button>
            
       </div>
        `;
        moviesResults.innerHTML = moviesPoster;
      });
    });
};

const likeCountsUpdate = (count) => {
  fetch(
    `https://yts.mx/api/v2/list_movies.json?sort_by=download_count&page=${count}&limit=50`
  )
    .then((res) => res.json())
    .then((movieInfo) => {
      const moviesData = movieInfo.data.movies;
      let moviesPoster = "";

      moviesData.forEach((movie) => {
        const title = movie.title;
        const img = movie.large_cover_image;
        const date = movie.year;
        const download = movie.torrents[0].url;

        moviesPoster += `
       <div class="movies">
          <h1 class ="titles">${title}</h1>
          <p>${date}</p>
          <img src="${img}" alt="" />
          <button class="btn_style">
            <a href="${download}">download</a>
          </button>

       </div>
        `;
        moviesResults.innerHTML = moviesPoster;
      });
    });
};
window.onload = likeCountsUpdate(page);

searchBtn.addEventListener("click", () => {
  if (page < 1 || page > 1) {
    page = 1;
    // pageNumber.innerHTML = page;
  }
  getsearchresult(searchInput.value);
});

const nex = () => {
  page++;
  pageNumber.innerText = page;
  if (searchInput.value === "") {
    console.log("null");
    // pageNumber.innerHTML = page;
    likeCountsUpdate(page);
  } else {
    getsearchresult(searchInput.value, page);
  }
};
nextPageBtn.addEventListener("click", () => {
  nex();
});

const prev = () => {
  page--;
  if (searchInput.value === "") {
    pageNumber.innerText = page;
    console.log("null");
    likeCountsUpdate(page);
  } else {
    pageNumber.innerHTML = page;
    getsearchresult(searchInput.value, page);
  }

  // getsearchresult(searchInput.value, page--);
  // pageNumber.innerHTML = page;
};

prevPageBtn.addEventListener("click", () => {
  if (page <= 1) {
    alert("you are on the first page");
  } else {
    prev();
  }
});

// make enter key search
searchInput.addEventListener("keyup", (e) => {
  page = 1;
  pageNumber.innerHTML = page;

  if (e.keyCode === 13) {
    getsearchresult(searchInput.value);
  }
});
