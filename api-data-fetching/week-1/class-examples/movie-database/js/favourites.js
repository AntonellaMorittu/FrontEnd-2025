// WITH TOGGLE BUTTON 

// window.addEventListener makes sure the HTML exists before JavaScript tries to use it.
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

      // Check if the movie is still in favourites
      const isFav = true; // If it's in the list, it is favorite

      div.innerHTML = `
        <a target="_blank" href="https://www.imdb.com/title/${movie.imdbID}">
          <h3>${movie.Title} (${movie.Year})</h3>
          <img src="${movie.Poster}" alt="${movie.Title} poster"/>
        </a>
        <button class="favToggleBtn">${isFav ? "Remove from Favourites" : "Add to Favourites"}</button>
      `;

      const toggleBtn = div.querySelector(".favToggleBtn");
      toggleBtn.addEventListener("click", () => {
        const favsList = JSON.parse(localStorage.getItem("favourites") || "[]");
        const isCurrentlyFav = favsList.some(m => m.imdbID === movie.imdbID);

        if (isCurrentlyFav) {
          // Remove from favourites
          const updatedFavs = favsList.filter(m => m.imdbID !== movie.imdbID);
          localStorage.setItem("favourites", JSON.stringify(updatedFavs));
          // removes the whole movie card from the page
          div.remove(); // remove from page immediately
          alert("Removed from favourites!");
        }

        // If container is empty, show the empty message
        if (document.querySelectorAll("#favourites .fav").length === 0) {
          favContainer.innerHTML = `<p class="empty">No favourites yet.</p>`;
        }
      });

      favContainer.appendChild(div);
    });
  }
});
