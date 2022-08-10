import { NetworkRequestCommandHandler } from "../browser-commands/network-request/NetworkRequestCommandHandler";
import { CreateLayersCommandHandler } from "../scene-commands/create-layers/CreateLayersCommandHandler";
import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";

// 👋 Add below your new commands.
// Define its arbitrary key and its corresponding Handler class.
// Tip: Declare your Command and CommandHandler classes creating a folder inside the `src/scene-commands` or `src/browser-commands` ones depending on the things you need to get access to (see the README explanation) 😊
export const CommandsMapping: Record<string, () => CommandHandler<Command>> = {
  networkRequest: () => new NetworkRequestCommandHandler(),
  createLayers: () => new CreateLayersCommandHandler(figma),
};
