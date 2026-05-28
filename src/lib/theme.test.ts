import { isThemeMode } from "./theme";

describe("isThemeMode", () => {
  it("accepts the three valid theme modes", () => {
    expect(isThemeMode("light")).toBe(true);
    expect(isThemeMode("dark")).toBe(true);
    expect(isThemeMode("auto")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isThemeMode("system")).toBe(false);
    expect(isThemeMode("")).toBe(false);
    expect(isThemeMode(null)).toBe(false);
    expect(isThemeMode(undefined)).toBe(false);
    expect(isThemeMode(0)).toBe(false);
    expect(isThemeMode({})).toBe(false);
  });
});
