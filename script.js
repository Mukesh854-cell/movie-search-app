const searchInput = document.getElementById('search');
const resultContainer = document.getElementById('movieResult');
const searchBtn = document.getElementById('search-btn');

async function searchMovies() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
    resultContainer.innerHTML = '';

    let searchTerm = searchInput.value;
    let apiKey = "d26cca7e";

    localStorage.setItem('lastSearch', searchTerm);

    let response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
    let data = await response.json();

    spinner.style.display = 'none';

    if (data.Response === "True") {
        data.Search.forEach((movie) => {
            const card =  document.createElement('div');
            card.className = 'movie-card';
    
            const posterUrl = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x280?text=No+Image";
            
            card.innerHTML = `
            <img src="${posterUrl}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <button class="details-btn" data-id="${movie.imdbID}">View Details</button>
            </div>
            `;

            card.querySelector('.details-btn').addEventListener('click', () => {
                window.location.href = `details.html?id=${movie.imdbID}`;
            })
            
            resultContainer.appendChild(card);
        });
    } else {
        resultContainer.innerHTML = `<p style="color: white;"> ${data.Error}</p>`;
    }
}

searchBtn.addEventListener('click', searchMovies);

window.addEventListener('load', () => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        searchInput.value = lastSearch;
        searchMovies();
    };
})