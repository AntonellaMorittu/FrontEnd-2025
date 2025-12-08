// 🎯 Beginner Fetch Exercise: Random Dog Image
// ----------------------------------------------------
// Objective: Fetch a random dog image from an API
// and display it on the web page when the button is clicked.

// Step 1: Grab the button and the container div from the HTML
const button = document.getElementById("fetchButton");
const dogContainer = document.getElementById("dogContainer");

// Step 2: Create a function called fetchDog
// Inside this function, you will:
//  1) Use fetch() to get data from "https://dog.ceo/api/breeds/image/random"
//  2) Parse the response as JSON
//  3) Log the JSON to the console to see what it looks like
//  4) Create an <img> element and set its src to the image URL from the API
//  5) Append the image to the dogContainer div
//  6) (Optional) Clear the container first if you only want one image at a time
const fetchDog = () => {
  // TODO: Write your fetch logic here
};

// Step 3: Attach an event listener to the button
// When the button is clicked, the fetchDog function should run
button.addEventListener("click", fetchDog);

// ✅ Hints for beginners:
// - The API response looks like this:
//   {
//     "message": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
//     "status": "success"
//   }
// - So the image URL is in response.message
// - Use document.createElement("img") to create the image
// - Use container.appendChild(image) to display it on the page
