const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const closeIcon = popupBox.querySelector('header i');
const addBtn = popupBox.querySelector('button');
const titleTag = popupBox.querySelector('input');
const descTag = popupBox.querySelector('textarea'); // description
const popupTitle = popupBox.querySelector('header p');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/*
 * Get notes from local storage if they exist and parse them to the JS object
 * Else pass an empty array to notes
 */
const notes = JSON.parse(localStorage.getItem('notes')  || "[]");
let isUpdated = false;
let updateID;

addBox.addEventListener('click', () => {
    titleTag.focus();
    popupBox.classList.add('show');
});

closeIcon.addEventListener('click', () => {
    isUpdated = false;
    titleTag.value = '';
    descTag.value = '';
    addBtn.innerText = "Add note";
    popupTitle.innerText = "Add a new note";
    popupBox.classList.remove('show');
});

function showNotes() {
    document.querySelectorAll('.note').forEach((note) => note.remove());
    notes.forEach((note, index) => {
        let liTag = `
            <li class="note">
                <div class="details">
                    <p>${note.title}</p>
                    <span>${note.description}</span>
                </div>
                <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                            <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                            <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>
            `;
        addBox.insertAdjacentHTML('afterend', liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add('show');
    document.addEventListener('click', e => {
        if (e.target.tagName != 'I' || e.target != elem) {
            elem.parentElement.classList.remove('show');
        }
    });
}

function deleteNote(noteID) {
    let confirmDel = confirm('Are you sure you want to delete this note?');
    if (!confirmDel) {
        return;
    }
    notes.splice(noteID, 1); // remove selected note from notes array
    localStorage.setItem('notes', JSON.stringify(notes)); // save updated notes to local storage
    showNotes();
}

function updateNote(noteID, title, desc) {
    isUpdated = true;
    updateID = noteID;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update note";
    popupTitle.innerText = "Update a note";
    console.log(noteID, title, desc);
}

addBtn.addEventListener('click', e => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;

    if (noteTitle || noteDesc) {
        let dateObj = new Date();
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        };

        if (!isUpdated) {
            notes.push(noteInfo); // add new note to notes array
        } else {
            isUpdated = false;
            notes[updateID] = noteInfo; // update existing note
        }

        localStorage.setItem('notes', JSON.stringify(notes)); // store notes array in local storage
        closeIcon.click(); // close popup
        showNotes();
    }
});