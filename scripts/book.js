function addBookingListeners() {
    const searchBar = document.getElementById('search-bar');
    const searchResults = document.getElementById('search-results');
    
    searchBar.addEventListener('focus', function() {
        searchResults.classList.add('active');
    });
    
    searchBar.addEventListener('blur', function() {
        // needed timeout so can select bottom ones kinda weird ig
        setTimeout(() => {
            searchResults.classList.remove('active');
        }, 200);
    });
    
    searchBar.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        const items = searchResults.getElementsByClassName('location-item');
        
        for (let item of items) {
            const text = item.textContent.toLowerCase();
            if (text.includes(value)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
        
        if (value) {
            searchResults.classList.add('active');
        } else {
            searchResults.classList.remove('active');
        }
    });
}


function selectLocation(location) {
    document.getElementById('search-bar').value = location;
    document.getElementById('search-results').classList.remove('active');
}