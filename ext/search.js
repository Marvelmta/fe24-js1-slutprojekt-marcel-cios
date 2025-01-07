document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value.trim();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }
    search(query);
});

document.getElementById('topRatedButton').addEventListener('click', () => {
    showSection('topRated');
    fetchMovies('/movie/top_rated', 'topRated', 10);
    toggleSearchVisibility(false); 
});

document.getElementById('mostPopularButton').addEventListener('click', () => {
    showSection('mostPopular');
    fetchMovies('/movie/popular', 'mostPopular', 10);
    toggleSearchVisibility(false); 
});

function showSection(sectionId) {
    const sections = ['topRated', 'mostPopular', 'searchMovies', 'searchPeople'];
    sections.forEach(id => {
        document.getElementById(id).classList.toggle('hidden', id !== sectionId);
    });
    if (sectionId === 'searchMovies' || sectionId === 'searchPeople') {
        toggleSearchVisibility(true); 
    }
}

function toggleSearchVisibility(isVisible) {
    const searchField = document.getElementById('searchQuery').parentElement; 
    const searchButton = document.getElementById('searchButton'); 

    if (isVisible) {
        searchField.style.display = ''; 
        searchButton.style.display = ''; 
    } else {
        searchField.style.display = 'none'; 
        searchButton.style.display = 'none'; 
    }
}

// ---------------------------- ChatGPT Hjälpte ----------------------------
async function search(query) {

    document.getElementById('searchMovies').innerHTML = ''; 
    document.getElementById('searchPeople').innerHTML = ''; 

    const searchType = document.getElementById('searchType').value;

    try {
        const data = await fetchSearchResults(query);
        const movies = data.results.filter(result => result.media_type === 'movie' || result.media_type === 'tv');
        const people = data.results.filter(result => result.media_type === 'person');

        if (searchType === 'movies') {
            const allMedia = movies;
            allMedia.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0)); 
            displayMoviesWithDescription(allMedia, 'searchMovies');
            document.getElementById('searchMovies').classList.remove('hidden');
        } else if (searchType === 'people') {
            people.sort((a, b) => (a.name.toLowerCase().includes(query.toLowerCase()) ? -1 : 1));
            displayPeople(people, 'searchPeople');
            document.getElementById('searchPeople').classList.remove('hidden');
        } else {
            const allMedia = movies.concat(people);
            allMedia.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0)); 
            displayMoviesWithDescription(movies, 'searchMovies');
            displayPeople(people, 'searchPeople');
            document.getElementById('searchMovies').classList.remove('hidden');
            document.getElementById('searchPeople').classList.remove('hidden');
        }

        if (searchType === 'movies' && movies.length === 0) {
            document.getElementById('searchMovies').innerHTML = '<p>No movies or TV shows found.</p>';
        } else if (searchType === 'people' && people.length === 0) {
            document.getElementById('searchPeople').innerHTML = '<p>No actors found.</p>';
        }
    } catch (error) {
        console.error('Error during search:', error);
        alert('An error occurred while fetching results. Please try again later.');
    }
}

