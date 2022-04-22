///Funciones Local Storage

export const setLocalStorage = (key, val) => {
   localStorage.setItem(key, JSON.stringify(val))
}
//Get
export const getLocalStorage = (key) => {
   return JSON.parse(localStorage.getItem(key))
}
export const deleteLocalStorage = (key) => {
   localStorage.removeItem(key)
}
