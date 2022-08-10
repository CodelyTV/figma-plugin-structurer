import { CommandHandler } from "../../commands-setup/CommandHandler";
import { CreateLayersCommand } from "./CreateLayersCommand";

export class CreateLayersCommandHandler
  implements CommandHandler<CreateLayersCommand>
{
  constructor(private readonly figma: PluginAPI) {}

  // `command` argument needed due to polymorphism.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(command: CreateLayersCommand): void {
    const message = "👋 Hi. CreateLayersCommand executed!";
    const options = { timeout: 2000 };

    this.figma.notify(message, options);
  }
}
