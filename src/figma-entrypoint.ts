import { handleCommand } from "./commands-setup/handleCommand";
import { CreateLayersCommand } from "./scene-commands/create-layers/CreateLayersCommand";

createInvisibleUiForBrowserApiAccess();

await handleCommand(new CreateLayersCommand());

function createInvisibleUiForBrowserApiAccess() {
  const randomHtmlToAvoidFigmaError = "<body></body>";
  figma.showUI(randomHtmlToAvoidFigmaError, { visible: false });
}
