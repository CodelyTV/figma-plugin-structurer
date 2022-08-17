import { CommandHandler } from "../../commands-setup/CommandHandler";
import { CreatePagesCommand } from "./CreatePagesCommand";

export class CreatePagesCommandHandler
  implements CommandHandler<CreatePagesCommand>
{
  constructor(private readonly figma: PluginAPI) {}

  // `command` argument needed due to polymorphism.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(command: CreatePagesCommand): void {
    this.createPages();

    const message = "✅ Pages created!";
    const options = { timeout: 2000 };
    this.figma.notify(message, options);
  }

  private createPages() {
    this.renameCurrentPageToCover();

    this.createPage("---");
    this.createPage("💻  Desktop");
    this.createPage("📱  Mobile");
    this.createPage("---");
    this.createPage("💀  Graveyard");
  }

  private renameCurrentPageToCover() {
    this.figma.currentPage.name = "🎇  Cover";
  }

  private createPage(name: string) {
    const page = this.figma.createPage();
    page.name = name;
  }
}
