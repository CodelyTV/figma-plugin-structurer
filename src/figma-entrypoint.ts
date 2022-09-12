import { Command } from "./commands-setup/Command";
import { handleCommand } from "./commands-setup/handleCommand";

registerPluginUiCommandHandlers();
showUi();

function registerPluginUiCommandHandlers(): void {
  figma.ui.onmessage = async <CommandType extends Command>(
    command: CommandType
  ) => await handleCommand(command);
}

function showUi(): void {
  figma.showUI(__html__, { themeColors: true });
  figma.ui.resize(270, 440);
}
