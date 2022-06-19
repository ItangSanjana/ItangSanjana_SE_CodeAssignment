function initApp() {
  //
}

function initError(error) {
  console.error(error);
}

window.onload = () => {
  if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("../service-worker.js")
      .catch(initError)
      .finally(initApp);
  } else {
      initApp();
  }
};
