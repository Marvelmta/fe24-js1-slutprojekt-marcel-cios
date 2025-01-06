const API_KEY = '014f71c8da56fd561210cb207eebc457'; // Byt ut med din TMDb API-nyckel
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

// Funktion för att hämta filmer från en endpoint
async function fetchMovies(endpoint, containerId, limit = 10) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch movies');
    const data = await response.json();
    displayTopMovies(data.results.slice(0, limit), containerId);
  } catch (error) {
    console.error(error);
    document.getElementById(containerId).innerHTML = `<p>Could not load movies.</p>`;
  }
}

// Funktion för att visa Top-10 filmer (utan beskrivning)
function displayTopMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if (movies.length === 0) {
    container.innerHTML = '<p>No movies found.</p>';
    return;
  }
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title || 'No title'}">
      <h3>${movie.title || 'No title'}</h3>
      <p>Release Date: ${movie.release_date || 'N/A'}</p>
    `;
    container.appendChild(movieDiv);
  });
}

// Funktion för att visa sökresultat för filmer (med beskrivning)
function displayMoviesWithDescription(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if (movies.length === 0) {
    container.innerHTML = '<p>No movies found.</p>';
    return;
  }
  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title || 'No title'}">
      <h3>${movie.title || 'No title'}</h3>
      <p>Release Date: ${movie.release_date || 'N/A'}</p>
      <div class="details">
        <p>${movie.overview || 'No description available.'}</p>
      </div>
    `;
    container.appendChild(movieDiv);
  });
}

// Funktion för att visa personer
function displayPeople(people) {
  const container = document.getElementById('searchPeople');
  container.innerHTML = '';
  if (people.length === 0) {
    container.innerHTML = '<p>No people found.</p>';
    return;
  }
  people.forEach(person => {
    const personDiv = document.createElement('div');
    personDiv.classList.add('person');
    const knownFor = person.known_for.map(item => {
      return `${item.media_type === 'movie' ? 'Movie' : 'TV'}: ${item.title || item.name}`;
    }).join('<br>');
    personDiv.innerHTML = `
      <img src="${IMAGE_BASE_URL}${person.profile_path}" alt="${person.name || 'No name'}">
      <h3>${person.name || 'No name'}</h3>
      <p>Known For: ${person.known_for_department || 'N/A'}</p>
      <div class="details">
        <p>${knownFor || 'No known works.'}</p>
      </div>
    `;
    container.appendChild(personDiv);
  });
}

// Funktion för sökning
async function search(event) {
  event.preventDefault(); // Förhindra att formuläret laddar om sidan
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) {
    alert('Please enter a search term.');
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch search results');
    const data = await response.json();

    const movies = data.results.filter(result => result.media_type === 'movie');
    const people = data.results.filter(result => result.media_type === 'person');

    displayMoviesWithDescription(movies, 'searchMovies');
    displayPeople(people);
  } catch (error) {
    console.error(error);
    document.getElementById('searchMovies').innerHTML = '<p>Could not fetch movie results.</p>';
    document.getElementById('searchPeople').innerHTML = '<p>Could not fetch person results.</p>';
  }
}

// Lägg till eventlyssnare på formuläret
document.getElementById('searchForm').addEventListener('submit', search);

// Initiering: Hämta populära och högst rankade filmer
fetchMovies('/movie/top_rated', 'topRated', 10);
fetchMovies('/movie/popular', 'mostPopular', 10);

