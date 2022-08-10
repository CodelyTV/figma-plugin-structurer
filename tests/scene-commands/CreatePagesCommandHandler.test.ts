import { mock, mockDeep } from "jest-mock-extended";

import { CreatePagesCommand } from "../../src/scene-commands/create-layers/CreatePagesCommand";
import { CreatePagesCommandHandler } from "../../src/scene-commands/create-layers/CreatePagesCommandHandler";

describe("CreatePagesCommandHandler", () => {
  it("can be instantiated without throwing errors", () => {
    const figmaPluginApiMock = mock<PluginAPI>();

    const commandHandlerInstantiator = () => {
      new CreatePagesCommandHandler(figmaPluginApiMock);
    };

    expect(commandHandlerInstantiator).not.toThrow(TypeError);
  });

  it("notifies the end used with a farewell message", () => {
    const figmaPluginApiMock = mockDeep<PluginAPI>();
    const commandHandler = new CreatePagesCommandHandler(figmaPluginApiMock);
    const command = new CreatePagesCommand();

    commandHandler.handle(command);
    const farewellMessage = "✅ Pages created!";
    expect(figmaPluginApiMock.notify).toHaveBeenCalledWith(farewellMessage);

    // figmaPluginApiMock.currentPage.name.calledWith("🎇  Cover");
    // expect(figmaPluginApiMock.currentPage.name).toHaveBeenCalledWith(
    //   "🎇  Cover"
    // );
    // expect(figmaPluginApiMock.createPage).toHaveBeenCalled();
  });
});
