// 1. What is a foreign key, and how does it connect the addresses table to the students table?What is a foreign key, and how does it connect the addresses table to the students table?
// db.all() returns every matching row as an array (use it for lists), while db.get() returns just the first matching row as an object or undefined (use it for single-record lookups like by ID).

// 2. Why does the JOIN in Step 11 return only two rows instead of three?
// Concatenating user input into SQL lets attackers change the query itself (SQL injection); with 1; DROP TABLE students the query would contain a second statement that drops the table, though sqlite3’s get/all only run the first statement, so use ? placeholders instead.

// 3. INNER JOIN is the default. What type of JOIN would return all three students — including Priya, who has no favorite_things row — and what would her food and color values show?
// rows is an array of results and row is a single object, so the names tell you the data’s shape and how to use it (loop over rows, read row.name directly).

// 4. What does INTEGER PRIMARY KEY do in SQLite, and why do you omit the id column from INSERT statements?
// :id is a route parameter that matches any value in that URL segment, and Express stores the matched value in req.params.id (as a string), so one route handles /students/2, /students/7, and so on.


// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

async function loadStudents() {
    const response = await fetch('/ic22/students');
    const students = await response.json();

    const list = document.getElementById('student-list');
    list.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.first_name} ${student.last_name}: ${student.classification} (${student.major})`;
        list.appendChild(li);
    });
}

document.getElementById('lookup-btn').addEventListener('click', async () => {
    const id = document.getElementById('student-id').value;
    const resultDiv = document.getElementById('student-result');

    const response = await fetch(`/ic22/students/${id}`);
    const student = await response.json();

    if(student.message) {
        resultDiv.textContent = student.message;
    } else {
        resultDiv.textContent = `${student.first_name} ${student.last_name}: ${student.classification} (${student.major})`;
    }

});

loadStudents();