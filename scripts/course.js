const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true 
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true 
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized.',
        technology: ['Python'],
        completed: true 
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes.',
        technology: ['C#'],
        completed: false 
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students will learn to create dynamic websites.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true 
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students will focus on user experience.',
        technology: ['Web/Front-End'],
        completed: false 
    }
];

const courseContainer = document.querySelector('#course-container');
const totalCreditsElement = document.querySelector('#total-credits');

// Function to render courses dynamically
function displayCourses(courseList) {
    courseContainer.innerHTML = '';
    
    courseList.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
        // Add specific class based on completion status
        if (course.completed) {
            courseCard.classList.add('course-completed');
        } else {
            courseCard.classList.add('course-incomplete');
        }
        
        courseCard.innerHTML = `<p>${course.subject} ${course.number}</p>`;
        courseContainer.appendChild(courseCard);
    });

    // Calculate total credits for displayed courses using reduce
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.innerHTML = `The total credits for the courses listed above is: <strong>${totalCredits}</strong>`;
}

// Initial display of all courses
displayCourses(courses);

// Event Listeners for filter buttons
document.querySelector('#btn-all').addEventListener('click', () => {
    displayCourses(courses);
});

document.querySelector('#btn-cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

document.querySelector('#btn-wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});