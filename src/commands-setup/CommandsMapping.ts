import { NetworkRequestCommandHandler } from "../browser-commands/network-request/NetworkRequestCommandHandler";
import { CreatePagesCommandHandler } from "../scene-commands/create-pages/CreatePagesCommandHandler";
import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";

// 👋 Add below your new commands.
// Define its arbitrary key and its corresponding Handler class.
// Tip: Declare your Command and CommandHandler classes creating a folder inside the `src/scene-commands` or `src/browser-commands` ones depending on the things you need to get access to (see the README explanation) 😊
export const CommandsMapping: Record<string, () => CommandHandler<Command>> = {
  networkRequest: () => new NetworkRequestCommandHandler(),
  createPages: () => new CreatePagesCommandHandler(figma),
};
