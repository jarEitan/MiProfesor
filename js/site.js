function validateAndExecuteSearch(event) {
    event.preventDefault();

    const subjectInputField = document.getElementById("subjectSearchInput");
    const locationInputField = document.getElementById("locationSearchInput");
    const validationMessageContainer = document.getElementById("searchValidationMessage");

    const subjectInputValue = subjectInputField ? subjectInputField.value.trim() : "";
    const locationInputValue = locationInputField ? locationInputField.value.trim() : "";

    if (subjectInputValue === "" && locationInputValue === "") {
        if (validationMessageContainer) {
            validationMessageContainer.innerHTML = "Por favor ingresá una materia o zona antes de buscar.";
            validationMessageContainer.style.display = "block";
        }
        return false;
    }

    if (validationMessageContainer) {
        validationMessageContainer.style.display = "none";
    }

    window.location.href = `catalogo.html?subject=${encodeURIComponent(subjectInputValue)}&location=${encodeURIComponent(locationInputValue)}`;
    return true;
}

function initializeGlobalEvents() {
    const landingSearchForm = document.getElementById("landingSearchForm");
    if (landingSearchForm) {
        landingSearchForm.addEventListener("submit", validateAndExecuteSearch);
    }
}

document.addEventListener("DOMContentLoaded", initializeGlobalEvents);