const params = new URLSearchParams(window.location.search);
const movieID = params.get('id'); 

console.log(movieID);

async function getMovieDetails() {
    let apiKey = "d26cca7e";

    let response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`);
    let data = await response.json();

    const detailsContainer = document.getElementById('detailsContainer');

    detailsContainer.innerHTML = `
    <button class="back-btn" onclick="window.location.href='index.html'">← Back to Search</button>
    <div class=details-content>
        <img src="${data.Poster}" alt="${data.Title}">
        <div class="details-text">
            <h1>${data.Title} (${data.Year})</h1>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>IMDB Rating:</strong> ${data.imdbRating} ⭐</p>    
        </div>
    </div>
    `;

}

getMovieDetails();