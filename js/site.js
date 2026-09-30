/**
 * Valida y redirige la búsqueda enviada desde el Index.
 */
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

/**
 * Filtra dinámicamente las tarjetas del catálogo en catalogo.html.
 */
function applyCatalogFilters() {
    const subjectQuery = document.getElementById("subjectSearchInput")?.value.toLowerCase().trim() || "";
    const locationQuery = document.getElementById("locationSearchInput")?.value.toLowerCase().trim() || "";
    const modeQuery = document.getElementById("modeSelectFilter")?.value.toLowerCase().trim() || "";

    const teacherCards = document.querySelectorAll(".teacherCardItem");
    let visibleCount = 0;

    teacherCards.forEach(card => {
        const cardSubject = card.getAttribute("data-subject")?.toLowerCase() || "";
        const cardLocation = card.getAttribute("data-location")?.toLowerCase() || "";
        const cardMode = card.getAttribute("data-mode")?.toLowerCase() || "";

        const matchesSubject = !subjectQuery || cardSubject.includes(subjectQuery);
        const matchesLocation = !locationQuery || cardLocation.includes(locationQuery);
        const matchesMode = !modeQuery || cardMode === modeQuery;

        if (matchesSubject && matchesLocation && matchesMode) {
            card.classList.remove("d-none");
            visibleCount++;
        } else {
            card.classList.add("d-none");
        }
    });

    // Actualizar contador de resultados
    const resultsCounter = document.getElementById("catalogResultsCounter");
    const noResultsMsg = document.getElementById("noResultsMessage");
    const pagination = document.getElementById("catalogPagination");

    if (resultsCounter) {
        resultsCounter.textContent = `Mostrando ${visibleCount} profesor${visibleCount === 1 ? '' : 'es'} disponible${visibleCount === 1 ? '' : 's'}`;
    }

    if (noResultsMsg && pagination) {
        if (visibleCount === 0) {
            noResultsMsg.classList.remove("d-none");
            pagination.classList.add("d-none");
        } else {
            noResultsMsg.classList.add("d-none");
            pagination.classList.remove("d-none");
        }
    }
}

/**
 * Carga parámetros de URL en el catálogo al abrir la página.
 */
function initCatalogFromUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get("subject");
    const locationParam = urlParams.get("location");

    const subjectInput = document.getElementById("subjectSearchInput");
    const locationInput = document.getElementById("locationSearchInput");

    if (subjectParam && subjectInput) {
        subjectInput.value = subjectParam;
    }
    if (locationParam && locationInput) {
        locationInput.value = locationParam;
    }

    if (subjectParam || locationParam) {
        applyCatalogFilters();
    }
}

/**
 * Inicializador de eventos globales.
 */
function initializeGlobalEvents() {
    // Formulario de Búsqueda de la Landing / Index
    const landingSearchForm = document.getElementById("landingSearchForm");
    if (landingSearchForm) {
        landingSearchForm.addEventListener("submit", validateAndExecuteSearch);
    }

    // Formulario y Filtros en Catalogo.html
    const catalogFilterForm = document.getElementById("catalogFilterForm");
    if (catalogFilterForm) {
        catalogFilterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            applyCatalogFilters();
        });

        document.getElementById("modeSelectFilter")?.addEventListener("change", applyCatalogFilters);

        // Botón Reset/Limpiar
        const resetBtn = document.getElementById("resetCatalogFiltersBtn");
        const clearBtn = document.getElementById("clearSearchBtn");

        const clearAllFilters = () => {
            const subjectInput = document.getElementById("subjectSearchInput");
            const locationInput = document.getElementById("locationSearchInput");
            const modeSelect = document.getElementById("modeSelectFilter");

            if (subjectInput) subjectInput.value = "";
            if (locationInput) locationInput.value = "";
            if (modeSelect) modeSelect.value = "";

            applyCatalogFilters();
        };

        if (resetBtn) resetBtn.addEventListener("click", clearAllFilters);
        if (clearBtn) clearBtn.addEventListener("click", clearAllFilters);

        // Parsear URL de entrada
        initCatalogFromUrlParams();
    }
}

document.addEventListener("DOMContentLoaded", initializeGlobalEvents);