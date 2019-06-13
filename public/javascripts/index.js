function sendMessage() {
    let messageText = document.getElementById('messageText').value
    let messageAuthor = document.getElementById('messageAuthor').value

    postMessage(messageText, messageAuthor)
        .then(response => fillList(response))
        .catch(err => console.error(err))
}

var posX = 0, posY = 0

async function postMessage(text, author) {
    posX += 100
    posY += 100
    let messageJSON = JSON.stringify({
        text,
        author,
        posX,
        posY,
    })
    console.log(messageJSON)
    let response = await fetch("http://127.0.0.1:3000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: messageJSON
    })
    let jsonResponse = response.json()
    return jsonResponse
}

function updateData() {
    requestData()
        .then(data => fillList(data))
        .catch(err => console.log(err))

    async function requestData() {
        let response = await fetch("http://127.0.0.1:3000/data")
        let jsonResponse = response.json()
        return jsonResponse
    }
}

function fillList(data) {
    console.log('data', data)
    var list = document.getElementById('messageBoard')
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (let item in data.data) {
        console.log(data.data[item])
        let node = document.createElement('DIV')
        node.className = 'message'
        node.style.left = data.data[item]['posX'] + 'px'
        node.top = data.data[item]['poxY'] + 'px'
        let textNode = document.createTextNode(data.data[item]['text'].toString() + ' - ' + data.data[item]['author'].toString())
        node.appendChild(textNode)
        list.append(node)
    }
}