function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
