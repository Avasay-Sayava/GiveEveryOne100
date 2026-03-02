let domObserver = null;
let isExtensionActive = false;

function checkAndGrade() {
    const gradeField = document.getElementById("id_grade");
    const saveButton = document.querySelector('button[name="saveandshownext"]');

    if (gradeField && saveButton && gradeField.value !== "100") {
        gradeField.value = "100";
        saveButton.click();
    }
}

function setupObserver() {
    if (domObserver) domObserver.disconnect();

    domObserver = new MutationObserver(() => {
        if (isExtensionActive) {
            checkAndGrade();
        }
    });

    domObserver.observe(document.body, { childList: true, subtree: true, attributes: true });
    checkAndGrade();
}

function stopObserver() {
    if (domObserver) {
        domObserver.disconnect();
        domObserver = null;
    }
}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "toggle") {
        isExtensionActive = message.state;
        if (isExtensionActive) {
            setupObserver();
        } else {
            stopObserver();
        }
    }
});

browser.storage.local.get("autoGrade").then((result) => {
    isExtensionActive = !!result.autoGrade;
    if (isExtensionActive) {
        setupObserver();
    }
});