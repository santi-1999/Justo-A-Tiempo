"use strict";
window.addEventListener("load", program);
// Boton de guardar en inicio
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../sw.js");
}
function program() {
    var _a, _b, _c, _d, _e;
    // Menu behavior on mobile
    setReadyTheMobileNavigation();
    // Not done yet message
    setReadyToDisplayDevelopmentMessage();
    // Behavior of home calc date view
    setDefaultValueOnCalcDate();
    setTextInTermInput();
    //  Show custom filters when selected
    showCustomFiltersWhenSelected();
    // Patchs
    let width = window.innerWidth;
    let label = document.getElementById("idLabelNoti");
    if (width < 1024) {
        label.textContent = "Fecha:";
    }
    else {
        label.textContent = "Fecha de notificación:";
    }
    window.addEventListener("resize", () => {
        width = window.innerWidth;
        if (width < 1024) {
            label.textContent = "Fecha:";
        }
        else {
            label.textContent = "Fecha de notificación:";
        }
    });
    // Night mode
    (_a = document.getElementById("idNightMode")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        document.getElementsByTagName("html")[0].classList.toggle("dark");
    });
    // Compartir btn
    (_b = document.getElementById("idCompartir")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
        e.preventDefault();
        try {
            navigator.share({ url: "https://dev-santi.github.io/Justo-A-Tiempo-Remake" });
        }
        catch (error) {
            console.log(error);
        }
    });
    // change month with fingers on mobile
    let startPosition = 0;
    let currMonth = 0;
    let nextMonth = -1;
    (_c = document.getElementById("days")) === null || _c === void 0 ? void 0 : _c.addEventListener("touchstart", (e) => {
        startPosition = e.touches[0].clientX;
        currMonth =
            Number.parseInt(defaultCalendar.getState().currentPage[0].getStringDate().split("/")[1]) - 1;
    });
    (_d = document.getElementById("days")) === null || _d === void 0 ? void 0 : _d.addEventListener("touchmove", (e) => {
        const x = e.touches[0].clientX;
        if (startPosition - x > 40) {
            nextMonth = currMonth + 1;
        }
        else if (x - startPosition > 40) {
            nextMonth = currMonth - 1;
        }
    });
    (_e = document.getElementById("days")) === null || _e === void 0 ? void 0 : _e.addEventListener("touchend", (e) => {
        if (nextMonth >= 0 && nextMonth <= 11) {
            defaultCalendar.goToMonth(nextMonth);
            load();
            startPosition = 0;
        }
    });
}
function setReadyTheMobileNavigation() {
    const menu = document.getElementById("idAsideMenu");
    const openMenuBtn = document.getElementById("idOpenMenuBtn");
    const closeMenuBtn = document.getElementById("idCloseMenuBtn");
    openMenuBtn.addEventListener("click", () => {
        menu.dataset.state = "1";
    });
    closeMenuBtn.addEventListener("click", () => {
        menu.dataset.state = "0";
    });
}
function setReadyToDisplayDevelopmentMessage() {
    const onDevelopmentElements = document.getElementsByClassName("development");
    const effectsContainer = document.getElementById("idEffectsContainer");
    for (let i = 0; i < onDevelopmentElements.length && effectsContainer; i++) {
        onDevelopmentElements[i].addEventListener("click", () => {
            const developMessage = createMessage("development_message", "./assets/icons/settings.svg", "En desarrollo");
            effectsContainer.appendChild(developMessage);
        });
    }
}
function createMessage(className, src, message) {
    const developMessage = document.createElement("div");
    const icon = document.createElement("img");
    icon.src = src;
    icon.alt = "Un ícono irrelevante";
    developMessage.innerText = message;
    developMessage.classList.add(className);
    developMessage.appendChild(icon);
    setTimeout(() => {
        developMessage.remove();
    }, 4000);
    return developMessage;
}
function setDefaultValueOnCalcDate() {
    const input = document.getElementById("idNotificationDate");
    const date = new Date();
    // Ajustar la fecha para el formato YYYY-MM-DD
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() empieza desde 0
    const year = date.getFullYear().toString();
    // Asignar la fecha al input
    input.value = `${year}-${month}-${day}`;
}
function setTextInTermInput() {
    const termInput = document.getElementById("idTerm");
    const termText = document.getElementById("idTermText");
    updateTextInTermInput(termInput, termText);
    termInput.addEventListener("input", (e) => {
        updateTextInTermInput(termInput, termText);
    });
}
function updateTextInTermInput(termInput, termText) {
    const value = parseInt(termInput.value);
    if (value > 0 && value < 999) {
        termInput.value = value;
    }
    else {
        termInput.value = 0;
    }
    const length = (termInput.value + "").length;
    if (length > 2) {
        termText.className = "day_text ml_2";
    }
    else if (length > 1) {
        termText.className = "day_text ml_1";
    }
    else {
        termText.className = "day_text";
    }
    if (termInput.value == 1) {
        termText.textContent = "día";
    }
    else {
        termText.textContent = "días";
    }
}
function showCustomFiltersWhenSelected() {
    const options = document.getElementById("idCategory");
    const isSelected = options.value == 2;
    const filters = document.getElementById("customFilters");
    const container = document.getElementById("calcContentContainer");
    if (isSelected) {
        filters === null || filters === void 0 ? void 0 : filters.classList.add("active");
        container === null || container === void 0 ? void 0 : container.classList.add("active");
    }
    options.addEventListener("change", (e) => {
        const isSelected = options.value == 2;
        if (isSelected) {
            filters === null || filters === void 0 ? void 0 : filters.classList.add("active");
            container === null || container === void 0 ? void 0 : container.classList.add("active");
        }
        else {
            filters === null || filters === void 0 ? void 0 : filters.classList.remove("active");
            container === null || container === void 0 ? void 0 : container.classList.remove("active");
        }
    });
}
