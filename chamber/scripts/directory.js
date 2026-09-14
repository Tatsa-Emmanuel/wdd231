// Dynamic Footer Dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Hamburger Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');

menuBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    menuBtn.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
});

// Directory Fetch and Display Logic
const url = 'data/members.json';
const directoryContainer = document.getElementById('directory-container');

async function getMemberData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching member data:", error);
    }
}

const displayMembers = (members) => {
    directoryContainer.innerHTML = ''; 

    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('member-card');

        // Create the card interior matching the wireframe
        card.innerHTML = `
            <div class="card-header">
                <h3>${member.name}</h3>
                <p class="tagline">${member.industry}</p>
            </div>
            <hr>
            <div class="card-body">
                <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="75" height="75">
                <div class="card-info">
                    <p><strong>EMAIL:</strong> info@${member.website.replace('https://www.', '')}</p>
                    <p><strong>PHONE:</strong> ${member.phone}</p>
                    <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://www.', '')}</a></p>
                </div>
            </div>
        `;

        directoryContainer.appendChild(card);
    });
};

getMemberData();

// Grid / List Toggle Logic
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

gridBtn.addEventListener('click', () => {
    directoryContainer.classList.add('grid-view');
    directoryContainer.classList.remove('list-view');
    gridBtn.classList.add('active-view');
    listBtn.classList.remove('active-view');
});

listBtn.addEventListener('click', () => {
    directoryContainer.classList.add('list-view');
    directoryContainer.classList.remove('grid-view');
    listBtn.classList.add('active-view');
    gridBtn.classList.remove('active-view');
});