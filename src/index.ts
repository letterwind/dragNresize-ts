import "jquery";
import './style.css';
import logo from './logo.png';
import { Resizable } from "./resizable";
import { Draggable } from "./draggable";
$(function() {
    const r1Logo = new Image();
    r1Logo.src = logo;
    $('.mydiv').append(r1Logo);
    const R1 = new Resizable('.mydiv');
    const D1 = new Draggable('.mydiv');


});
