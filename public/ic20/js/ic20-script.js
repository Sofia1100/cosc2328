// What does express.json() do, and what would happen to req.body in your POST route without it?
//It is middleware that parses incoming requests with JSON and puts the resulting object on req.body. Without it, req.body would be undefined in the POST route. 
//
//What is the difference between HTTP status 200 and 201? When would you use each?
//200 OK is a general success status code, while 201 Created indicates that a new resource has been successfully created. You would use 200 for successful GET requests and 201 for successful POST requests that create new resources.
//
// Your seed missions disappear every time the Docker container restarts. What would you need to add to make them persist?
// To make the seed missions persist across Docker container restarts, you would need to implement a database or some form of persistent storage.
//  You would then modify your routes to interact with the database for creating, reading, and deleting missions, ensuring that the data remains available even after the container is restarted.
//
// If two people in different browser tabs both added missions at the same time, would they both see the same list? Why or why not?
// No, they would not see the same list because the missions are stored in memory on the server. Each time a new mission is added, it is only added to the server's current state. If one user adds a mission and another user adds a different mission at the same time, they may not see each other's changes until they refresh or make another request to get the updated list from the server.


// IC20 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

const list = document.getElementById('mission-list');
const form = document.getElementById('mission-form');

async function loadMissions() {
  const res  = await fetch('/ic20/missions');
  const data = await res.json();
  list.innerHTML = '';
  data.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `<p class="name">${m.name}</p><p class="dest">${m.destination}</p>`;
    list.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name        = document.getElementById('mission-name').value.trim();
  const destination = document.getElementById('mission-dest').value.trim();
  await fetch('/ic20/missions', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, destination }),
  });
  form.reset();
  loadMissions();
});

loadMissions();