import { CommandHandler } from "../../commands-setup/CommandHandler";
import { CreatePagesCommand } from "./CreatePagesCommand";

export class CreatePagesCommandHandler
  implements CommandHandler<CreatePagesCommand>
{
  constructor(private readonly figma: PluginAPI) {}

  // `command` argument needed due to polymorphism.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(command: CreatePagesCommand): Promise<void> {
    this.createPages();
    const frame = await this.createCoverPageContent();
    this.notifyEndUserWithFarewellMessage();

    this.focusUiOn([frame]);
  }

  private createPages(): void {
    const renameCurrentPageToCover = (): void => {
      this.figma.currentPage.name = "🎇  Cover";
    };

    const createPage = (name: string): void => {
      const page = this.figma.createPage();
      page.name = name;
    };

    renameCurrentPageToCover();

    createPage("---");
    createPage("💻  Desktop");
    createPage("📱  Mobile");
    createPage("---");
    createPage("💀  Graveyard");
  }

  private async createCoverPageContent(): Promise<FrameNode> {
    const createFrame = async (): Promise<FrameNode> => {
      const frame = this.figma.createFrame();

      const almostBlackColor = { r: 0.15, g: 0.15, b: 0.15 };
      frame.fills = [{ type: "SOLID", color: almostBlackColor }];

      frame.layoutMode = "VERTICAL";
      frame.primaryAxisAlignItems = "MIN";
      frame.counterAxisAlignItems = "CENTER";
      frame.paddingTop = 100;
      frame.itemSpacing = 30;
      frame.resize(1240, 640);

      return frame;
    };

    const createHeading = async (
      container: FrameNode,
      name: string
    ): Promise<TextNode> => {
      const heading = this.figma.createText();

      const font = { family: "Arial", style: "Bold" };
      await this.figma.loadFontAsync(font);
      heading.fontName = font;
      heading.characters = name;
      heading.fontSize = 120;
      const whiteColor = { r: 1, g: 1, b: 1 };
      heading.fills = [{ type: "SOLID", color: whiteColor }];

      heading.textAlignHorizontal = "CENTER";
      heading.layoutPositioning = "AUTO";

      return heading;
    };

    const createDescription = async (
      container: FrameNode,
      heading: TextNode,
      text: string
    ): Promise<TextNode> => {
      const description = this.figma.createText();

      const font = { family: "Arial", style: "Regular" };
      await this.figma.loadFontAsync(font);
      description.fontName = font;
      description.fontSize = 64;
      const whiteColor = { r: 1, g: 1, b: 1 };
      description.fills = [{ type: "SOLID", color: whiteColor }];
      description.characters = text;

      description.textAlignHorizontal = "CENTER";
      description.layoutPositioning = "AUTO";

      return description;
    };
    const frame = await createFrame();
    const heading = await createHeading(frame, "✌️ Add your title ✌️");
    const description = await createDescription(
      frame,
      heading,
      "🪩 Add your description 🪩"
    );

    this.figma.currentPage.appendChild(frame);
    frame.appendChild(heading);
    frame.appendChild(description);

    this.figma.currentPage.selection = [heading];

    return frame;
  }

  private notifyEndUserWithFarewellMessage(): void {
    const message =
      "✅ Pages created. Press enter to modify your Cover heading!";
    const options = { timeout: 6000 };
    this.figma.notify(message, options);
  }

  private focusUiOn(container: SceneNode[]) {
    this.figma.viewport.scrollAndZoomIntoView(container);
  }
}
