// Main phone functionality, handles page loading and navigation
// Make another file for page specific functionality, don't put it here

// function to get the current page from the URL params
function getCurrentPage() {
    const urlParams = new URLSearchParams(window.location.search);
    return [urlParams.get("page") || "sign-in", urlParams.delete("page")];
}

// arrays to hold pages that should not show the navbar or header buttons
const hideNavPages = ["home", "sign-in", "forgot-password", "sign-up"];
const hideHeaderButtonPages = ["sign-in", "forgot-password", "sign-up"];

// function to load a new page such as when a button is clicked
function loadPage(page, extraParams = {}) {

    const content = document.getElementById("content");
    // to save scroll position when going back and forth between pages
    if (content.scrollTop > 0) {
        extraParams.scrollTop = content.scrollTop;
    }

    // fetch the html page and check if it exists if not load 404 page
    fetch(`pages/${page}.html`)
    .then(response => {
        if (!response.ok) {
            return fetch("pages/404.html").then(res => res.text());
        }
        return response.text();
    })
    .then(data => {
        // parse the html and get the content to add to the page
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const contentToAdd = doc.getElementById("content-container");

        // do the check if the navbar should be hidden or not
        const navbar = document.getElementsByClassName("nav-bar");
        if (navbar && navbar[0]) {
            navbar[0].style.display = hideNavPages.includes(page) ? "none" : "flex";
        }


        // do the check if the header buttons should be hidden or not
        const settingsIcon = document.getElementById("settings-icon");
        const notificationsIcon = document.getElementById("notifications-icon");
        if (settingsIcon && notificationsIcon) {
            settingsIcon.style.display = hideHeaderButtonPages.includes(page) ? "none" : "block";
            notificationsIcon.style.display = hideHeaderButtonPages.includes(page) ? "none" : "block";
        }

        // make all the nav items not active and then make the current one active
        const allNavs = document.getElementsByClassName("nav-item");
        for (const nav of allNavs) {
            nav.classList.remove("active");
        }

        const nav = document.getElementById(`nav-${page}`);
        if (nav) {
            nav.classList.add("active");
        }

        // set the content of the page to the new page and set the title
        content.innerHTML = contentToAdd.innerHTML;
        document.getElementById("page-title").innerText = hideHeaderButtonPages.includes(page) ? "Parkly" : page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, " ");

        // if url has scrollTop param, scroll to that position
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.has("scrollTop")) {
            content.scrollTop = parseInt(currentParams.get("scrollTop"));
        }

        // create the url with the new page and params
        const params = new URLSearchParams(extraParams).toString();
        window.history.replaceState({ page: page }, "", `?page=${page}&${params}`);

        // load the page specific functionality
        loadSettings();
        switch (page) {
            case "invoice":
                loadInvoiceData(extraParams.id);
                break;
            case "settings":
                initializeSettings();
                break;
            case "book":
                addBookingListeners();
                break;
            case "forgot-password":
                showCodeForm();
                break;
        }
    });
}

function changeTime() {
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    document.getElementById("time").innerHTML = currentTime;
}
document.addEventListener("DOMContentLoaded", () => {
    const [currentPage, extra] = getCurrentPage();
    loadPage(currentPage, extra);
    setInterval(changeTime, 10000);
    changeTime();
});

// Add event listener for browser back/forward navigation
window.addEventListener('popstate', (event) => {
    if (!event.state) {
        return;
    }
    const [currentPage, extra] = getCurrentPage();
    loadPage(currentPage, extra);
});