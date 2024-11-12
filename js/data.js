"use strict";
const data = readEntry();
function writeEntry() {
    const entryJSON = JSON.stringify(data);
    localStorage.setItem('stored-entry', entryJSON);
}
function readEntry() {
    const entryItem = localStorage.getItem('stored-entry');
    if (entryItem) {
        return JSON.parse(entryItem);
    }
    return {
        view: 'entry-form',
        entries: [],
        editing: null,
        nextEntryId: 1,
    };
}
