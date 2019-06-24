function replacePostIts(data) {
    let messageBoard = document.getElementById('messageBoard')

    while (messageBoard.firstChild) {
        messageBoard.removeChild(messageBoard.firstChild);
    }
    for (let item in data.data) {
        let postIt = createPostIt(data.data[item])
        messageBoard.append(postIt)
    }
}

createPostIt = (data) => {
    let postIt = createDiv('post-it');
    let { posX, posY, text } = data

    postIt = adjustPosition(postIt, posX, posY)
    let messageNode = createDiv('message', text);
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

adjustPosition = (node, posX, posY) => {
    const style = 'margin-top: ' + addPx(posY) + ' ' + 'margin-left: ' + addPx(posX)
    node.setAttribute('style', style)
    return node
}

addPx = (val) => {
    return val + 'px;'
}