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
        //Test
        //interact(event.relatedTarget).draggable({intertia: true})
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
    }
});

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
            var el = document.getElementById('draggedArea');
            
            event.target.classList.add('snap-enabled')
 
            el.style.border = "none";
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
            var el = document.getElementById('draggedArea');
            if (!eleHasClass(target, 'snap-enabled')) {
                sendMessage(el.value, position.x - 140, position.y + 10 )
            }
            position.x = 0;
            position.y = 0;
            
            event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`;

            el.value = '';
            el.style.border = '1px solid rgb(230, 108, 108)';
            target.style.boxShadow = 'none';
        }
    });

function eleHasClass(el, cls) {
    return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}