const send = document.querySelector(".send");
const clear = document.querySelector(".clear");

// This part is to implement a signature field into a form.
//let signatureCode = document.querySelector("#signature-code");

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let cw = (canvas.width = 400),
    cx = cw / 2;
let ch = (canvas.height = 400),
    cy = ch / 2;
ctx.strokeStyle = "black";
let draw = false;
let m = {
    x: 0,
    y: 0,
};

let eventsRy = [
    {
        event: "mousedown",
        func: "onStart",
    },
    {
        event: "touchstart",
        func: "onStart",
    },
    {
        event: "mousemove",
        func: "onMove",
    },
    {
        event: "touchmove",
        func: "onMove",
    },
    {
        event: "mouseup",
        func: "onEnd",
    },
    {
        event: "touchend",
        func: "onEnd",
    },
    {
        event: "mouseout",
        func: "onEnd",
    },
];

function onStart(evt) {
    m = oMousePos(canvas, evt);
    ctx.beginPath();
    draw = true;
}

function onMove(evt) {
    if (draw) {
        ctx.moveTo(m.x, m.y);
        m = oMousePos(canvas, evt);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
    }
}

function onEnd(evt) {
    draw = false;
}

function oMousePos(canvas, evt) {
    let ClientRect = canvas.getBoundingClientRect();
    let e = evt.touches ? evt.touches[0] : evt;

    return {
        x: Math.round(e.clientX - ClientRect.left),
        y: Math.round(e.clientY - ClientRect.top),
    };
}

for (let i = 0; i < eventsRy.length; i++) {
    (function (i) {
        let e = eventsRy[i].event;
        let f = eventsRy[i].func;
        canvas.addEventListener(
            e,
            function (evt) {
                evt.preventDefault();
                window[f](evt);
                return;
            },
            false
        );
    })(i);
}

clear.addEventListener(
    "click",
    () => {
        ctx.clearRect(0, 0, cw, ch);
    },
    false
);

send.addEventListener(
    "click",
    () => {
        // This part is to implement a signature field into a form.
        //signatureCode.value = canvas.toDataURL("image/png");

        alert("Thanks for your contribution.");
        ctx.clearRect(0, 0, cw, ch);
    },
    false
);
