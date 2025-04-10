function toggleSettingsDropdown() {
    document.getElementById("settingsDropdown").classList.toggle("show");
}

function changeTime() {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("time").innerHTML = currentTime;
}

setInterval(changeTime, 10000);
document.addEventListener("DOMContentLoaded", changeTime);