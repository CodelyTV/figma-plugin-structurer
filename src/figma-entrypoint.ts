import { handleCommand } from "./commands-setup/handleCommand";
import { CreatePagesCommand } from "./scene-commands/create-layers/CreatePagesCommand";

createInvisibleUiForBrowserApiAccess();

await handleCommand(new CreatePagesCommand());

function createInvisibleUiForBrowserApiAccess() {
  const randomHtmlToAvoidFigmaError = "<body></body>";
  figma.showUI(randomHtmlToAvoidFigmaError, { visible: false });
}
