/* global data, writeEntry */

const $form = document.querySelector('form');
if (!$form) throw new Error('$form not found');

const $img = document.querySelector('img') as HTMLImageElement;
const $photoURLInput = document.querySelector('#photo-url') as HTMLInputElement;

$photoURLInput?.addEventListener('change', () => {
  $img?.setAttribute('src', $photoURLInput.value);
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  const title = ($formElements.namedItem('title') as HTMLInputElement).value;
  const photoURL = ($formElements.namedItem('photo') as HTMLInputElement).value;
  const notes = ($formElements.namedItem('notes') as HTMLTextAreaElement).value;
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
