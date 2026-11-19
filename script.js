
// ===================================
// INTERACTIVE PORTFOLIO NAVIGATION
// ===================================

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-btn");
const pageTitle = document.getElementById("pageTitle");

let currentView = "home";

const titles = {
    home: "Home",
    about: "About Me",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certification: "Certification",
    contact: "Contact",
    cert1: "Certificate Details",
    cert2: "Certificate Details",
    project1: "Project Details",
    project2: "Project Details"
};


// Display the selected page
function showView(viewName) {

    const selectedView = document.getElementById(viewName);

    // Prevent errors if a view does not exist
    if (!selectedView) {
        console.error("Page not found:", viewName);
        return;
    }

    // Hide all views
    views.forEach(view => {
        view.classList.remove("active");
    });

    // Show selected view
    selectedView.classList.add("active");

    currentView = viewName;

    // Update heading
    pageTitle.textContent = titles[viewName] || "Portfolio";

    // Update active sidebar icon
    navButtons.forEach(button => {
        button.classList.remove("active");

        if (button.dataset.view === viewName) {
            button.classList.add("active");
        }
    });

    // Keep parent navigation highlighted on detail pages
    if (viewName.startsWith("cert")) {
        document.querySelector('[data-view="certification"]')
            .classList.add("active");
    }

    if (viewName.startsWith("project")) {
        document.querySelector('[data-view="projects"]')
            .classList.add("active");
    }
}


// Sidebar navigation
navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const destination = button.dataset.view;

        showView(destination);

    });

});


// Home button
document.getElementById("homeButton").addEventListener("click", () => {
    showView("home");
});


// Buttons inside pages
document.querySelectorAll("[data-go]").forEach(button => {

    button.addEventListener("click", () => {

        showView(button.dataset.go);

    });

});


// Certificate details
document.querySelectorAll("[data-certificate]").forEach(card => {

    card.addEventListener("click", () => {

        const certificate = card.dataset.certificate;

        showView(certificate);

    });

});


// Project details
document.querySelectorAll("[data-project]").forEach(button => {

    button.addEventListener("click", () => {

        const project = button.dataset.project;

        showView(project);

    });

});


// Back buttons
document.querySelectorAll("[data-back]").forEach(button => {

    button.addEventListener("click", () => {

        const previousSection = button.dataset.back;

        showView(previousSection);

    });

});


// ===================================
// DARK MODE / LIGHT MODE
// ===================================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");


// Restore saved theme
const savedTheme = localStorage.getItem("portfolioTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    updateThemeButton(true);
}


// Update theme button appearance
function updateThemeButton(isDark) {

    if (isDark) {

        themeIcon.className = "fa-solid fa-sun";
        themeText.textContent = "Light Mode";

    } else {

        themeIcon.className = "fa-solid fa-moon";
        themeText.textContent = "Dark Mode";

    }

}


// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    updateThemeButton(isDark);

    // Save theme preference
    localStorage.setItem(
        "portfolioTheme",
        isDark ? "dark" : "light"
    );

});


// ===================================
// INITIAL PAGE
// ===================================

showView("home");


function openImagePreview(imageSource) {
    const preview = document.getElementById("imagePreview");
    const previewImage = document.getElementById("previewImage");

    previewImage.src = imageSource;
    preview.classList.add("show");
}

function closeImagePreview() {
    document.getElementById("imagePreview").classList.remove("show");
}

// Make project and certificate images clickable
document.addEventListener("click", function(event) {
    const image = event.target.closest(
        ".project-image img, .detail-image img, .cert-image img"
    );

    if (image) {
        event.preventDefault();
        event.stopPropagation();
        openImagePreview(image.src);
    }
});

// Close when clicking outside the image
document.getElementById("imagePreview").addEventListener("click", function(event) {
    if (event.target === this) {
        closeImagePreview();
    }
});

// Close with Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeImagePreview();
    }
});

/* SKILLS CLICK FUNCTION */
document.addEventListener("click", function(event) {

    const skillButton = event.target.closest("[data-skill]");

    if (skillButton) {
        event.preventDefault();

        const skillId = skillButton.dataset.skill;
        console.log("Clicked skill:", skillId);

        showView(skillId);
        return;
    }

    const backButton = event.target.closest('[data-back="skills"]');

    if (backButton) {
        event.preventDefault();
        showView("skills");
    }

});


// ===================================
// SETTINGS FUNCTIONALITY
// ===================================

const settingsBtn = document.getElementById("settingsBtn");
const settingsOverlay = document.getElementById("settingsOverlay");
const closeSettings = document.getElementById("closeSettings");

const languageSelect = document.getElementById("languageSelect");
const fontSelect = document.getElementById("fontSelect");
const fontSizeSelect = document.getElementById("fontSizeSelect");
const resetSettings = document.getElementById("resetSettings");

// OPEN SETTINGS
settingsBtn.addEventListener("click", () => {
    settingsOverlay.classList.add("active");
});

// CLOSE SETTINGS
closeSettings.addEventListener("click", () => {
    settingsOverlay.classList.remove("active");
});

// CLOSE WHEN CLICKING OUTSIDE
settingsOverlay.addEventListener("click", (event) => {
    if (event.target === settingsOverlay) {
        settingsOverlay.classList.remove("active");
    }
});

// APPLY FONT STYLE
function applyFont(font) {
    document.body.style.fontFamily = font;
    localStorage.setItem("portfolioFont", font);
}

// APPLY FONT SIZE
function applyFontSize(size) {
    document.documentElement.style.fontSize = size;
    localStorage.setItem("portfolioFontSize", size);
}

// FONT STYLE CHANGE
fontSelect.addEventListener("change", () => {
    applyFont(fontSelect.value);
});

// FONT SIZE CHANGE
fontSizeSelect.addEventListener("change", () => {
    applyFontSize(fontSizeSelect.value);
});

// LANGUAGE SELECTION
languageSelect.addEventListener("change", () => {
    localStorage.setItem("portfolioLanguage", languageSelect.value);

    alert("Language preference saved. Full translation requires language-specific text translations.");
});

// RESTORE SAVED SETTINGS
const savedFont = localStorage.getItem("portfolioFont");
const savedFontSize = localStorage.getItem("portfolioFontSize");
const savedLanguage = localStorage.getItem("portfolioLanguage");

if (savedFont) {
    fontSelect.value = savedFont;
    applyFont(savedFont);
}

if (savedFontSize) {
    fontSizeSelect.value = savedFontSize;
    applyFontSize(savedFontSize);
}

if (savedLanguage) {
    languageSelect.value = savedLanguage;
}

// RESET SETTINGS
resetSettings.addEventListener("click", () => {

    fontSelect.value = "Poppins";
    fontSizeSelect.value = "16px";
    languageSelect.value = "en";

    applyFont("Poppins");
    applyFontSize("16px");

    localStorage.removeItem("portfolioLanguage");

    alert("Settings have been reset!");
});
