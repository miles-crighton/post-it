import { replacePostIts } from './domFuncs.js'

const HOST_URL = window.location.protocol + '//' + window.location.host;

export function sendMessage(messageText, messageX, messageY, color) {
    if (messageText === '' || messageX < 0 || messageY < 0) {
        console.log('Unable to post message - make sure message field is not empty.')
    } else {
        postMessage(messageText, messageX, messageY, color)
            .then(res => replacePostIts(res))
            .catch(err => {console.error(err); alert('Could not reach server')})
    }
}

export function updateClientData() {
    requestData()
        .then(res => replacePostIts(res))
        .catch(err => { console.error(err); alert('Could not reach server') })
}

export async function postMessage(text, posX, posY, color) {
    const messageJSON = JSON.stringify({
        text,
        posX,
        posY,
        color
    })
    const response = await fetch(HOST_URL + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: messageJSON
    })
    const jsonResponse = response.json()
    return jsonResponse
}

export async function requestData() {
    const response = await fetch(HOST_URL + "/data")
    const jsonResponse = response.json()
    return jsonResponse
}
