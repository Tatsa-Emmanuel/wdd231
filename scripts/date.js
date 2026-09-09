// Get the current year
const currentYearElement = document.querySelector('#currentyear');
const today = new Date();
currentYearElement.innerHTML = today.getFullYear();

// Get the last modified date
const lastModifiedElement = document.querySelector('#lastModified');
lastModifiedElement.innerHTML = `Last Modification: ${document.lastModified}`;