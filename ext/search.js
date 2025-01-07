async function search(event) {
  event.preventDefault(); // Förhindra att formuläret laddar om sidan
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) {
      alert('Please enter a search term.');
      return;
  }
  try {
      const data = await fetchSearchResults(query);
      console.log('Search results:', data);
      const movies = data.results.filter(result => result.media_type === 'movie');
      const people = data.results.filter(result => result.media_type === 'person');

      
      displayMoviesWithDescription(movies, 'searchMovies');
      displayPeople(people);

      
      if (movies.length === 0 && people.length === 0) {
          alert('No movies or people found for your search.');
      }
  } catch (error) {
      console.error('Error during search:', error);
      alert('An error occurred while fetching results. Please try again later.');
  }
}

document.getElementById('searchForm').addEventListener('submit', search);


fetchMovies('/movie/top_rated', 'topRated', 10);
fetchMovies('/movie/popular', 'mostPopular', 10);
