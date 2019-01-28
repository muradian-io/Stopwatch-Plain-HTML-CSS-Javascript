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
        var diff = timestamp - this.time;
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
    var result = value.toString();
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
    var d = document.getElementById("div-2");
    var b = document.getElementById("btn-add-1")
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
    var d = document.getElementById("div-3");
    var b = document.getElementById("btn-add-2")
    if (d.style.display === "flex") {
        d.style.display = "none";
        b.innerText = "Add Watch";
        stopwatch3.restart()

    } else {
        d.style.display = "flex";
        b.innerText = "Delete Watch";
    }

}
