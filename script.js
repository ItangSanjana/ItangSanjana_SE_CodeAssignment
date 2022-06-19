function initApp() {
  initSignInButton();
}

function initError(error) {
  console.error(error);
}

function initSignIn() {
  const form = document.forms.signIn;
  const dialog = form.parentElement;
  const progress = form.nextElementSibling;

  if (typeof dialog.showModal !== "function") {
      return initAlert("API <Dialog> tidak didukung oleh browser ini.");
  }

  dialog.showModal();

  form.onsubmit = () => {
    event.preventDefault();
    const formData = new FormData(form);

    fetch('https://my-json-server.typicode.com/SolveEducation/accounts/sign-in', {
      method: 'PATCH',
      body: formData
    })
    .then((response) => response.json())
    .then(({name}) => {
      initSignInButton(true);
      initWelcome(name);
    })
    .catch(initError)
    .finally(() => {
      dialog.close();
      form.hidden = false;
      progress.hidden = true;
    });

    form.hidden = true;
    progress.hidden = false;
  };
}

function initSignInButton(arg) {
  const button = document.querySelector("button.sign-in");
  if (arg) {
    button.textContent = 'Sign Out';
  }
  button.onclick = () => {
    if (arg) {
      button.textContent = 'Sign In';
      initWelcome();
      return initSignInButton();
    }

    initSignIn();
  };
}

function initWelcome(name) {
  const elem = document.querySelector('.welcome');
  if (name) {
    return elem.textContent = `Welcome, ${name}!`;
  }

  elem.textContent = '';
}

window.onload = () => {
  /*if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js")
      .catch(initError)
      .finally(initApp);
  } else {
      initApp();
  }*/
  initApp();
};
