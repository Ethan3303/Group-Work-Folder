function getCurrentPage() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("page") || "";
}

function loadPage(page) {
    fetch(`pages/${page}.html`).then(response => response.text()).then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const contentToAdd = doc.getElementById("content-container");
        switch (page) {
            case "home":
                const navbar = document.getElementsByClassName("nav-bar")
                if (navbar && navbar[0]) {
                    navbar[0].style.display = "none";
                }
                break;
            default:
                console.log("Loading page: " + page);
                const nav = document.getElementById(`nav-${page}`);
                if (nav) {
                    nav.classList.add("active");
                }
                break;
        }
        const content = document.getElementById("content");
        content.innerHTML = contentToAdd ? contentToAdd.innerHTML : "";
        window.history.pushState({ page: page }, "", `?page=${page}`);
    });
}

function changeTime() {
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    document.getElementById("time").innerHTML = currentTime;
}
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = getCurrentPage();
    loadPage(currentPage || "home");
    setInterval(changeTime, 10000);
    changeTime();
});