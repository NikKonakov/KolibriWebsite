import { describe, expect, it } from "vitest";
import { suggestLanguage } from "./detect";

describe("suggestLanguage", () => {
  it("keeps Russian-reading visitors on the Russian page", () => {
    expect(suggestLanguage("ru", ["ru-RU"])).toBeNull();
    expect(suggestLanguage("ru", ["en-CA", "ru"])).toBeNull();
    expect(suggestLanguage("ru", ["uk-UA", "en"])).toBeNull();
  });

  it("offers English on the Russian page to everyone else", () => {
    expect(suggestLanguage("ru", ["en-CA", "en"])).toBe("en");
    expect(suggestLanguage("ru", ["fr-CA"])).toBe("en");
  });

  it("offers Russian on the English page only when Russian comes first", () => {
    expect(suggestLanguage("en", ["ru-RU", "en"])).toBe("ru");
    expect(suggestLanguage("en", ["en-CA", "ru"])).toBeNull();
    expect(suggestLanguage("en", ["en-US"])).toBeNull();
  });

  it("does nothing without browser languages", () => {
    expect(suggestLanguage("ru", [])).toBeNull();
    expect(suggestLanguage("en", [])).toBeNull();
  });
});
