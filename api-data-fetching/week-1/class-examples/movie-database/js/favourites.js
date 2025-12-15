window.addEventListener("DOMContentLoaded", () => {
  const favContainer = document.getElementById("favourites");
  const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
  if (!favContainer) return;
  favContainer.innerHTML = "";

  if (favs.length === 0) {
    favContainer.innerHTML = `<p class="empty">No favourites yet.</p>`;
  } else {
    favs.forEach(movie => {
      const div = document.createElement("div");
      div.className = "fav";
      div.innerHTML = `<a target="_blank" href="https://www.imdb.com/title/${movie.imdbID}">
        <h3>${movie.Title} (${movie.Year})</h3>
        <img src="${movie.Poster}" />
        </a>
      `;
      favContainer.appendChild(div);
    });
  }
});
