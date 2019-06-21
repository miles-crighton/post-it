function sendMessage(messageText, messageX, messageY) {
    postMessage(messageText, messageX, messageY)
        .then(response => replacePostIts(response))
        .catch(err => console.error(err))
}

function updateData() {
    requestData()
        .then(data => replacePostIts(data))
        .catch(err => console.log(err))
}

async function postMessage(text, posX, posY) {
    const messageJSON = JSON.stringify({
        text,
        posX,
        posY,
    })
    const response = await fetch("http://127.0.0.1:3000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: messageJSON
    })
    const jsonResponse = response.json()
    return jsonResponse
}

async function requestData() {
    const response = await fetch("http://127.0.0.1:3000/data")
    const jsonResponse = response.json()
    return jsonResponse
}
