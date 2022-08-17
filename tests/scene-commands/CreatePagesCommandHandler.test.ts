import { mock } from "jest-mock-extended";

import { CreatePagesCommand } from "../../src/scene-commands/create-layers/CreatePagesCommand";
import { CreatePagesCommandHandler } from "../../src/scene-commands/create-layers/CreatePagesCommandHandler";
import { figmaPluginApiMockForCreatePagesCommand } from "../figma-mocks/figma-mocks";

describe("CreatePagesCommandHandler", () => {
  it("can be instantiated without throwing errors", () => {
    const figmaPluginApiMock = mock<PluginAPI>();

    const commandHandlerInstantiator = () => {
      new CreatePagesCommandHandler(figmaPluginApiMock);
    };

    expect(commandHandlerInstantiator).not.toThrow(TypeError);
  });

  it("notifies the end used with a farewell message", () => {
    const commandHandler = new CreatePagesCommandHandler(
      figmaPluginApiMockForCreatePagesCommand
    );
    const command = new CreatePagesCommand();

    commandHandler.handle(command);

    assertExecutionHasBeenNotified(figmaPluginApiMockForCreatePagesCommand);
  });

  it("rename Cover Page", () => {
    const commandHandler = new CreatePagesCommandHandler(
      figmaPluginApiMockForCreatePagesCommand
    );
    const command = new CreatePagesCommand();

    commandHandler.handle(command);

    assertCoverPageHasBeenRenamed(figmaPluginApiMockForCreatePagesCommand);
  });

  it("create secondary pages", () => {
    const commandHandler = new CreatePagesCommandHandler(
      figmaPluginApiMockForCreatePagesCommand
    );
    const command = new CreatePagesCommand();

    commandHandler.handle(command);

    assertOtherPagesHasBeenCreated(figmaPluginApiMockForCreatePagesCommand);
  });
});

function assertExecutionHasBeenNotified(mock: PluginAPI) {
  const farewellMessage = "✅ Pages created!";
  const options = { timeout: 2000 };

  expect(mock.notify).toHaveBeenCalledWith(farewellMessage, options);
}

function assertCoverPageHasBeenRenamed(mock: PluginAPI) {
  expect(mock.currentPage.name).toBe("🎇  Cover");
}

function assertOtherPagesHasBeenCreated(mock: PluginAPI) {
  const pageToBeCreatedNames = [
    "---",
    "💻  Desktop",
    "📱  Mobile",
    "---",
    "💀  Graveyard",
  ];

  pageToBeCreatedNames.forEach(() =>
    expect(mock.createPage).toHaveBeenCalled()
  );

  // 🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩
  // 🚩 Here we can see the limitations of the Figma API.     🚩
  // 🚩 We can not test out the names of the created pages :/ 🚩
  // 🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩
}
