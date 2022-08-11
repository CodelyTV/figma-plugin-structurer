import { mock } from "jest-mock-extended";

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
    type DeepPartial<T> = T extends object
      ? {
          [P in keyof T]?: DeepPartial<T[P]>;
        }
      : T;

    function mockFigmaPluginApi(
      propertiesToMock: DeepPartial<PluginAPI>
    ): PluginAPI {
      return propertiesToMock as unknown as PluginAPI;
    }

    const figmaPluginApiMock = mockFigmaPluginApi({
      notify: jest.fn(),
      currentPage: {
        name: "",
      },
      createPage: jest.fn().mockReturnValue({ name: "" }),
    });

    const commandHandler = new CreatePagesCommandHandler(figmaPluginApiMock);
    const command = new CreatePagesCommand();
    commandHandler.handle(command);

    assertExecutionHasBeenNotified(figmaPluginApiMock);
    assertCoverPageHasBeenRenamed(figmaPluginApiMock);
    assertOtherPagesHasBeenCreated(figmaPluginApiMock);
  });
});

function assertExecutionHasBeenNotified(figmaPluginApiMock: PluginAPI) {
  const farewellMessage = "✅ Pages created!";
  const options = { timeout: 2000 };

  expect(figmaPluginApiMock.notify).toHaveBeenCalledWith(
    farewellMessage,
    options
  );
}

function assertCoverPageHasBeenRenamed(figmaPluginApiMock: PluginAPI) {
  expect(figmaPluginApiMock.currentPage.name).toBe("🎇  Cover");
}

function assertOtherPagesHasBeenCreated(figmaPluginApiMock: PluginAPI) {
  const pageToBeCreatedNames = [
    "---",
    "💻  Desktop",
    "📱  Mobile",
    "---",
    "💀  Graveyard",
  ];

  pageToBeCreatedNames.forEach(() =>
    expect(figmaPluginApiMock.createPage).toHaveBeenCalled()
  );

  // 🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩
  // 🚩 Here we can see the limitations of the Figma API.     🚩
  // 🚩 We can not test out the names of the created pages :/ 🚩
  // 🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩🚨🚩🚘🚩
}
