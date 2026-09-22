// ==========================================
// 1. FOOTER DATES & MENU TOGGLES
// ==========================================
// Set Current Year and Last Modified Date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Hamburger Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');

menuBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    menuBtn.textContent = primaryNav.classList.contains('open') ? '✖' : '☰';
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Note: You will need to add .dark-mode rules in your CSS if you want the colors to actually change!
});


// ==========================================
// 2. WEATHER API (Current & 3-Day Forecast)
// ==========================================
// Coordinates for Bafoussam, Cameroon
const lat = 5.4778;
const lon = 10.4181;
const apiKey = '3eee314d07edd7d6209a1c664acba70c';

// Use 'metric' for Celsius or 'imperial' for Fahrenheit
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        // Fetch Current Weather
        const weatherResponse = await fetch(weatherUrl);
        if (weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            displayCurrentWeather(weatherData);
        }

        // Fetch 3-Day Forecast
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayCurrentWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const desc = data.weather[0].description.replace(/\b\w/g, char => char.toUpperCase());
    
    // Extract the icon code from the API and build the image URL
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    weatherInfo.innerHTML = `
        <div class="current-weather-card">
            <img src="${iconUrl}" alt="${desc}" class="weather-icon">
            <div class="weather-details">
                <p class="temp">${Math.round(data.main.temp)}&deg;C</p>
                <p class="condition">${desc}</p>
                <p class="humidity">Humidity: ${data.main.humidity}%</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    
    // Set up a flexbox grid for the 3 days
    forecastContainer.innerHTML = '<h3>3-Day Forecast</h3><div class="forecast-grid"></div>';
    const grid = forecastContainer.querySelector('.forecast-grid');
    
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    dailyForecasts.forEach(dayData => {
        const date = new Date(dayData.dt_txt);
        const dayName = days[date.getDay()];
        const temp = Math.round(dayData.main.temp);
        
        // Extract the icon for each forecast day
        const iconCode = dayData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        
        grid.innerHTML += `
            <div class="forecast-day">
                <p><strong>${dayName}</strong></p>
                <img src="${iconUrl}" alt="Forecast Icon">
                <p>${temp}&deg;C</p>
            </div>
        `;
    });
}

fetchWeather();


// ==========================================
// 3. MEMBER SPOTLIGHTS 
// ==========================================
async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error("Failed to load members.json");
        
        const members = await response.json();
        console.log("1. Total Members Found:", members); 

        
        const qualifiedMembers = members.filter(member => {
            let lvl = member.membershipLevel || member.level;
            return lvl == 2 || lvl == 3; 
        });

        console.log("2. Qualified Members (Level 2 or 3):", qualifiedMembers); 

        if (qualifiedMembers.length === 0) {
            console.error("Filter failed: No members found with a level of 2 or 3. Check your JSON formatting.");
            document.getElementById('spotlight-container').innerHTML = "<p>Spotlights currently unavailable.</p>";
            return;
        }

        // Shuffle array and select up to 3
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const selectedSpotlights = shuffled.slice(0, 3); 

        displaySpotlights(selectedSpotlights);
        
    } catch (error) {
        console.error("Spotlight Error:", error);
    }
}

const displaySpotlights = (spotlights) => {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    spotlights.forEach((member) => {
        let card = document.createElement('div');
        card.classList.add('spotlight-card');
        
        // Grab whichever key you used in your JSON
        let lvl = member.membershipLevel || member.level;
        let levelName = "";
        let levelClass = "";
        
        if (lvl == 3) {
            levelName = "Gold";
            levelClass = "gold";
        } else if (lvl == 2) {
            levelName = "Silver";
            levelClass = "silver";
        } else {
            levelName = "Standard";
            levelClass = "standard";
        }

        card.innerHTML = `
            <div class="card-header">
                <h3>${member.name}</h3>
                <span class="badge ${levelClass}">${levelName} Member</span>
            </div>
            <div class="card-logo">
                <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            </div>
            <div class="card-details">
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
            </div>
            <a href="${member.website}" target="_blank" class="spotlight-btn">Visit Website</a>
        `;
        container.appendChild(card);
    });
};

getSpotlights();