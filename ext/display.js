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
        <p>Rating: ${movie.vote_average || 'N/A'}</p>
        <p>Release Date: ${movie.release_date || 'N/A'}</p>
      `;
      container.appendChild(movieDiv);
    });
  }
  
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
        <p>Rating: ${movie.vote_average || 'N/A'}</p>
        <p>Release Date: ${movie.release_date || 'N/A'}</p>
        <div class="details">
          <p>${movie.overview || 'No description available.'}</p>
        </div>
      `;
      container.appendChild(movieDiv);
    });
  }
  
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
  