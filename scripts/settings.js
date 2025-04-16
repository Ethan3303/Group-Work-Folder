function toggleSettingsDropdown(open) {
    const element = document.getElementById("settingsDropdown");
    // if not open and element has mouse hovering over it, do not close it
    if (!open && element.matches(":hover")) {
        return;
    }
    element.classList.toggle("show", open);
}