// Movie database

console.log("Movie database");

const apiKey = "bbc47393";
const apiUrl = "https://www.omdbapi.com/";
const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");

let typingTimer;

// Listen for changes in the input field
searchInput.addEventListener("input", () => {
  /* clearTimeout() allows only the last keystroke to trigger the search after 500 ms. */
  clearTimeout(typingTimer);
  // Wait 500ms after the user stops typing
  typingTimer = setTimeout(searchMovie, 500);
});


// Fetch some data
const searchMovie = async () => {
  let searchValue = searchInput.value;

  searchValue = searchValue.trim();
  if (searchValue === "") {
    results.innerHTML = "";
    return;
  }

  const url = `${apiUrl}?apikey=${apiKey}&s=${encodeURIComponent(searchValue)}`;

  try {
    // Handle the response data here
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const movie = await response.json();

    if (movie.Response === "True") {
      displayResults(movie);
    } else {
      results.textContent = "Invalid search, please try with another title."
    }
  } catch (error) {
    results.textContent = "We couldn’t load the movie. Please check your connection and try again.";
    console.error(error);
  }
};


// LocalStorage Helpers

// We use JSON because localStorage only stores strings, 
// and JSON lets us encode objects or arrays as strings without losing their structure.

// JSON.stringify() converts a JavaScript value into a string so it can be stored in localStorage
const saveFavourites = (list) => localStorage.setItem("favourites", JSON.stringify(list));

// parse value from string '["apple","banana"]' to JS array ["apple","banana"]
const getFavourites = () => JSON.parse(localStorage.getItem("favourites") || "[]");

// Check if movie is in favourites
const isInFavourites = (movieId) => {
  const fav = getFavourites();
  // some() an array method that tests whether at least one element passes a condition
  return fav.some(m => m.imdbID === movieId);
};


const addToFavourites = (movie) => {
  const fav = getFavourites();

  // Checks if any movie in the fav array has the same imdbID as the current movie to avoid duplicates.
  if (fav.some(m => m.imdbID === movie.imdbID)) {
    alert("Already in favourites.");
    return;
  }

  // Create a smaller object
  const favMovie = {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster
  };

  fav.push(favMovie);
  saveFavourites(fav);
  alert("Added to favourites!");
};


const removeFromFavourites = (movieId) => {
  const fav = getFavourites();
  // .filter() is an array method that creates a new array containing only the elements that satisfy a condition.
  const updatedFav = fav.filter(m => m.imdbID !== movieId);
  saveFavourites(updatedFav);
  alert("Removed from favourites!");
};


const displayResults = (data) => {
  results.innerHTML = ""; // Clear previous results

  if (!data.Search || data.Search.length === 0) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  }

  data.Search.forEach((movie) => {
    const title = movie.Title;
    const year = movie.Year;
    const poster = movie.Poster !== "N/A" ? movie.Poster : "./no-poster.svg";

    const movieId = movie.imdbID;
    const isFav = isInFavourites(movieId); // Check if already in favourites

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML = `
      <a target="_blank" href="https://www.imdb.com/title/${movie.imdbID}">
        <h2 class="title">${title}</h2>
        <p>${year}</p>
       <img src="${poster}" alt="${title} poster">
      </a>
      <button class="favoriteBtn">${isFav ? "Remove from Favourites" : "Add to Favourites"}</button>
    `;
    
    const favoriteButton = movieDiv.querySelector(".favoriteBtn");
    favoriteButton.addEventListener("click", () => {
      if (isInFavourites(movieId)) {
        removeFromFavourites(movieId);
        favoriteButton.textContent = "Add to Favourites";
      } else {
        addToFavourites(movie);
        favoriteButton.textContent = "Remove from Favourites";
      }
    });

    results.appendChild(movieDiv);
  });
};
