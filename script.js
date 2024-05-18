// Get elements
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Add event listener to Add Note button
addNoteBtn.addEventListener('click', addNote);

// Function to add a new note
function addNote() {
    const note = document.createElement('div');
    note.classList.add('note');

    const contentEditable = document.createElement('div');
    contentEditable.setAttribute('contenteditable', 'true');
    contentEditable.innerText = 'Click to edit...';
    contentEditable.addEventListener('focus', function() {
        if (this.innerText === 'Click to edit...') {
            this.innerText = '';
        }
    });
    contentEditable.addEventListener('blur', function() {
        if (this.innerText.trim() === '') {
            this.innerText = 'Click to edit...';
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', function() {
        notesContainer.removeChild(note);
    });

    note.appendChild(contentEditable);
    note.appendChild(deleteBtn);
    notesContainer.appendChild(note);
}
