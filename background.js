browser.action.onClicked.addListener(async (tab) => {
    let result = await browser.storage.local.get("autoGrade");
    let newState = !result.autoGrade;
    await browser.storage.local.set({ autoGrade: newState });

    browser.tabs.sendMessage(tab.id, { command: "toggle", state: newState }).catch(() => { });
});