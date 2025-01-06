// async function search(event) {
//     event.preventDefault();
//     const query = document.getElementById('searchQuery').value.trim();
//     if (!query) {
//       alert('Please enter a search term.');
//       return;
//     }
//     try {
//       const data = await fetchSearchResults(query);
//       console.log('Search results:', data);
//       const movies = data.results.filter(result => result.media_type === 'movie');
//       const people = data.results.filter(result => result.media_type === 'person');
//       displayMoviesWithDescription(movies, 'searchMovies');
//       displayPeople(people);
//     } catch (error) {
//       console.error('Error during search:', error);
//       document.getElementById('searchMovies').innerHTML = '<p>Could not fetch movie results. Please try again later.</p>';
//       document.getElementById('searchPeople').innerHTML = '<p>Could not fetch person results. Please try again later.</p>';
//     }
//   }
  
//   // Lägg till eventlyssnare på formuläret
//   document.getElementById('searchForm').addEventListener('submit', search);
  
//   // Initiering: Hämta populära och högst rankade filmer
//   fetchMovies('/movie/top_rated', 'topRated', 10);
//   fetchMovies('/movie/popular', 'mostPopular', 10);
  
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

      // Visa filmer och personer
      displayMoviesWithDescription(movies, 'searchMovies');
      displayPeople(people);

      // Visa alert om inga resultat hittades
      if (movies.length === 0 && people.length === 0) {
          alert('No movies or people found for your search.');
      }
  } catch (error) {
      console.error('Error during search:', error);
      alert('An error occurred while fetching results. Please try again later.');
  }
}

// Lägg till eventlyssnare på formuläret
document.getElementById('searchForm').addEventListener('submit', search);

// Initiering: Hämta populära och högst rankade filmer
fetchMovies('/movie/top_rated', 'topRated', 10);
fetchMovies('/movie/popular', 'mostPopular', 10);
