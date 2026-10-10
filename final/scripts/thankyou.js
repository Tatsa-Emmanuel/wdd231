import { initCommon } from './modules/utils.js';
initCommon();

const results = document.querySelector('#form-results');
if (results) {
    const params = new URLSearchParams(window.location.search);
    results.innerHTML = `
        <p><strong>Name:</strong> ${params.get('fname')} ${params.get('lname')}</p>
        <p><strong>Email:</strong> ${params.get('email')}</p>
        <p><strong>Language Interest:</strong> ${params.get('subject')}</p>
    `;
}