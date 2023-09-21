import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(feedbackFormStateSave, 500));
form.addEventListener('submit', handleReset);

let formValue = {};

function feedbackFormStateSave(event) {
  formValue[event.target.name] = event.target.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formValue));
}

function handleReset(event) {
  event.preventDefault();
  console.log(formValue);
  formValue = {};

  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
}

function refreshForm() {
  try {
    const saveData = localStorage.getItem(STORAGE_KEY);
    if (!saveData) return;
    formValue = JSON.parse(saveData);
    Object.entries(formValue).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }
}
refreshForm();
