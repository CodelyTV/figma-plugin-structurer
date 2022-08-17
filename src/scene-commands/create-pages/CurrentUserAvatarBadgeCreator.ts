import { NetworkRequestCommand } from "../../browser-commands/network-request/NetworkRequestCommand";
import { executeCommand } from "../../commands-setup/executeCommand";

export type BadgeStyle = {
  avatarImage: {
    size: number;
    xAxisPosition: number;
    yAxisPosition: number;
  };
  userNameText: {
    fontSize: number;
    fontFamily: string;
  };
};

export class CurrentUserAvatarBadgeCreator {
  constructor(private readonly figma: PluginAPI) {}

  create(badgeStyle: BadgeStyle): Promise<void> {
    console.log("CurrentUserAvatarBadgeCreator.create(badgeStyle): ");
    console.log(badgeStyle);

    const currentUserAvatarUrl = this.figma.currentUser?.photoUrl;
    const currentUserName = this.figma.currentUser?.name;

    if (currentUserAvatarUrl === undefined || currentUserAvatarUrl === null) {
      this.figma.notify("Sorry but you do not have an avatar to add 😅");

      return Promise.resolve();
    }

    const responseType = "arraybuffer";
    executeCommand(
      new NetworkRequestCommand(currentUserAvatarUrl, responseType)
    );

    return new Promise((resolve) => {
      this.figma.ui.onmessage = async (command) => {
        this.ensureToOnlyReceiveNetworkRequestResponse(command);

        await this.createAvatarBadge(
          badgeStyle,
          command.payload as ArrayBuffer,
          currentUserName as string
        );
        resolve();
      };
    });
  }

  private ensureToOnlyReceiveNetworkRequestResponse(command: { type: string }) {
    if (command.type !== "networkRequestResponse") {
      const errorMessage =
        "Unexpected command received while performing the request for painting the user avatar.";

      throw new Error(errorMessage);
    }
  }

  private async createAvatarBadge(
    badgeStyle: BadgeStyle,
    imageBuffer: ArrayBuffer,
    userName: string
  ): Promise<void> {
    this.createAvatarImage(badgeStyle, imageBuffer, userName);
    await this.createAvatarText(badgeStyle, userName);
  }

  private createAvatarImage(
    badgeStyle: BadgeStyle,
    avatarImage: ArrayBuffer,
    currentUserName: string
  ): EllipseNode {
    const imageUint8Array = new Uint8Array(avatarImage);
    const figmaImage = this.figma.createImage(imageUint8Array);
    const imageWrapper = this.figma.createEllipse();

    imageWrapper.x = badgeStyle.avatarImage.xAxisPosition;
    imageWrapper.y = badgeStyle.avatarImage.yAxisPosition;
    imageWrapper.resize(
      badgeStyle.avatarImage.size,
      badgeStyle.avatarImage.size
    );
    imageWrapper.fills = [
      { type: "IMAGE", scaleMode: "FILL", imageHash: figmaImage.hash },
    ];
    imageWrapper.name = `${currentUserName} avatar`;

    this.figma.currentPage.appendChild(imageWrapper);

    return imageWrapper;
  }

  private async createAvatarText(
    badgeStyle: BadgeStyle,
    userName: string
  ): Promise<TextNode> {
    const userNameText = this.figma.createText();
    userNameText.x = this.figma.viewport.center.x - userName.length / 2;
    userNameText.y =
      this.figma.viewport.center.y +
      badgeStyle.avatarImage.size +
      badgeStyle.avatarImage.size / badgeStyle.userNameText.fontSize;

    const fontName: FontName = {
      family: badgeStyle.userNameText.fontFamily,
      style: "Regular",
    };
    await this.figma.loadFontAsync(fontName);

    userNameText.characters = userName;
    userNameText.fontSize = badgeStyle.userNameText.fontSize;

    return userNameText;
  }
}
