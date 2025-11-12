// Travel data embedded directly to avoid CORS issues
const travelData = {
  "countries": [
    {
      "id": 1,
      "name": "Australia",
      "cities": [
        {
          "name": "Sydney, Australia",
          "imageUrl": "enter_your_image_for_sydney.jpg",
          "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
        },
        {
          "name": "Melbourne, Australia",
          "imageUrl": "enter_your_image_for_melbourne.jpg",
          "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
        }
      ]
    },
    {
      "id": 2,
      "name": "Japan",
      "cities": [
        {
          "name": "Tokyo, Japan",
          "imageUrl": "enter_your_image_for_tokyo.jpg",
          "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
        },
        {
          "name": "Kyoto, Japan",
          "imageUrl": "enter_your_image_for_kyoto.jpg",
          "description": "Known for its historic temples, gardens, and traditional tea houses."
        }
      ]
    },
    {
      "id": 3,
      "name": "Brazil",
      "cities": [
        {
          "name": "Rio de Janeiro, Brazil",
          "imageUrl": "enter_your_image_for_rio.jpg",
          "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks."
        },
        {
          "name": "São Paulo, Brazil",
          "imageUrl": "enter_your_image_for_sao-paulo.jpg",
          "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
        }
      ]
    }
  ],
  "temples": [
    {
      "id": 1,
      "name": "Angkor Wat, Cambodia",
      "imageUrl": "enter_your_image_for_angkor-wat.jpg",
      "description": "A UNESCO World Heritage site and the largest religious monument in the world."
    },
    {
      "id": 2,
      "name": "Taj Mahal, India",
      "imageUrl": "enter_your_image_for_taj-mahal.jpg",
      "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
    }
  ],
  "beaches": [
    {
      "id": 1,
      "name": "Bora Bora, French Polynesia",
      "imageUrl": "enter_your_image_for_bora-bora.jpg",
      "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
    },
    {
      "id": 2,
      "name": "Copacabana Beach, Brazil",
      "imageUrl": "enter_your_image_for_copacabana.jpg",
      "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
    }
  ]
};

// Timezone mapping for countries (optional feature)
const countryTimezones = {
    'Australia': 'Australia/Sydney',
    'Japan': 'Asia/Tokyo',
    'Brazil': 'America/Sao_Paulo',
    'Sydney, Australia': 'Australia/Sydney',
    'Melbourne, Australia': 'Australia/Melbourne',
    'Tokyo, Japan': 'Asia/Tokyo',
    'Kyoto, Japan': 'Asia/Tokyo',
    'Rio de Janeiro, Brazil': 'America/Sao_Paulo',
    'São Paulo, Brazil': 'America/Sao_Paulo'
};

// Initialize: Data is already loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('Travel data loaded successfully:', travelData);
    
    // Add Enter key support for search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchRecommendations();
            }
        });
    }
});

// Navigation functions
function showHome() {
    document.getElementById('homeSection').classList.remove('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactSection').classList.add('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('searchContainer').style.display = 'flex';
    document.getElementById('resultsContainer').innerHTML = '';
}

function showAboutUs() {
    document.getElementById('homeSection').classList.add('hidden');
    document.getElementById('aboutSection').classList.remove('hidden');
    document.getElementById('contactSection').classList.add('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('searchContainer').style.display = 'none';
}

function showContactUs() {
    document.getElementById('homeSection').classList.add('hidden');
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactSection').classList.remove('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('searchContainer').style.display = 'none';
}

// Book Now button functionality
function bookNow() {
    // Scroll to the search bar
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // Make sure we're on the home page
        showHome();
        // Scroll to navbar smoothly
        document.querySelector('.navbar').scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Focus on search input after a short delay to allow scroll
        setTimeout(() => {
            searchInput.focus();
        }, 500);
    }
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for contacting us! We will get back to you soon.');
    
    // Reset form
    event.target.reset();
}

// Search recommendations based on keyword
function searchRecommendations() {
    const searchInput = document.getElementById('searchInput');
    const searchMessage = document.getElementById('searchMessage');
    const keyword = searchInput.value.trim().toLowerCase();
    
    if (!keyword) {
        searchMessage.textContent = 'Please enter a valid search query.';
        searchMessage.classList.remove('hidden');
        return;
    }
    
    searchMessage.classList.add('hidden');
    
    if (!travelData) {
        alert('Travel data is not available.');
        return;
    }
    
    // Show results section as sidebar, keep home section visible
    document.getElementById('aboutSection').classList.add('hidden');
    document.getElementById('contactSection').classList.add('hidden');
    document.getElementById('homeSection').classList.remove('hidden');
    document.getElementById('resultsSection').classList.remove('hidden');
    
    let results = [];
    
    // Check for beach/beaches keyword
    if (keyword === 'beach' || keyword === 'beaches') {
        results = travelData.beaches || [];
    }
    // Check for temple/temples keyword
    else if (keyword === 'temple' || keyword === 'temples') {
        results = travelData.temples || [];
    }
    // Check for country/countries keyword
    else if (keyword === 'country' || keyword === 'countries') {
        // Flatten countries and their cities
        travelData.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push({
                    name: city.name,
                    imageUrl: city.imageUrl,
                    description: city.description,
                    country: country.name
                });
            });
        });
    }
    // Check if keyword matches a specific country name
    else {
        travelData.countries.forEach(country => {
            if (country.name.toLowerCase() === keyword) {
                country.cities.forEach(city => {
                    results.push({
                        name: city.name,
                        imageUrl: city.imageUrl,
                        description: city.description,
                        country: country.name
                    });
                });
            }
        });
    }
    
    // Display results
    displayResults(results);
}

// Display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; font-size: 1.2rem; color: #7f8c8d;">No results found. Please try searching for "beach", "temple", or "country".</p>';
        return;
    }
    
    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';
        
        // Use placeholder image if imageUrl is not provided or is placeholder
        let imageSrc = item.imageUrl;
        if (!imageSrc || imageSrc.includes('enter_your_image')) {
            // Use placeholder images from Unsplash based on the name
            imageSrc = getPlaceholderImage(item.name);
        }
        
        // Get time information if available (optional feature)
        const timeInfo = getTimeInfo(item.name, item.country);
        
        card.innerHTML = `
            <img src="${imageSrc}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x200?text=${encodeURIComponent(item.name)}'">
            <div class="result-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                ${timeInfo ? `<div class="time-info">${timeInfo}</div>` : ''}
                <button class="visit-btn">Visit</button>
            </div>
        `;
        
        resultsContainer.appendChild(card);
    });
}

// Get placeholder image URL based on location name
function getPlaceholderImage(name) {
    const imageMap = {
        'Sydney, Australia': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'Melbourne, Australia': 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=800',
        'Tokyo, Japan': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
        'Kyoto, Japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
        'Rio de Janeiro, Brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
        'São Paulo, Brazil': 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800',
        'Angkor Wat, Cambodia': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
        'Taj Mahal, India': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
        'Bora Bora, French Polynesia': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        'Copacabana Beach, Brazil': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
    };
    
    return imageMap[name] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
}

// Get time information for a location (optional feature - Task 10)
function getTimeInfo(locationName, countryName) {
    const timezone = countryTimezones[locationName] || countryTimezones[countryName];
    
    if (!timezone) {
        return null;
    }
    
    try {
        const options = {
            timeZone: timezone,
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        
        const localTime = new Date().toLocaleTimeString('en-US', options);
        return `Current time: ${localTime}`;
    } catch (error) {
        console.error('Error getting time info:', error);
        return null;
    }
}

// Clear search results
function clearResults() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchMessage').classList.add('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('resultsContainer').innerHTML = '';
}

