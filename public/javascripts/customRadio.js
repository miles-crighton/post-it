export default class CustomRadio {
    init(container) {
        this.container = container;
        this.container.classList.add('color-selector')
        this.render();
    }

    render() {
        this.container.innerHTML = CustomRadio.markup(this);
        this.ColorButtons = this.container.getElementsByClassName('color-button');

        //Set first element as selected
        this.ColorButtons[0].setAttribute('id', 'color-selected');

        //Set each button's color
        for (let button of this.ColorButtons) {
            button.style = `background-color: ${button.attributes[1].nodeValue}`;
        }

        this.addEventListeners();
    }

    static markup({ colors }) {
        let buttons = ``
        for (let color of colors) {
            buttons += `<button class='color-button' color=${color}></button>`
        }
        return buttons
    }

    addEventListeners() {
        //Add custom events for each colored button
        for (let button of this.ColorButtons) {
            button.addEventListener('click', () => {
                let eventOptions = {
                    bubbles: true, 
                    detail: { 
                        color: button.attributes[1].nodeValue
                    }
                }
                let colorChangeEvent = new CustomEvent('color-changed', eventOptions);
                this.container.dispatchEvent(colorChangeEvent)
                let prevSelectedButton = document.getElementById('color-selected')
                prevSelectedButton.removeAttribute('id')
                button.setAttribute('id', 'color-selected')
            });
        };

    }

    constructor(container, colors) {
        this.colors = colors;
        // The constructor should only contain the boiler plate code for finding or creating the reference.
        if (typeof container.dataset.ref === 'undefined') {
            this.ref = Math.random();
            CustomRadio.refs[this.ref] = this;
            container.dataset.ref = this.ref;
            this.init(container);
        } else {
            // If this element has already been instantiated, use the existing reference.
            return CustomRadio.refs[container.dataset.ref];
        }
    }
}

CustomRadio.refs = {};

document.addEventListener('DOMContentLoaded', () => {
    let colors = ['salmon', 'yellow', 'green']
    new CustomRadio(document.getElementById('custom-radio'), colors)
});


document.addEventListener('color-changed', e => {
    let selectedColorButton = document.getElementById('color-selected')
    console.log(selectedColorButton)
})


