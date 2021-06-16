const TL = new TimelineMax();

const heroText = $("#text-hero");
const vaccineButton = $("#hero-vaccination");
const dataButton = $("#hero-data");
const svgArea = $(".svg-area");
const heroSvg = $(".hero-svg");

//hero svg component
const shadow = $("#shadow");
const building = $("#building");
const background = $("#background");
const plant = $("#plant");
const femaleDoctor = $("#female-doctor");
const maleDoctor = $("#male-doctor");
const heart = $("#heart");

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


const InfoTL = new TimelineMax({yoyo: true, repeat : -1});
const canisterTop = $("#canister-top");
const pill1 = $("#pill-1");
const pill2 = $("#pill-2");
const pill3 = $("#pill-3");
const pill4 = $("#pill-4");
const pill5 = $("#pill-5");
const pill6 = $("#pill-6");
const pill7 = $("#pill-7");
const pill8 = $("#pill-8");
const pill9 = $("#pill-9");
const pill10 = $("#pill-10");
const pill11 = $("#pill-11");
const pill12 = $("#pill-12");
const pill13 = $("#pill-13");
const pill14 = $("#pill-14");
const pill15 = $("#pill-15");
const pill16 = $("#pill-16");

InfoTL
.fromTo(pill1, 2, { opacity: 0}, { opacity: 0})
.fromTo(pill1, 0.5, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill2, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill3, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill4, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill5, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill6, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill7, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill8, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill9, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill10, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill11, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill12, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill13, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill14, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill15, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(pill16, 0.3, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(canisterTop, 1, { y: -100, opacity: 0}, { y :0, opacity: 1})
.fromTo(canisterTop, 1, { x: 0}, { x :0})

