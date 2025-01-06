async function fetchMovies(endpoint, containerId, limit = 10) {
    try {
      const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
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
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    console.log(`Searching with query: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch search results');
    return response.json();
  }
  