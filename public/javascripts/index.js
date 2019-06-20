function sendMessage(messageText, messageX, messageY) {
    //let messageText = document.getElementById('messageText').value
    //let messageAuthor = document.getElementById('messageAuthor').value
    //let messageX = document.getElementById('messageX').value
    //let messageY = document.getElementById('messageY').value

    postMessage(messageText, messageX, messageY)
        .then(response => fillList(response))
        .catch(err => console.error(err))
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
    var list = document.getElementById('messageBoard')
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (let item in data.data) {
        let node = document.createElement('DIV')
        node.className = 'post-it'

        node = adjustPosition(node, data.data[item])

        let message = document.createElement('DIV');
        message.appendChild(document.createTextNode(data.data[item]['text'].toString()));
        message.className = 'message'
        node.appendChild(message)
        
        // let author = document.createElement('DIV');
        // author.appendChild(document.createTextNode(' - ' + data.data[item]['author'].toString()))
        // author.className = 'author'
        // node.appendChild(author)

        list.append(node)
    }
}

adjustPosition = (node, data) => {
    let left = data.posX + 'px;';
    let top = data.posY + 'px; ';
    let style = 'margin-top: ' + top + 'margin-left: ' + left
    node.setAttribute('style', style)
    return node
}