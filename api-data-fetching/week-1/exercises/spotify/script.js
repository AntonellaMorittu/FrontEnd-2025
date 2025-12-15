const artistInput = document.getElementById('artistInput');
const searchBtn = document.getElementById('searchBtn');
const artistContainer = document.getElementById('artistContainer');
const tracksContainer = document.getElementById('tracksContainer');

searchBtn.addEventListener('click', () => {
  const artistName = artistInput.value.trim();
  if (artistName) {
    searchArtist(artistName);
  }
});

async function searchArtist(name) {
  try {
    artistContainer.innerHTML = '';
    tracksContainer.innerHTML = '';

    // 1. Fetch artist info
    const artistResponse = await fetch(
      // test error: "https://example.com/does-not-exist"
      `https://spotify-api-wrapper.appspot.com/artist/${encodeURIComponent(name)}`
    );

    console.log(artistResponse)
    if (!artistResponse.ok) {
      throw new Error(`Request failed with status ${artistResponse.status}`);
    }

    const artistData = await artistResponse.json();

    const artist = artistData.artists.items[0];

    if (!artist) {
      artistContainer.innerText = "Artist not found.";
      return;
    }

    // Display artist name + image
    artistContainer.innerHTML = `
            <h2>${artist.name}</h2>
            <img src="${artist.images[0]?.url}" width="200">
        `;

    // 2. Fetch top tracks using artist ID
    const id = artist.id;
    const topTracksResponse = await fetch(
      `https://spotify-api-wrapper.appspot.com/artist/${id}/top-tracks`
    );
    const topTracksData = await topTracksResponse.json();

    console.log("Number of tracks:", topTracksData.tracks.length);

    // Display each track with 30 sec preview
    topTracksData.tracks.forEach((track, index) => {
      const div = document.createElement('div');
      div.innerHTML = `
                <p>${index + 1}. ${track.name}</p>
                <img src="${track.album.images[0]?.url}" width="100">
            `;
      tracksContainer.appendChild(div);
    });

  } catch (error) {
    artistContainer.innerText = "We couldn’t load the data. Please check your connection and try again.";
    console.error(error);
  }
}