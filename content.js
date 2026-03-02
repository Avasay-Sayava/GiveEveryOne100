let checkInterval = null;

function executeGrading() {
    const gradeField = document.getElementById("id_grade");
    const saveButton = document.querySelector('button[name="saveandshownext"]');

    if (gradeField && saveButton && gradeField.value !== "100") {
        setTimeout(() => {
            gradeField.value = "100";
            saveButton.click();
        }, 1000);
    }
}

function startLoop() {
    if (!checkInterval) {
        checkInterval = setInterval(executeGrading, 1500);
    }
    executeGrading();
}

function stopLoop() {
    if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
    }
}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "toggle") {
        if (message.state) {
            startLoop();
        } else {
            stopLoop();
        }
    }
});

browser.storage.local.get("autoGrade").then((result) => {
    if (result.autoGrade) {
        startLoop();
    }
});