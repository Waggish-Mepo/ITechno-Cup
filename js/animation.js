const TL = new TimelineMax();

const text1 = document.querySelector("#text-1");


TL.delay(1)
.fromTo(text1, 1, {opacity: 0}, {opacity: 1})


