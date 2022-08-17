type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

function mockFigmaPluginApiWith(
  propertiesToMock: DeepPartial<PluginAPI>
): PluginAPI {
  return propertiesToMock as unknown as PluginAPI;
}

export const figmaPluginApiMockForCreatePagesCommand = mockFigmaPluginApiWith({
  notify: jest.fn(),
  currentPage: {
    name: "",
    appendChild: jest.fn(),
  },
  createFrame: jest
    .fn()
    .mockReturnValue({ width: 0, appendChild: jest.fn(), resize: jest.fn() }),
  createPage: jest.fn().mockReturnValue({ name: "" }),
  createText: jest.fn().mockReturnValue({
    fontName: {},
    characters: {},
    fontSize: {},
    textAlignHorizontal: {},
  }),
  loadFontAsync: jest.fn(),
  viewport: {
    scrollAndZoomIntoView: jest.fn(),
  },
});
