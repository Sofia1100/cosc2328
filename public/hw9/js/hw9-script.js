// // What does require('dotenv').config() do, and how does process.env.PI_LICENSE in hw9-routes.js get its value even though dotenv is not called there?
// The require('dotenv').config() call in app.js reads the .env file and loads the environment variables into process.env. Since hw9-routes.js is required by app.js, 
// it has access to process.env and can retrieve the values set by dotenv.
// // In IC20 your data was submitted with a <form> and e.preventDefault(). In HW9 there is no <form>. What changed? Why doesn't a plain <button> outside a form trigger a page reload?
// Without a <form> element, clicking a <button> does not trigger a form submission, which would normally cause a page reload. 
// Instead, the button's click event is handled by JavaScript, allowing for asynchronous data submission without reloading the page.
// // What happens to the case list if the Docker container restarts? Why? What would you need to add to make the data survive a restart?
// What happens is that the in-memory case log (the 'cases' array) is cleared when the Docker container restarts, because it is stored in RAM and not persisted to disk. To make the data survive a restart, you would need to implement a persistent storage solution, 
// such as a database (e.g., SQLite, PostgreSQL, MongoDB) or writing the data to a file on disk.
// // Your POST route returns 400 when suspect is missing. Where does the browser-side code receive that 400? How does response.ok help distinguish a 400 from a 201?
// The browser-side code receives the 400 response in the fetch API call. The response.ok property is a boolean that indicates whether the HTTP status code is in the range of 200-299 (successful responses).
// If response.ok is false, it means the request was not successful (e.g., a 400 Bad Request), allowing the code to handle errors appropriately. 
// In contrast, a 201 Created response would result in response.ok being true, indicating that the request was successful and the new case was created.


// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

async function loadCredentials() {
    const response = await fetch('/hw9/credentials');
    const data = await response.json();

    const dl = document.getElementById('credentials');
    dl.innerHTML = '';

    Object.entries(data).forEach(([key, value]) => {
        const dt = document.createElement('dt');
        dt.textContent = key;
        const dd = document.createElement('dd');
        dd.textContent = value;
        dl.appendChild(dt);
        dl.appendChild(dd);
    });
}

async function loadCases() {
    const response = await fetch('/hw9/cases');
    const data = await response.json();

    const list = document.getElementById('case-list');
    list.innerHTML = '';

    if (data.length === 0) {
        const li = document.createElement('li');
        li.className = 'empty-msg';
        li.textContent = 'No cases filed yet.';
        list.appendChild(li);
        return;
    }

    data.forEach(c => {
        const li = document.createElement('li');

        const fields = [
            ['case-id', "Case #" + c.id],
            ['case-suspect', c.suspect],
            ['case-location', c.location],
            ['case-notes', c.notes],
            ['case-ts', c.timestamp]
        ];

        fields.forEach(([cls, text]) => {
            const div = document.createElement('div');
            div.className = cls;
            div.textContent = text;
            li.appendChild(div);
        });

        list.appendChild(li);
    });
}

document.getElementById('log-btn').addEventListener('click', async (e) => {
    const suspectE1 = document.getElementById('suspect');
    const locationE1 = document.getElementById('location');
    const notesE1 = document.getElementById('notes');
    const statusE1 = document.getElementById('log-status');

    const suspect = suspectE1.value;
    const location = locationE1.value;
    const notes = notesE1.value;

    const response = await fetch('/hw9/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suspect, location, notes })
    });

    if (!response.ok) {
        const err = await response.json();
        statusE1.textContent = err.error;
        return;
    }

    suspectE1.value = '';
    locationE1.value = '';
    notesE1.value = '';
    statusE1.textContent = '';
    loadCases();
});

loadCredentials();
loadCases();