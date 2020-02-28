

/**
 * Deletes all values from the local storage and reloads the current url.
 */
const resetStorageReloadPage = () => {
  localStorage.clear(); 
  window.location.reload();
}


export const navigationUtils = {
  resetStorageReloadPage
}
