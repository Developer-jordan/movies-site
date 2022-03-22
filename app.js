const likeCountsUpdate = () => {
  fetch("https://yts.mx/api/v2/list_movies.json?sort_by=like_count")
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
