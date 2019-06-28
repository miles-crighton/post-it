export default class CustomRadio {
    // set colors(colors) {
    //     this.colors = colors;
    //     this.render();
    // }

    // get colors() {
    //     return this.colors;
    // }

    init(container) {
        this.container = container;
        this.titleValue = this.container.dataset.title;
        this.render();
    }

    render() {
        this.container.innerHTML = CustomRadio.markup(this);
        this.ColorButtons = this.container.getElementsByClassName('color-button');
        this.addEventListeners();
    }

    static markup({ colors }) {
        let total = ``
        for (let color of colors) {
            total += `<button class='color-button' color=${color}>Click Me</button>`
        }
        console.log(total)
        return total
        return `
            <h1>${'Hello'}</h1>
            <button class="click-me">Click Me</div>
            <button class="click-me">Click Me</div>
            <button class="click-me">Click Me</div>
            `;
    }

    addEventListeners() {
        console.log(this.ColorButtons)
        for (let button of this.ColorButtons) {
            console.log()
            button.addEventListener('click', () => {
                let eventOptions = {
                    bubbles: true, 
                    detail: { 
                        color: button.attributes[1].nodeValue
                    }
                }
                let colorChangeEvent = new CustomEvent('color-changed', eventOptions);
                this.container.dispatchEvent(colorChangeEvent)
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
    let colors = ['Red', 'Yellow', 'Green']
    new CustomRadio(document.getElementById('custom-radio'), colors)
});


document.addEventListener('color-changed', e => {
    console.log(`Color changed to ${e.detail.color}`)
})


