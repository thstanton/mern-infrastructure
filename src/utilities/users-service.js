import * as usersAPI from './users-api.js'

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData)
    // Persist the "token"
    localStorage.setItem('token', token);
    return getUser()
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials)
    // Persist the "token"
    localStorage.setItem('token', token);
    return getUser()
}

export function logOut() {
    localStorage.removeItem('token')
}

export function getToken() {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token')
    // Return null if no token exists
    if (!token) return null
    // Obtain the payload (2nd position in array) using atob() from JWT 
    const payload = JSON.parse(atob(token.split('.')[1]))
    // Check whether token has expired - 
    // payload is in seconds, so date has to be converted from ms
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return null
    }
    // Otherwise return the token
    return token
}

export async function checkToken() {
    // Just so that you don't forget how to use .then
    return usersAPI.checkToken()
    // checkToken returns a string, but let's 
    // make it a Date object for more flexibility
    .then(dateStr => new Date(dateStr))
}

export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }