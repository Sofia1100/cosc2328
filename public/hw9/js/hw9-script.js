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