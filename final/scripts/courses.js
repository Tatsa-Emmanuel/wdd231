import { initCommon, openCourseModal } from './modules/utils.js';
initCommon();

let allCourses = [];

async function getCourses() {
    try {
        const response = await fetch('data/courses.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        allCourses = await response.json();
        displayCourses(allCourses);
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('#courses-container').innerHTML = '<p class="error-msg">Error loading courses.</p>';
    }
}

function displayCourses(courses) {
    const container = document.querySelector('#courses-container');
    container.innerHTML = '';

    courses.forEach(course => {
        const card = document.createElement('article');
        card.className = 'course-card';
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p class="badge">${course.language}</p>
            <p>⏱ ${course.duration}</p>
            <button class="details-btn btn-secondary">View Details</button>
        `;
        card.querySelector('.details-btn').addEventListener('click', () => openCourseModal(course));
        container.appendChild(card);
    });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        if (filter === 'all') {
            displayCourses(allCourses);
        } else {
            const filtered = allCourses.filter(c => c.language.toLowerCase() === filter);
            displayCourses(filtered);
        }
    });
});

const dialog = document.querySelector('#course-modal');
const closeBtn = document.querySelector('#modal-close');
if (closeBtn && dialog) {
    closeBtn.addEventListener('click', () => dialog.close());
}

getCourses();