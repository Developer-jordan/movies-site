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
         <a class="clean"  href="${download}">
           <img src="${img}" alt="${title} movie poster" />
         </a>
         <div class="info">
           <h1 class ="titles">${title}</h1>
           <p>${date}</p>
         </div>
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
        <a class="clean" tittle="link to download ${title} movie" href="${download}">
        <img src="${img}" alt="${title} movie poster" />
        </a>
        <div class="info">
        <h1 class ="titles">${title}</h1>
        <p>${date}</p>
        </div>
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
  }
  getsearchresult(searchInput.value);
});
const nex = () => {
  page++;
  pageNumber.innerText = page;
  if (searchInput.value === "") {
    console.log("null");
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
};
prevPageBtn.addEventListener("click", () => {
  if (page <= 1) {
    alert("you are on the first page");
  } else {
    prev();
  }
});
searchInput.addEventListener("keydown", (e) => {
  page = 1;
  pageNumber.innerHTML = page;

  if (e.keyCode === 48) {
    getsearchresult(searchInput.value);
  }
});
