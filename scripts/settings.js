function toggleSettingsDropdown(open, force) {
    const element = document.getElementById("settingsDropdown");
    // if not open and element has mouse hovering over it, do not close it
    if (!open && element.matches(":hover") && !force) {
        return;
    }
    element.classList.toggle("show", open);
}

function saveSettings() {
    const settings = {
        textSize: document.getElementById('textSizeSlider').value,
        darkMode: document.getElementById('darkModeToggle').checked,
        textToSpeech: document.getElementById('textToSpeechToggle').checked
    };
    
    localStorage.setItem('parklySettings', JSON.stringify(settings));
}

let alrLoadedSettings = false;
function loadSettings(force = false) {
    if (alrLoadedSettings && !force) return;
    alrLoadedSettings = true;
    const savedSettings = localStorage.getItem('parklySettings');
    if (!savedSettings) return; 
    
    const settings = JSON.parse(savedSettings);
    document.documentElement.style.setProperty('--text-size-factor', parseInt(settings.textSize) / 100);
    document.documentElement.setAttribute("data-theme", settings.darkMode ? "dark" : "light");


    if (!force) return;
    const textSizeSlider = document.getElementById('textSizeSlider');
    const textSizeValue = document.getElementById('textSizeValue');
    textSizeSlider.value = settings.textSize;
    textSizeValue.textContent = settings.textSize + '%';
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.checked = settings.darkMode;
    
    const textToSpeechToggle = document.getElementById('textToSpeechToggle');
    textToSpeechToggle.checked = settings.textToSpeech;
}

function initializeSettings() {
    loadSettings(true);

    const textSizeSlider = document.getElementById('textSizeSlider');
    const textSizeValue = document.getElementById('textSizeValue');
    
    textSizeSlider.addEventListener('input', function() {
        const size = this.value;
        textSizeValue.textContent = size + '%';
        document.documentElement.style.setProperty('--text-size-factor', parseInt(size) / 100);
        saveSettings();
    });
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', function() {
        document.documentElement.setAttribute("data-theme", this.checked ? "dark" : "light");
        saveSettings();
    });
    
    const textToSpeechToggle = document.getElementById('textToSpeechToggle');
    textToSpeechToggle.addEventListener('change', function() {
        saveSettings();
    });
}