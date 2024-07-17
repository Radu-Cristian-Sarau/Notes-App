const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const closeIcon = popupBox.querySelector('header i');
const addBtn = popupBox.querySelector('button');
const titleTag = popupBox.querySelector('input');
const descTag = popupBox.querySelector('textarea'); // description

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/*
 * Get notes from local storage if they exist and parse them to the JS object
 * Else pass an empty array to notes
 */
const notes = JSON.parse(localStorage.getItem('notes')  || "[]");

addBox.addEventListener('click', () => {
    popupBox.classList.add('show');
});

closeIcon.addEventListener('click', () => {
    popupBox.classList.remove('show');
});

function showNotes() {
    notes.forEach((note) => {
        console.log(note);
    });
}
showNotes();

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
        notes.push(noteInfo); // add new note to notes array
        localStorage.setItem('notes', JSON.stringify(notes)); // store notes array in local storage
        closeIcon.click(); // close popup
    }
});