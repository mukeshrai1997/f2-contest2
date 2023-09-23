// Fetch data from the provided URL and store it in an array
let students = []; // This will hold the student data

// Function to fetch data from the URL
async function fetchData() {
    const response = await fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json');
    const data = await response.json();
    students = data;
}

// Wait for the page to load
window.addEventListener('load', () => {
    fetchData().then(() => {
        // Populate the default table
        populateTable(students);

        // Add event listeners
        document.getElementById('searchButton').addEventListener('click', handleSearch);
        document.getElementById('sortAZ').addEventListener('click', () => sortStudents('AZ'));
        document.getElementById('sortZA').addEventListener('click', () => sortStudents('ZA'));
        document.getElementById('sortByMarks').addEventListener('click', () => sortStudents('marks'));
        document.getElementById('sortByPassing').addEventListener('click', () => sortStudents('passing'));
        document.getElementById('sortByClass').addEventListener('click', () => sortStudents('class'));
        document.getElementById('sortByGender').addEventListener('click', () => sortStudents('gender'));
       // document.getElementById('sortByGender').addEventListener('click', () => sortStudents('gender'));
    });
});

// Function to populate the table with student data
function populateTable(data) {
    const maleTable = document.getElementById('maleBody');
    const femaleTable = document.getElementById('femaleBody');






    
    
    // Clear previous data
    maleTable.innerHTML = '';
    femaleTable.innerHTML = '';

    data.forEach(student => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const passingCell = document.createElement('td');
        const classCell = document.createElement('td');
        const genderCell = document.createElement('td');
        const marksCell = document.createElement('td');
        
        // Display passing as "Passing" or "Failed"
        const passingStatus = student.passing ? 'Passing' : 'Failed';

        nameCell.innerHTML = `<img src="${student.image}" alt="${student.first_name} ${student.last_name}"><br>${student.first_name} ${student.last_name}`;
        emailCell.textContent = student.email;
        passingCell.textContent = passingStatus;
        classCell.textContent = student.class;
        genderCell.textContent = student.gender;
        marksCell.textContent = student.marks;
       
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(passingCell);
        row.appendChild(classCell);
        row.appendChild(genderCell);
        row.appendChild(marksCell);
        
        


        if (student.gender === 'Male') {
            maleTable.appendChild(row);
        } else {
            femaleTable.appendChild(row);
        }
    });
}

// Function to handle the search
function handleSearch() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.first_name.toLowerCase().includes(searchQuery) ||
        student.last_name.toLowerCase().includes(searchQuery) ||
        student.email.toLowerCase().includes(searchQuery)
    );
    populateTable(filteredStudents);
}

// Function to sort students based on criteria
function sortStudents(criteria) {
    let sortedStudents = [];

    switch (criteria) {
        case 'AZ':
            sortedStudents = students.slice().sort((a, b) =>
                (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name)
            );
            break;

        case 'ZA':
            sortedStudents = students.slice().sort((a, b) =>
                (b.first_name + ' ' + b.last_name).localeCompare(a.first_name + ' ' + a.last_name)
            );
            break;

        case 'marks':
            sortedStudents = students.slice().sort((a, b) => a.marks - b.marks);
            break;

        case 'passing':
            sortedStudents = students.filter(student => student.passing);
            break;

        case 'class':
            sortedStudents = students.slice().sort((a, b) => a.class - b.class);
            break;

        case 'gender':
            // Separate male and female students
            const maleStudents = students.filter(student => student.gender === 'Male');
            const femaleStudents = students.filter(student => student.gender === 'Female');
            sortedStudents = [...maleStudents, ...femaleStudents];
            break;

        default:
            sortedStudents = students.slice();
            break;
    }

    populateTable(sortedStudents);
}