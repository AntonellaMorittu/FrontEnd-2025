
const apiKey = "bbc47393";
const apiUrl = "http://www.omdbapi.com/";
const searchInput = document.getElementById("searchInput")
const results = document.getElementById("results")


const searchMovie = async () => {
  let searchValue = searchInput.value

  searchValue = searchValue.trim()

  const url = `${apiUrl}?apikey=${apiKey}&t=${searchValue}`;

  try {
    const response = await (fetch(url))

    if (!response.ok) {
      throw new Error("Network reponse was not ok")
    }

    const movie = await response.json()

    if (movie.Response === "True") {
      console.log("movie", movie)
      displayResults(movie)
    } else {
      results.textContent = ""
    }
  } catch (error) {
    results.textContent = error
  }
}

let typingTimer

searchInput.addEventListener("input", () => {
  clearTimeout(typingTimer)
  typingTimer = setTimeout(searchMovie, 500)
})

const displayResults = (movie) => {
  results.innerHTML = ""

  const title = movie.Title
  const year = movie.Year
  const poster = movie.Poster
  const movieId = movie.imdbID

  const movieDiv = document.createElement("div")
  movieDiv.classList.add("movie")

  movieDiv.innerHTML = `<a target="_blank" href="https://www.imdb.com/title/${movieId}">
    <h2>${title} (${year})</h2>
    ${poster !== "N/A" ? `<img src=${poster} alt=${title} poster"></img>`
      : `<div></div>`
    }
    </a>
  `
  results.appendChild(movieDiv)
}