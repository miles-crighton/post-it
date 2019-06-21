function replacePostIts(data) {
    var messageBoard = document.getElementById('messageBoard')

    while (messageBoard.firstChild) {
        messageBoard.removeChild(messageBoard.firstChild);
    }
    for (let item in data.data) {
        let node = document.createElement('DIV')
        node.className = 'post-it'

        node = adjustPosition(node, data.data[item])

        let message = document.createElement('DIV');
        message.appendChild(document.createTextNode(data.data[item]['text'].toString()));
        message.className = 'message'
        node.appendChild(message)

        messageBoard.append(node)
    }
}

adjustPosition = (node, data) => {
    const left = data.posX + 'px;';
    const top = data.posY + 'px;';
    const style = 'margin-top: ' + top + ' ' + 'margin-left: ' + left
    node.setAttribute('style', style)
    return node
}