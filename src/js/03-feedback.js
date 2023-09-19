const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(storageKey, JSON.stringify(formState));
}, 500);

const loadFormState = () => {
  const savedFormState = localStorage.getItem(storageKey);

  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email || '';
    messageInput.value = formState.message || '';
  }
};

form.addEventListener('input', saveFormState);
window.addEventListener('load', loadFormState);
form.addEventListener('submit', function (event) {
  event.preventDefault();

  localStorage.removeItem(storageKey);

  emailInput.value = '';
  messageInput.value = '';

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formState);
});
