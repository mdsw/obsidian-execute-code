import { Setting } from "obsidian";
import { SettingsTab } from "../SettingsTab";

export default (tab: SettingsTab, containerEl: HTMLElement) => {
    containerEl.createEl('h3', { text: 'Julia Settings' });
    new Setting(containerEl)
        .setName('Julia path')
        .addText(text => text
            .setValue(tab.plugin.settings.juliaPath)
            .onChange(async (value) => {
                const sanitized = tab.sanitizePath(value);
                tab.plugin.settings.juliaPath = sanitized;
                console.log('julia path set to: ' + sanitized);
                await tab.plugin.saveSettings();
            }));
    new Setting(containerEl)
        .setName('Julia arguments')
        .addText(text => text
            .setValue(tab.plugin.settings.juliaArgs)
            .onChange(async (value) => {
                tab.plugin.settings.juliaArgs = value;
                console.log('Julia args set to: ' + value);
                await tab.plugin.saveSettings();
            }));
    tab.makeInjectSetting(containerEl, "julia");
}