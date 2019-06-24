var position = { x: 0, y: 0 }

interact('.drag-drop')
    .draggable({
        //allowFrom: '.drag-handle',
        inertia: false,
        ignoreFrom: '.postItMessage',
        modifiers: [
            interact.modifiers.restrict({
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 0, right: 0 }
            })
        ],
        autoScroll: true,
        onstart: function(event) {
            var target = event.target;
            var textArea = document.getElementById('draggedMessage');
            
            textArea.style.border = "none";
            target.style.boxShadow = '0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.08)';
        },
        onmove: function(event) {
            position.x += event.dx
            position.y += event.dy

            event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`
            event.target.style.cursor = 'default'
        },
        onend: function(event) {
            var target = event.target;
            var textArea = document.getElementById('draggedMessage');
            if (eleHasClass(target, 'drop-enabled')) {
                sendMessage(textArea.value, position.x - 140, position.y + 10 )
                target.classList.remove('drop-enabled')
            }
            position.x = 0;
            position.y = 0;
            
            event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`;

            textArea.value = '';
            textArea.style.border = '1px dashed rgb(230, 108, 108)';
            target.style.boxShadow = 'none';
        }
    });

interact('.dropzone').dropzone({
    overlap: 1,
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget;

        draggableElement.classList.add('drop-enabled')
    },
    ondragleave: function (event) {
        event.relatedTarget.classList.remove('drop-enabled')
    },
});

function eleHasClass(el, cls) {
    return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}