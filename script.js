let scrollInterval = null;
let hideTimeout = null;

function show() {
    const elem = document.body;

    // FULLSCREEN primeiro (iPhone exige isso)
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();

    setTimeout(() => {
        const t = document.getElementById("text").value;
        document.getElementById("display").innerText = t;

        document.getElementById("display").style.display = "block";
        document.getElementById("controls").style.display = "block";
        document.getElementById("text").style.display = "none";

        startHideTimer();
    }, 100); // necessery in iPhone
}

function exitFull() {
    stopScroll();

    if (document.exitFullscreen) document.exitFullscreen();
    if (document.webkitExitFullscreen) document.webkitExitFullscreen();

    document.getElementById("display").style.display = "none";
    document.getElementById("controls").style.display = "none";
    document.getElementById("text").style.display = "block";
}

function setSpeed(level) {
    stopScroll();

    const speeds = {
        1: 1,
        2: 1.5,
        3: 2,
        4: 2.5
    };

    const speed = speeds[level];

    scrollInterval = setInterval(() => {
        const d = document.getElementById("display");
        d.scrollTop += speed;
    }, 20);

    startHideTimer();
}

function stopScroll() {
    clearInterval(scrollInterval);
}

function setFont(size) {
    const display = document.getElementById("display");
    const currentScroll = display.scrollTop;

    if (size === "small") display.style.fontSize = "40px";
    if (size === "medium") display.style.fontSize = "60px";
    if (size === "large") display.style.fontSize = "75px";

    display.scrollTop = currentScroll;
    startHideTimer();
}

function startHideTimer() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        document.getElementById("controls").classList.add("hidden");
    }, 2000);
}

function showControls() {
    const controls = document.getElementById("controls");
    controls.classList.remove("hidden");
    startHideTimer();
}

document.addEventListener("touchstart", showControls);
document.addEventListener("mousemove", showControls);
