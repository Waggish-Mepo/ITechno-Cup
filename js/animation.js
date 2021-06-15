const TL = new TimelineMax();

const heroText = document.querySelector("#text-hero");
const vaccineButton = document.querySelector("#hero-vaccination");
const dataButton = document.querySelector("#hero-data");
const svgArea = document.querySelector(".svg-area");
const heroSvg = document.querySelector(".hero-svg");

//hero svg component
const shadow = document.querySelector("#shadow");
const building = document.querySelector("#building");
const background = document.querySelector("#background");
const plant = document.querySelector("#plant");
const femaleDoctor = document.querySelector("#female-doctor");
const maleDoctor = document.querySelector("#male-doctor");
const heart = document.querySelector("#heart");


//opening animation
TL.delay(0.5)
.fromTo(heroText, 1, {opacity: 0}, {opacity: 1}, "first")
.fromTo(vaccineButton, 0.5, {opacity: 0}, {opacity: 1}, "second")
.fromTo(dataButton, 0.5, {opacity: 0}, {opacity: 1}, "second")
.fromTo(svgArea, 1, {opacity: 0}, {opacity: 1}, "third")
.fromTo(heroSvg, 1, {opacity: 0}, {opacity: 1}, "third")
.fromTo(building, 0.5, {opacity: 0}, {opacity: 1}, "fourth")
.fromTo(background, 0.5, {opacity: 0}, {opacity: 1}, "fourth")
.fromTo(plant, 0.5, {opacity: 0}, {opacity: 1})
.fromTo(femaleDoctor, 0.5, {opacity: 0}, {opacity: 1})
.fromTo(maleDoctor, 0.5, {opacity: 0}, {opacity: 1})
.fromTo(shadow, 1, {opacity: 0}, {opacity: 1})
.fromTo(heart, 0.5, {opacity: 0}, {opacity: 1})


