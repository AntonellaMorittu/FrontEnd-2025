const apiKey = "bbc47393";
const apiUrl = "http://www.omdbapi.com/";
const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");


const searchMovie = async () => {
  let searchValue = searchInput.value;

  // .trim() remove spaces
  searchValue = searchValue.trim();
  // Checks if the user input is empty after trimming spaces before sending the request.
  if (searchValue === "") {
    // Clears previous results from the page
    results.innerHTML = "";
    return;
  }

  const url = `${apiUrl}?apikey=${apiKey}&t=${encodeURIComponent(searchValue)}`;

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
    results.textContent = "Something went wrong.";
    console.error(error);
  }
};

/* 
Debouncing is a programming technique used to limit how often a function runs, 
especially in response to rapid events like typing, scrolling, or window resizing.
 */

// it needs to live outside so it can keep track of the previous timer across multiple calls. That’s exactly what makes debouncing work.
let typingTimer;

// Listen for changes in the input field
searchInput.addEventListener("input", () => {
  /* 
  clearTimeout() allows only the last keystroke to trigger the search after 500 ms. 
  Cancels previous timer
  The clearTimeout() method of the Window interface cancels 
  a timeout previously established by calling Window.setTimeout(). */
  clearTimeout(typingTimer);
  // Wait 500ms after the user stops typing. Sets new timer
  typingTimer = setTimeout(searchMovie, 500);
});

const displayResults = (movie) => {
  // If you don’t clear the container, the new movie card is added below the old one.
  results.innerHTML = "";

  const title = movie.Title;
  const year = movie.Year;
  const poster = movie.Poster;
  const movieId = movie.imdbID;

  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");
  // movieDiv.innerHTML = movieDiv.innerHTML + `<h2>${title} (${year})</h2>`;
  movieDiv.innerHTML = `<a target="_blank" href="https://www.imdb.com/title/${movieId}">
  <h2>${title} (${year})</h2>
  ${poster !== "N/A"
      ? `<img src=${poster} alt="${title} poster"></img>
       `
      : `<div></div>`
    }
  </a>
  `;
  results.appendChild(movieDiv);
};