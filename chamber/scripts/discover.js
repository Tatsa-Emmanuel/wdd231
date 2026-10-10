// ==========================================
// 1. FOOTER DATES & MENU TOGGLES 
// ==========================================
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');
if (menuBtn && primaryNav) {
    menuBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
        menuBtn.textContent = primaryNav.classList.contains('open') ? '✖' : '☰';
    });
}

const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

// ==========================================
// 2. LOCALSTORAGE VISITOR MESSAGES
// ==========================================
const visitorMsgContainer = document.getElementById('visitor-message');

if (visitorMsgContainer) {
    const lastVisit = localStorage.getItem('last-visit');
    const now = Date.now();
    
    // Store the new visit date
    localStorage.setItem('last-visit', now);

    if (!lastVisit) {
        visitorMsgContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDiff = now - parseInt(lastVisit);
        const msInDay = 24 * 60 * 60 * 1000;
        
        if (timeDiff < msInDay) {
            visitorMsgContainer.textContent = "Back so soon! Awesome!";
        } else {
            const days = Math.floor(timeDiff / msInDay);
            const dayText = days === 1 ? "day" : "days";
            visitorMsgContainer.textContent = `You last visited ${days} ${dayText} ago.`;
        }
    }
}

// ==========================================
// 3. FETCH JSON & RENDER CARDS
// ==========================================
async function getDiscoverItems() {
    try {
        const response = await fetch('data/discover.json');
        if (!response.ok) throw new Error('Failed to fetch JSON');
        
        const discoverItems = await response.json();
        displayItems(discoverItems);
    } catch (error) {
        console.error("Error loading items:", error);
        document.getElementById('discover-container').innerHTML = '<p>Sorry, failed to load regional data.</p>';
    }
}

function displayItems(items) {
    const container = document.getElementById('discover-container');
    container.innerHTML = ''; 

    items.forEach(item => {
        const card = document.createElement('article');
        card.classList.add('discover-card');
        
        
        card.style.gridArea = item.id;

      
        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="images/${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;
        
        container.appendChild(card);
    });
}

// Initialize the fetch
getDiscoverItems();