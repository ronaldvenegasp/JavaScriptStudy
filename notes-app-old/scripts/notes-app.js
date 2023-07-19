"use strict";

let notes = getSavedNotes();

const filters = {
    searchText: "",
    sortBy: "byEdited"
}

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", (e) => {
    const id = uuidv4();
    const timestamp = moment().valueOf();
    notes.push({
        id,
        title: "",
        notes: "",
        createdAt: timestamp,
        updatedAt: timestamp
    });
    saveNotes(notes);
    // renderNotes(notes, filters);
    location.assign(`/edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", (e) => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters);
});

window.addEventListener('storage', (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters);
    }
});

/* ========================================================= */
/* ============== DATES WITH JS AND MOMENT.JS ============== */
/* ========================================================= */
// // With JS
// const dateOne = new Date('March 1 2022 12:00:00');
// const dateTwo = new Date();

// const dateOneTimestamp = dateOne.getTime();
// const dateTwoTimestamp = dateTwo.getTime();

// if (dateOneTimestamp < dateTwoTimestamp) {
//   console.log(dateOne.toDateString());
// } else if (dateOneTimestamp > dateTwoTimestamp) {
//   console.log(dateTwo.toDateString());
// }

// // With moment.js
// const now = moment();
// console.log(now.format('MMMM Do, YYYY'));

// const birthday = moment();
// birthday.year(1991).month(10).date(6);
// console.log(birthday.format('MMM D, YYYY'));
/* ========================================================= */