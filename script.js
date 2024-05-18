// Get elements
const addNoteBtn = document.getElementById('addNoteBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const notesContainer = document.getElementById('notesContainer');

// Add event listeners
addNoteBtn.addEventListener('click', addNote);
clearAllBtn.addEventListener('click', clearAllNotes);

// Function to add a new note
function addNote() {
    const note = document.createElement('div');
    note.classList.add('note');

    const contentEditable = document.createElement('div');
    contentEditable.classList.add('note-content');
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
        saveNotes(); // Save notes when content is edited
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', function() {
        notesContainer.removeChild(note);
        saveNotes(); // Save notes after deletion
    });

    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = getFormattedTimestamp(); // Add timestamp when note is created
    note.appendChild(timestamp);

    note.appendChild(contentEditable);
    note.appendChild(deleteBtn);
    notesContainer.appendChild(note);

    saveNotes(); // Save notes after creation
}

// Function to clear all notes
function clearAllNotes() {
    notesContainer.innerHTML = '';
    saveNotes(); // Save notes after clearing
}

// Function to save notes to local storage
function saveNotes() {
    const notes = [];
    notesContainer.querySelectorAll('.note').forEach(note => {
        const content = note.querySelector('.note-content').innerText;
        const timestamp = note.querySelector('.timestamp').textContent;
        notes.push({ content, timestamp });
    });
    localStorage.setItem('quickNotes', JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('quickNotes'));
    if (savedNotes) {
        savedNotes.forEach(savedNote => {
            const { content, timestamp } = savedNote;
            const note = document.createElement('div');
            note.classList.add('note');

            const contentEditable = document.createElement('div');
            contentEditable.classList.add('note-content');
            contentEditable.setAttribute('contenteditable', 'true');
            contentEditable.innerText = content;
            contentEditable.addEventListener('focus', function() {
                if (this.innerText === 'Click to edit...') {
                    this.innerText = '';
                }
            });
            contentEditable.addEventListener('blur', function() {
                if (this.innerText.trim() === '') {
                    this.innerText = 'Click to edit...';
                }
                saveNotes(); // Save notes when content is edited
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', function() {
                notesContainer.removeChild(note);
                saveNotes(); // Save notes after deletion
            });

            const savedTimestamp = document.createElement('span');
            savedTimestamp.classList.add('timestamp');
            savedTimestamp.textContent = timestamp;

            note.appendChild(savedTimestamp);
            note.appendChild(contentEditable);
            note.appendChild(deleteBtn);
            notesContainer.appendChild(note);
        });
    }
}

// Function to get formatted timestamp
function getFormattedTimestamp() {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return `${date} ${time}`;
}

// Load notes when the page loads
window.onload = loadNotes;
