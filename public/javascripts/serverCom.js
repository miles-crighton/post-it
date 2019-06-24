const HOST_URL = window.location.protocol + '//' + window.location.host;

sendMessage = (messageText, messageX, messageY) => {
    if (messageText === '' || messageX < 0 || messageY < 0) {
        console.log('Unable to post message - make sure message field is not empty.')
    } else {
        postMessage(messageText, messageX, messageY)
            .then(res => replacePostIts(res))
            .catch(err => console.error(err))
    }
}

updateClientData = () => {
    requestData()
        .then(res => replacePostIts(res))
        .catch(err => console.log(err))
}

postMessage = async (text, posX, posY) => {
    const messageJSON = JSON.stringify({
        text,
        posX,
        posY,
    })
    const response = await fetch(HOST_URL + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: messageJSON
    })
    const jsonResponse = response.json()
    return jsonResponse
}

requestData = async () => {
    const response = await fetch(HOST_URL + "/data")
    const jsonResponse = response.json()
    return jsonResponse
}
