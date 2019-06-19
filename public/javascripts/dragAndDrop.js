interact('.dropzone').dropzone({
    overlap: 1,

    ondropactivate: function (event) {
        // add active dropzone feedback

    },
    ondragenter: function (event) {
        
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;


        // feedback the possibility of a drop
        draggableElement.classList.remove('snap-enabled')
    },
    ondragleave: function (event) {

        // remove the drop feedback style
        event.relatedTarget.classList.add('snap-enabled')

    },
    ondrop: function (event) {
        interact(event.relatedTarget).draggable({intertia: true})
        elementPosition = event.target.offsetLeft;
        console.log(elementPosition)

    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback

    }
});

const position = { x: 0, y: 0 }


interact('.drag-drop')
    .draggable({
        //allowFrom: '.drag-handle',
        inertia: false,
        ignoreFrom: '.postItMessage',
        modifiers: [
            interact.modifiers.restrict({
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 0, right: 0 }
            })
        ],
        autoScroll: true,
        onstart: function(event) {
            console.log(event.type, event.target)
            event.target.classList.add('snap-enabled')
            var el = document.getElementById('draggedArea');
            el.style.border = "none";
        },
        onmove: function(event) {
            position.x += event.dx
            position.y += event.dy

            event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`
            event.target.style.cursor = 'default'
        },
        onend: function(event) {
            elementPosition = event.target.offsetLeft;
            console.log(elementPosition)
            if (true) {
                var el = document.getElementById('draggedArea');
                sendMessage(el.value, position.x, (-position.y - 200))
                position.x = 0;
                position.y = 0;
                
                event.target.style.transform =
                    `translate(${position.x}px, ${position.y}px)`;

                el.value = '';
                el.style.border = '1px solid rgb(230, 108, 108)';

            } else {

            }
        }
    });

function eleHasClass(el, cls) {
    return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}