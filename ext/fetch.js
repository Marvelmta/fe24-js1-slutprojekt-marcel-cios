async function fetchMovies(endpoint, containerId, limit = 10) {
  try {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=1`;
    console.log(`Fetching from: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Response not OK:', response.status);
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    displayTopMovies(data.results.slice(0, limit), containerId);
  } catch (error) {
    console.error('Error fetching movies:', error);
    document.getElementById(containerId).innerHTML = `<p>Could not load movies. Please try again later.</p>`;
  }
}

async function fetchSearchResults(query) {
  const apiUrl = `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&api_key=${API_KEY}&language=en-UK`;
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }
      return await response.json();
      
  } catch (error) {
      console.error('Error during fetching search results:', error);
      throw error; 
  }
}

