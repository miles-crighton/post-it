replacePostIts = (data) => {
    const messageBoard = document.getElementById('messageBoard')

    while (messageBoard.firstChild) {
        messageBoard.removeChild(messageBoard.firstChild);
    }
    for (let item in data.data) {
        const postIt = createPostIt(data.data[item])
        messageBoard.append(postIt)
    }
}

createPostIt = (data) => {
    const { posX, posY, text, color } = data
    const messageNode = createDiv('message', text);
    const postIt = createDiv('post-it');

    addStyle(postIt, posX, posY, color)
    postIt.appendChild(messageNode)

    return postIt
}

createDiv = (className = undefined, text = undefined) => {
    const divNode = document.createElement('DIV');
    if (typeof text !== 'undefined') {
        const textNode = document.createTextNode(text);
        divNode.appendChild(textNode);
    }
    if (typeof className !== 'undefined') {
        divNode.className = className;
    }
    return divNode
}

addStyle = (node, posX, posY, color) => {
    const style = 'margin-top: ' + addPx(posY) + ' ' + 'margin-left: ' + addPx(posX) + 'background-color: ' + color + ';'
    node.setAttribute('style', style)
}

addPx = (val) => {
    return val + 'px;'
}
