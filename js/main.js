'use strict';
/* global data, writeEntry */
const $form = document.querySelector('form');
const $img = document.querySelector('img');
const $photoURLInput = document.querySelector('#photo');
$photoURLInput?.addEventListener('change', () => {
  $img?.setAttribute('src', $photoURLInput.value);
});
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
  data.nextEntryId++;
  data.entries.push(entry);
  writeEntry();
  const $entriesList = document.querySelector('ul');
  $entriesList?.prepend(renderEntry(entry));
  toggleNoEntries();
  $img?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  viewSwap('entries');
});
document.addEventListener('DOMContentLoaded', () => {
  toggleNoEntries();
  for (let i = 0; i < data.entries.length; i++) {
    const $entriesList = document.querySelector('ul');
    $entriesList?.appendChild(renderEntry(data.entries[i]));
  }
});
function renderEntry(entry) {
  const $listItem = document.createElement('li');
  const $entry = document.createElement('div');
  $entry.className = 'journal-entry';
  const $imageContainer = document.createElement('div');
  $imageContainer.className = 'column-half';
  const $entryImage = document.createElement('img');
  $entryImage.setAttribute('src', entry.photoURL);
  const $textContainer = document.createElement('div');
  $textContainer.className = 'column-half';
  const $imageTitle = document.createElement('h3');
  $imageTitle.textContent = entry.title;
  const $imageDescription = document.createElement('p');
  $imageDescription.textContent = entry.notes;
  $listItem.appendChild($entry);
  $entry.append($imageContainer, $textContainer);
  $imageContainer.appendChild($entryImage);
  $textContainer.append($imageTitle, $imageDescription);
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
  } else {
    $noEntriesMessage?.remove();
  }
}
function viewSwap(view) {
  data.view = view;
  const $entryFormView = document.querySelector('[data-view="entry-form"]');
  const $entriesView = document.querySelector('[data-view="entries"]');
  if (!$entryFormView || !$entriesView) throw new Error('query failed');
  if (view === 'entry-form') {
    $entryFormView.classList.remove('hidden');
    $entriesView.classList.add('hidden');
  } else if (view === 'entries') {
    $entryFormView.classList.add('hidden');
    $entriesView.classList.remove('hidden');
  }
}
const $entriesNavLink = document.querySelector('.entries-link');
$entriesNavLink?.addEventListener('click', () => {
  viewSwap('entries');
});
const $newEntry = document.querySelector('.new-entry');
$newEntry?.addEventListener('click', () => {
  viewSwap('entry-form');
});
