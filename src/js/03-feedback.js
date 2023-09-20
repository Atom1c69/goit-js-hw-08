const form = document.querySelector('.feedback-form');
// const emailInput = form.querySelector('input[name="email"]');
// const messageInput = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

const saveFormState = throttle(() => {
  // const formState = {
  //   email: emailInput.value,
  //   message: messageInput.value,
  // };
  formState[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}, 500);

const loadFormState = () => {
  try {
    const savedFormState = localStorage.getItem(STORAGE_KEY);
    if (!savedFormState) return;
    const formState = JSON.parse(savedFormState);
    Object.entries(formState).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }
};

form.addEventListener('input', saveFormState);
window.addEventListener('load', loadFormState);
form.addEventListener('submit', function (event) {
  event.preventDefault();

  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
  // emailInput.value = '';
  // messageInput.value = '';

  // const formState = {
  //   email: emailInput.value,
  //   message: messageInput.value,
  // };
  console.log(formState);
  formState = {};
});
