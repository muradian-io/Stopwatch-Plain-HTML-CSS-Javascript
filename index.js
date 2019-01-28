class Stopwatch {
    constructor(display, startpause) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
        this.startpause = startpause;
    }

    reset() {
        this.times = [0, 0, 0];
    }

    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }

    stop() {
        if (this.running === true) {
            this.running = false;
            this.time = null;
            this.startpause.innerText = "Resume";
        }
    }

    restart() {
        this.running = false;
        this.time = null;
        this.reset();
        this.display.innerText = "00:00:00";
        this.startpause.innerText = "Start";
    }


    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    calculate(timestamp) {
        let diff = timestamp - this.time;
        this.times[2] += diff / 10;
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }

}

function pad0(value, count) {
    let result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}


let stopwatch1 = new Stopwatch(
    document.querySelector('#counter1'),
    document.querySelector('#start-1'));

let stopwatch2 = new Stopwatch(
    document.querySelector('#counter2'),
    document.querySelector('#start-2'));

let stopwatch3 = new Stopwatch(
    document.querySelector('#counter3'),
    document.querySelector('#start-3'));


function toggleWatch2() {
    let d = document.getElementById("div-2");
    let b = document.getElementById("btn-add-1")
    if (d.style.display === "flex") {
        d.style.display = "none";
        b.innerText = "Add Watch";
        stopwatch2.restart()
    } else {
        d.style.display = "flex";
        b.innerText = "Delete Watch";

    }


}

function toggleWatch3() {
    let d = document.getElementById("div-3");
    let b = document.getElementById("btn-add-2")
    if (d.style.display === "flex") {
        d.style.display = "none";
        b.innerText = "Add Watch";
        stopwatch3.restart()

    } else {
        d.style.display = "flex";
        b.innerText = "Delete Watch";
    }

}


let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let body = document.querySelector('body');



function setGradient() {
    body.style.background =
        "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";

    setConGradient("StopWatch", color1.value, color2.value);

    let c1 = lightOrDark(color1.value);
    let c2 = lightOrDark(color2.value);
    if (c1 === "light" & c2 === "light") {
        setColor("counter", "black")
        setColor("btn", "black");
        setColor("btn", "black");
        setColor("btn-add", "black");
        setColor("btn-add", "black");
    } else {
        setColor("counter", "whitesmoke")
        setColor("btn", "whitesmoke");
        setColor("btn", "whitesmoke");
        setColor("btn-add", "whitesmoke");
        setColor("btn-add", "whitesmoke");
    }
}

color1.addEventListener("input", setGradient);

color2.addEventListener("input", setGradient);

function setColor(className, Value) {
    let items = document.getElementsByClassName(className);
    for (let i = 0; i < items.length; i++) {
        items[i].style.color = Value;
    }
}

function setConGradient(className, color1, color2) {
    let items = document.getElementsByClassName(className);
    for (let i = 0; i < items.length; i++) {
        items[i].style.background = "linear-gradient(to right, " + color2 + ", " + color1 + ")";
    }
}


function lightOrDark(color) {

    // Variables for red, green, blue values
    let r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    } else {

        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

        return 'light';
    } else {

        return 'dark';
    }
}