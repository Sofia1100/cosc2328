// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

async function loadStudents() {
    const response = await fetch('/ic22/students');
    const students = await response.json();

    const list = document.getElementById('student-list');
    list.innerHTML = '';

    


}