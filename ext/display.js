function displayTopMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if (movies.length === 0) {
    container.innerHTML = '<p>No movies or TV shows found.</p>';
    return;
  }
  movies.forEach(movie => {
    const title = movie.title || movie.name || 'No title';
    const releaseDate = movie.release_date || movie.first_air_date || 'N/A';
    const poster = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '';

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
      <img src="${poster}" alt="${title}">
      <h3>${title}</h3>
      <p>Rating: ${movie.vote_average || 'N/A'}</p>
      <p>Release Date: ${releaseDate}</p>
    `;
    container.appendChild(movieDiv);
  });
}

function displayMoviesWithDescription(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if (movies.length === 0) {
      container.innerHTML = '<p>No movies or TV shows found.</p>';
      return;
  }
  movies.forEach(movie => {
      const title = movie.title || movie.name || 'No title';
      const releaseDate = movie.release_date || movie.first_air_date || 'N/A';
      const overview = movie.overview || 'No description available.';
      const poster = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '';
      const mediaType = movie.media_type === 'movie' ? 'Film' : 'TV Show'; // Determine the type

      // Only add to the display if there is a poster
      if (poster) {
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('movie');
          movieDiv.innerHTML = `
              <img src="${poster}" alt="${title}">
              <h3>${title} (${mediaType})</h3> <!-- Include media type here -->
              <p>Rating: ${movie.vote_average || 'N/A'}</p>
              <p>Release Date: ${releaseDate}</p>
              <div class="details">
                  <p>${overview}</p>
              </div>
          `;
          container.appendChild(movieDiv);
      }
  });
}



function displayPeople(people, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (people.length === 0) {
      container.innerHTML = '<p>No actors found.</p>';
      return;
  }

  people.forEach(person => {
      const profileImage = person.profile_path 
          ? `https://image.tmdb.org/t/p/w500${person.profile_path}` 
          : 'path/to/default/image.jpg'; // Use a default image if no profile exists

      // Only add to the display if there is a profile image
      if (person.profile_path) {
          const personDiv = document.createElement('div');
          personDiv.classList.add('person');

          const knownForRole = person.known_for_department || 'Unknown role';

          const knownForWorks = person.known_for && person.known_for.length > 0 
              ? `<ul>${person.known_for.map(movie => {
                  const title = movie.title || movie.name;
                  const type = movie.media_type === 'movie' ? 'Film' : 'TV Show';
                  return `<li>${title} (${type})</li>`;
              }).join('')}</ul>`
              : '<p>No known movies or series.</p>';

          personDiv.innerHTML = `
              <img src="${profileImage}" alt="${person.name}">
              <h3>${person.name}</h3>
              <p>Role: ${knownForRole}</p>
              <p>Known for:</p>
              ${knownForWorks}
          `;
          
          container.appendChild(personDiv);
      }
  });
}



