const TL = new TimelineMax();

const text1 = document.querySelector("#text-1");
const text2 = document.querySelector("#text-2");
const text3 = document.querySelector("#text-3");
const dot = document.querySelector("#dot");

TL
.fromTo(text1, 1, {opacity: 0, x: -150}, {opacity: 1, x:0})
.fromTo(text2, 1, {opacity: 0, x: -150}, {opacity: 1, x:0})
.fromTo(text3, 1, {opacity: 0, x: -150}, {opacity: 1, x:0})
.fromTo(dot, 1, {opacity: 0}, {opacity: 1})

