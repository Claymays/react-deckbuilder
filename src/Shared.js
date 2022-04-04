import {testPaths} from "./Routes";

export function $(selector) {
    return document.getElementById(selector);
}

export function get(key) {
    return localStorage.getItem(key);
}

export function set(key, value) {
    return localStorage.setItem(key, value);
}

export async function fetchUserDetails() {
    const user = await fetch(testPaths.user, {
        headers: {
            'Authorization': 'bearer' + get('token')
        }, method: 'POST'
    })
        .then(response => {return response.json()});
    return user;
}