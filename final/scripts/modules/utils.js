export function initCommon() {
    const lastModified = document.querySelector('#lastModified');
    if (lastModified) lastModified.textContent = `Last Modification: ${document.lastModified}`;

    const menuBtn = document.querySelector('#menu-btn');
    const primaryNav = document.querySelector('#primary-nav');
    if (menuBtn && primaryNav) {
        menuBtn.addEventListener('click', () => {
            primaryNav.classList.toggle('open');
            menuBtn.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
        });
    }

    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
}

export function openCourseModal(course) {
    const dialog = document.querySelector('#course-modal');
    if (dialog) {
        document.querySelector('#modal-title').textContent = course.title;
        document.querySelector('#modal-body').innerHTML = `
            <p><strong>Language:</strong> ${course.language}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Details:</strong> ${course.description}</p>
        `;
        dialog.showModal();
    }
}