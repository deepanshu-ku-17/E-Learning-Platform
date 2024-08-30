document.addEventListener('DOMContentLoaded', function() {
    const resultsContainer = document.getElementById('searchResults');
    const paginationContainer = document.getElementById('pagination');
    const resultsPerPage = 6; // Adjust as needed
    let currentPage = 1;
    function getUrlParameter(name) {
        name = name.replace(/[$$]/, '\\[').replace(/[$$]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    function highlightText(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    const searchQuery = getUrlParameter('search_box');
    if (searchQuery) {
        // Simulate search results (replace with actual search logic in a real application)
        const allResults = [
            { title: "HTML Basics", description: "Learn the fundamentals of HTML", thumbnail: "html-icon.png" },
            { title: "CSS Styling", description: "Master CSS for beautiful web design", thumbnail: "css-icon.png" },
            { title: "JavaScript Essentials", description: "Dive into interactive web development", thumbnail: "js-icon.png" },
            // Add more results here to test pagination
        ];
        const filteredResults = allResults.filter(result => 
            result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        function displayResults(page) {
            resultsContainer.innerHTML = '';
            const start = (page - 1) * resultsPerPage;
            const end = start + resultsPerPage;
            const paginatedResults = filteredResults.slice(start, end);
            if (paginatedResults.length === 0) {
                resultsContainer.innerHTML = '<p class="no-results-message">No results found for "' + searchQuery + '".</p>';
            } else {
                paginatedResults.forEach(result => {
                    const resultBox = document.createElement('div');
                    resultBox.className = 'box';
                    resultBox.innerHTML = `
                        <img src="images/${result.thumbnail}" alt="${result.title} icon" class="course-thumbnail">
                        <h3>${highlightText(result.title, searchQuery)}</h3>
                        <p>${highlightText(result.description, searchQuery)}</p>
                        <a href="#" class="btn">View Course</a>
                    `;
                    resultsContainer.appendChild(resultBox);
                });
            }
            updatePagination(page);
        }
        function updatePagination(currentPage) {
            const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
            paginationContainer.innerHTML = '';
            if (totalPages > 1) {
                for (let i = 1; i <= totalPages; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.textContent = i;
                    pageButton.classList.add('page-btn');
                    if (i === currentPage) pageButton.classList.add('active');
                    pageButton.addEventListener('click', () => {
                        currentPage = i;
                        displayResults(currentPage);
                    });
                    paginationContainer.appendChild(pageButton);
                }
            }
        }
        displayResults(currentPage);
    } else {
        resultsContainer.innerHTML = '<p class="no-results-message">Please enter a search query.</p>';
    }
    // Handle new searches
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input[name="search_box"]').value;
            window.location.href = 'search.html?search_box=' + encodeURIComponent(searchTerm);
        });
    }
});
