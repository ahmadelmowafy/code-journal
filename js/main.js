"use strict";
/* global data, writeEntry */
const $form = document.querySelector('form');
const $img = document.querySelector('img');
const $photoURLInput = document.querySelector('#photo');
$photoURLInput?.addEventListener('change', () => {
    $img?.setAttribute('src', $photoURLInput.value);
});
const $entriesList = document.querySelector('ul');
toggleNoEntries();
$form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const $formElements = $form.elements;
    const title = $formElements.namedItem('title').value;
    const photoURL = $formElements.namedItem('photo').value;
    const notes = $formElements.namedItem('notes').value;
    const entry = {
        title,
        photoURL,
        notes,
        entryId: data.nextEntryId,
    };
    if (!data.editing) {
        data.nextEntryId++;
        data.entries.push(entry);
        $entriesList?.prepend(renderEntry(entry));
    }
    else {
        entry.entryId = data.editing.entryId;
        data.entries.splice(data.entries.indexOf(data.editing), 1, entry);
        const $originalEntry = document.querySelector(`li[data-entry-id="${data.editing.entryId}"]`);
        $originalEntry?.replaceWith(renderEntry(entry));
        const $newEntryHeading = document.querySelector('.form-heading');
        $newEntryHeading.textContent = 'New Entry';
        data.editing = null;
    }
    writeEntry();
    toggleNoEntries();
    $img?.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    viewSwap('entries');
});
$entriesList?.addEventListener('click', (event) => {
    const eventTarget = event.target;
    if (eventTarget.className === 'fa-solid fa-pencil') {
        viewSwap('entry-form');
        const $newEntryHeading = document.querySelector('.form-heading');
        $newEntryHeading.textContent = 'Edit Entry';
        for (let i = 0; i < data.entries.length; i++) {
            if (data.entries[i].entryId ==
                eventTarget.closest('li')?.getAttribute('data-entry-id')) {
                data.editing = data.entries[i];
                $form.elements.namedItem('title').value =
                    data.editing.title;
                $form.elements.namedItem('photo').value =
                    data.editing.photoURL;
                $form.elements.namedItem('notes').value =
                    data.editing.notes;
            }
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    viewSwap(data.view);
    toggleNoEntries();
    for (let i = 0; i < data.entries.length; i++) {
        const $entriesList = document.querySelector('ul');
        $entriesList?.appendChild(renderEntry(data.entries[i]));
    }
    console.log('DOMContentLoaded event');
    console.log(data);
    console.log(data.view);
});
function renderEntry(entry) {
    const $listItem = document.createElement('li');
    $listItem.setAttribute('data-entry-id', entry.entryId);
    const $entry = document.createElement('div');
    $entry.className = 'journal-entry';
    const $imageContainer = document.createElement('div');
    $imageContainer.className = 'column-half';
    const $entryImage = document.createElement('img');
    $entryImage.setAttribute('src', entry.photoURL);
    const $textContainer = document.createElement('div');
    $textContainer.className = 'column-half';
    const $titleAndEdit = document.createElement('div');
    $titleAndEdit.className = 'title-and-edit';
    const $imageTitle = document.createElement('h3');
    $imageTitle.textContent = entry.title;
    const $editIcon = document.createElement('i');
    $editIcon.className = 'fa-solid fa-pencil';
    const $imageDescription = document.createElement('p');
    $imageDescription.textContent = entry.notes;
    $listItem.appendChild($entry);
    $entry.append($imageContainer, $textContainer);
    $imageContainer.appendChild($entryImage);
    $textContainer.append($titleAndEdit, $imageDescription);
    $titleAndEdit.append($imageTitle, $editIcon);
    return $listItem;
}
function toggleNoEntries() {
    const $entriesView = document.querySelector('[data-view="entries"]');
    const $noEntriesMessage = $entriesView?.querySelector('.no-entries');
    if (data.entries.length === 0) {
        if (!$noEntriesMessage) {
            const $noEntries = document.createElement('div');
            $noEntries.className = 'no-entries';
            $noEntries.textContent = 'No entries have been recorded.';
            $entriesView?.appendChild($noEntries);
        }
    }
    else {
        $noEntriesMessage?.remove();
    }
}
function viewSwap(viewName) {
    const $entryFormView = document.querySelector('[data-view="entry-form"]');
    const $entriesView = document.querySelector('[data-view="entries"]');
    if (!$entryFormView || !$entriesView)
        throw new Error('query failed');
    if (viewName === 'entry-form') {
        $entryFormView.classList.remove('hidden');
        $entriesView.classList.add('hidden');
    }
    else if (viewName === 'entries') {
        $entryFormView.classList.add('hidden');
        $entriesView.classList.remove('hidden');
    }
    if (data.view !== viewName) {
        data.view = viewName;
        writeEntry();
    }
}
const $entriesNavLink = document.querySelector('.entries-link');
$entriesNavLink?.addEventListener('click', () => {
    viewSwap('entries');
});
const $newEntryButton = document.querySelector('.new-entry');
$newEntryButton?.addEventListener('click', () => {
    viewSwap('entry-form');
    data.editing = null; // clear any unsaved editing progress
    const $newEntryHeading = document.querySelector('.form-heading');
    $newEntryHeading.textContent = 'New Entry';
    $form.elements.namedItem('title').value = '';
    $form.elements.namedItem('photo').value = '';
    $form.elements.namedItem('notes').value = '';
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
});
