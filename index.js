console.log("index.js loaded");

function toggleSettingsDropdown(open) {
    const element = document.getElementById("settingsDropdown");
    // if not open and element has mouse hovering over it, do not close it
    if (!open && element.matches(':hover')) {
        return;
    }
    element.classList.toggle("show", open);
}

function changeTime() {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("time").innerHTML = currentTime;
}

setInterval(changeTime, 10000);
changeTime();