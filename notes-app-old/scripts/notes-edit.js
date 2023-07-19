"use strict";

const title = document.querySelector("#note-title");
const body = document.querySelector("#note-body");
const remove = document.querySelector("#remove-note");
const date = document.querySelector("#last-edited");

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => note.id === noteId);

if (!note) location.assign("/index.html");

title.value = note.title;
body.value = note.notes;
date.textContent = generateLastEdited(note.updatedAt);

title.addEventListener('input', (e) => {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf();
    date.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

body.addEventListener('input', (e) => {
    note.notes = e.target.value;
    note.updatedAt = moment().valueOf();
    date.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

remove.addEventListener('click', (e) => {
    removeNote(note.id);
    saveNotes(notes);
    location.assign("/index.html");
});

window.addEventListener('storage', (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue);
        let note = notes.find(note => note.id === noteId);

        if (!note) location.assign("/index.html");

        title.value = note.title;
        body.value = note.notes;
        date.textContent = generateLastEdited(note.updatedAt);
    }
});