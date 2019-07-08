import "core-js/stable";
import "regenerator-runtime/runtime";

import CustomRadio from './customRadio.js'
import './dragAndDrop.js'
import { updateClientData } from './serverCom.js'

CustomRadio.refs = {};

document.addEventListener('DOMContentLoaded', () => {
    let colors = ['salmon', 'yellow', 'green']
    let draggedPostIt = document.querySelector('.drag-drop');
    new CustomRadio(document.getElementById('custom-radio'), colors)
    updateClientData()
    draggedPostIt.style = `background-color: ${colors[0]}`
});

document.addEventListener('color-changed', e => {
    let draggedPostIt = document.querySelector('.drag-drop');
    draggedPostIt.style = `background-color: ${e.detail.color}`
    console.log(`Post-it color changed to ${e.detail.color}`)
})