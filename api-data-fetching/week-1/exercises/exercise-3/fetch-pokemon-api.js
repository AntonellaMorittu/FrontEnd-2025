// ------------------------------
// POKEMON API EXERCISE (GUIDED)
// ------------------------------

// HTML elements we will update:
const image = document.getElementById("image");
const name = document.getElementById("name");
const element = document.getElementById("element");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

// ------------------------------
// 1) Fetch the list of Pokémons
// ------------------------------
const fetchPokemons = async () => {
  try {
    // HINT: Add ?limit=10 to get the first 10 Pokémon
    const url = "https://pokeapi.co/api/v2/pokemon?limit=10";

    // TODO: Fetch the data using fetch()
    // TODO: Convert the response to JSON

    // HINT: Log the results to explore them
    // TODO: Log only the array of Pokémon objects (data.results)
    // TODO: Log the name of the first Pokémon
    // TODO: Log the names of ALL Pokémon in the array

  } catch (error) {
    console.log("Error fetching Pokémon:", error);
  }
};

// Uncomment to test
// fetchPokemons();


// ------------------------------
// 2) Pick ONE Pokémon to explore
// ------------------------------

// HINT: Copy the URL of a Pokémon you like from the list above
// Example URL format: https://pokeapi.co/api/v2/pokemon/pikachu

const fetchChosenPokemonData = async () => {
  try {
    // TODO: Fetch your chosen Pokémon data
    // TODO: Convert the response to JSON
    // TODO: Log the full data to explore the structure

    // HINT: Check what properties exist for sprites, types, weight, height, etc.

  } catch (error) {
    console.log("Error fetching chosen Pokémon:", error);
  }
};

// Uncomment to test
// fetchChosenPokemonData();


// ------------------------------
// 3) Update the DOM
// ------------------------------

// After exploring the data above, update the HTML table
// HINTS:
// - For the image: set `image.src`
// - For text fields: use `textContent` or `innerHTML`
// - If a property is an array (like types), you can use `.map()` and `.join()`


// ------------------------------
// 4) BONUS: Make it reusable
// ------------------------------

// HINT: You can create a function that takes a Pokémon ID or name
// and fetches its data to update the table dynamically
// Example: fetchPokemonDataReusable("pikachu");

// TODO: Create a function fetchPokemonDataReusable(pokemonIdOrName) {...}

// TODO: Create a button click handler that asks the user for input
// and calls your reusable function
