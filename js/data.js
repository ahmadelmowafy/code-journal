"use strict";
/* exported data, writeEntry */
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
    console.log('does this fire');
    return {
        view: 'entry-form',
        entries: [],
        editing: null,
        nextEntryId: 1,
    };
}
