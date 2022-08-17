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
  },
  createPage: jest.fn().mockReturnValue({ name: "" }),
});
