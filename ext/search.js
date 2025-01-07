// Event listener for the search form submission
document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.getElementById('searchQuery').value.trim();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }
    search(query);
});

// Event listener for the Top Rated button
document.getElementById('topRatedButton').addEventListener('click', () => {
    showSection('topRated');
    fetchMovies('/movie/top_rated', 'topRated', 10);
    toggleSearchVisibility(false); // Hide search field and button
});

// Event listener for the Most Popular button
document.getElementById('mostPopularButton').addEventListener('click', () => {
    showSection('mostPopular');
    fetchMovies('/movie/popular', 'mostPopular', 10);
    toggleSearchVisibility(false); // Hide search field and button
});

// Function to show the specified section and hide the search field/button
function showSection(sectionId) {
    const sections = ['topRated', 'mostPopular', 'searchMovies', 'searchPeople'];
    sections.forEach(id => {
        document.getElementById(id).classList.toggle('hidden', id !== sectionId);
    });
    if (sectionId === 'searchMovies' || sectionId === 'searchPeople') {
        toggleSearchVisibility(true); // Show search field and button
    }
}

// Function to toggle visibility of the search field and button
function toggleSearchVisibility(isVisible) {
    const searchField = document.getElementById('searchQuery').parentElement; // Assuming search input is within a parent element
    const searchButton = document.getElementById('searchButton'); // Replace with the actual ID of your search button

    if (isVisible) {
        searchField.style.display = ''; // Show the search field
        searchButton.style.display = ''; // Show the search button
    } else {
        searchField.style.display = 'none'; // Hide the search field
        searchButton.style.display = 'none'; // Hide the search button
    }
}

// Your existing search function and other code remain unchanged
async function search(query) {
    // Clear previous search results
    document.getElementById('searchMovies').innerHTML = ''; // Clear movie results
    document.getElementById('searchPeople').innerHTML = ''; // Clear people results

    try {
        const data = await fetchSearchResults(query);
        const movies = data.results.filter(result => result.media_type === 'movie');
        const tvShows = data.results.filter(result => result.media_type === 'tv');
        const people = data.results.filter(result => result.media_type === 'person');

        // Combine movies and TV shows for display
        const allMedia = movies.concat(tvShows);

        // Sort allMedia based on vote_average in descending order (highest rating first)
        allMedia.sort((a, b) => {
            const ratingA = a.vote_average || 0; // Use 0 if rating is undefined
            const ratingB = b.vote_average || 0; // Use 0 if rating is undefined
            return ratingB - ratingA; // Sort in descending order
        });

        // Display sorted media results
        if (allMedia.length > 0) {
            displayMoviesWithDescription(allMedia, 'searchMovies');
            document.getElementById('searchMovies').classList.remove('hidden');
        } else {
            document.getElementById('searchMovies').innerHTML = '<p>No movies or TV shows found.</p>';
            document.getElementById('searchMovies').classList.remove('hidden');
        }

        // Sort people based on relevance to the query
        people.sort((a, b) => {
            return a.name.toLowerCase().includes(query.toLowerCase()) ? -1 :
                   b.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
        });

        // Display sorted people results
        if (people.length > 0) {
            displayPeople(people, 'searchPeople');
            document.getElementById('searchPeople').classList.remove('hidden');
        } else {
            document.getElementById('searchPeople').classList.remove('hidden');
        }

        if (movies.length === 0 && tvShows.length === 0 && people.length === 0) {
            document.getElementById('searchMovies').innerHTML = '<p>No results found.</p>';
            document.getElementById('searchMovies').classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error during search:', error);
        alert('An error occurred while fetching results. Please try again later.');
    }
}
