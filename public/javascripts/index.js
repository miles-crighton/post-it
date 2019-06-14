function sendMessage() {
    let messageText = document.getElementById('messageText').value
    let messageAuthor = document.getElementById('messageAuthor').value
    let messageX = document.getElementById('messageX').value
    let messageY = document.getElementById('messageY').value

    postMessage(messageText, messageAuthor, messageX, messageY)
        .then(response => fillList(response))
        .catch(err => console.error(err))
}

async function postMessage(text, author, posX, posY) {
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

        let left = data.data[item].posX + 'px;';
        let top = data.data[item].posY + 'px; ';
        let style = 'margin-top: ' + top + 'margin-left: ' + left
        node.setAttribute('style', style)
        
        let textNode = document.createTextNode(data.data[item]['text'].toString() + ' - ' + data.data[item]['author'].toString())
        node.appendChild(textNode)
        list.append(node)
    }
}