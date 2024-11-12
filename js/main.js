'use strict';
/* global data, writeEntry */
const $form = document.querySelector('form');
if (!$form) throw new Error('$form not found');
const $img = document.querySelector('img');
const $photoURLInput = document.querySelector('#photo-url');
$photoURLInput?.addEventListener('change', () => {
  $img?.setAttribute('src', $photoURLInput.value);
});
$form.addEventListener('submit', (event) => {
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
  $img?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
