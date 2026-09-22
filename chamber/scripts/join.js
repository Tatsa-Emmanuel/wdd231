// ==========================================
// 1. FOOTER DATES & MENU TOGGLES (Shared)
// ==========================================
// Set Current Year and Last Modified Date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Hamburger Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const primaryNav = document.getElementById('primary-nav');

if (menuBtn && primaryNav) {
    menuBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
        menuBtn.textContent = primaryNav.classList.contains('open') ? '✖' : '☰';
    });
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });
}

// ==========================================
// 2. JOIN PAGE SPECIFICS (Timestamp & Modals)
// ==========================================
// Set Hidden Timestamp Field
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    // Captures the exact date and time the user loaded the form
    timestampField.value = new Date().toISOString(); 
}

// Modal Logic
const modalButtons = document.querySelectorAll('.modal-btn');
const closeButtons = document.querySelectorAll('.close-modal');

// Open Modals
modalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Prevents the form from accidentally submitting if clicked
        e.preventDefault(); 
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
        }
    });
});

// Close Modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});