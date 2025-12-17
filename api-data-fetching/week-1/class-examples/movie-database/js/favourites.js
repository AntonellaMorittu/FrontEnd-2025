// WITH TOGGLE BUTTON 

// window.addEventListener makes sure the HTML exists before JavaScript tries to use it.
window.addEventListener("DOMContentLoaded", () => {
  const results = document.getElementById("results");
  const favs = JSON.parse(localStorage.getItem("favourites") || "[]");

  if (!results) return;

  results.innerHTML = "";

  if (favs.length === 0) {
    results.innerHTML = `<p class="empty">No favourites yet.</p>`;
  } else {
    favs.forEach(movie => {
      const movieDiv = document.createElement("div");
      movieDiv.className = "movie";

      // Check if the movie is still in favourites
      const isFav = true; // If it's in the list, it is favorite
      const poster = movie.Poster !== "N/A" ? movie.Poster : "./no-poster.svg";

      movieDiv.innerHTML = `
      <a target="_blank" href="https://www.imdb.com/title/${movie.imdbID}">
        <h2 class="title">${movie.Title}</h2>
        <p>${movie.Year}</p>
       <img src="${poster}" alt="${movie.Title} poster">
      </a>
      <button class="favToggleBtn">${isFav ? "Remove from Favourites" : "Add to Favourites"}</button>
    `;


      const toggleBtn = movieDiv.querySelector(".favToggleBtn");

      toggleBtn.addEventListener("click", () => {
        const favsList = JSON.parse(localStorage.getItem("favourites") || "[]");
        const isCurrentlyFav = favsList.some(m => m.imdbID === movie.imdbID);

        if (isCurrentlyFav) {
          // Remove from favourites
          const updatedFavs = favsList.filter(m => m.imdbID !== movie.imdbID);
          localStorage.setItem("favourites", JSON.stringify(updatedFavs));
          // removes the whole movie card from the page
          movieDiv.remove(); // remove from page immediately
          alert("Removed from favourites!");
        }

        // If container is empty, show the empty message
        if (document.querySelectorAll("#results .movie").length === 0) {
          results.innerHTML = `<p class="empty">No favourites yet.</p>`;
        }
      });

      results.appendChild(movieDiv);
    });
  }
});
