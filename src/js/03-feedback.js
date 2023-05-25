import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

emailInput.addEventListener('input', saveFormState);
messageInput.addEventListener('input', saveFormState);

window.addEventListener('load', loadFormState);

form.addEventListener('submit', handleSubmit);

function saveFormState() {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}

function loadFormState() {
  const savedFormState = localStorage.getItem(STORAGE_KEY);
  if (savedFormState) {
    const formState = JSON.parse(savedFormState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log('Form submitted:', formState);
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

const saveFormStateThrottled = throttle(saveFormState, 500);
emailInput.addEventListener('input', saveFormStateThrottled);
messageInput.addEventListener('input', saveFormStateThrottled);
