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
    directoryContainer.innerHTML = ''; // Clear container

    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('member-card');

        let logo = document.createElement('img');
        logo.src = `images/${member.image}`;
        logo.alt = `${member.name} Logo`;
        logo.loading = 'lazy';
        logo.width = 150; 
        logo.height = 150; 

        let name = document.createElement('h3');
        name.textContent = member.name;

        let industry = document.createElement('p');
        industry.innerHTML = `<strong>Industry:</strong> ${member.industry}`;

        let address = document.createElement('p');
        address.textContent = member.address;

        let phone = document.createElement('p');
        phone.textContent = member.phone;

        let website = document.createElement('a');
        website.href = member.website;
        website.target = '_blank';
        website.textContent = 'Visit Website';

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(industry);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

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