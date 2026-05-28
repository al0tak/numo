import { LANGUAGES, translations } from "./translations";

type Json = string | { [key: string]: Json };

function leafPaths(value: Json, prefix = ""): string[] {
  if (typeof value === "string") return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    leafPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

const languageCodes = Object.keys(LANGUAGES) as (keyof typeof LANGUAGES)[];

describe("translations", () => {
  it("defines every language listed in LANGUAGES", () => {
    for (const code of languageCodes) {
      expect(translations[code]).toBeDefined();
    }
  });

  it("uses the same set of keys across every language", () => {
    const reference = leafPaths(translations.en as unknown as Json).sort();
    for (const code of languageCodes) {
      const paths = leafPaths(translations[code] as unknown as Json).sort();
      expect(paths, `language "${code}" key set`).toEqual(reference);
    }
  });

  it("has no empty translation strings", () => {
    for (const code of languageCodes) {
      const dict = translations[code] as unknown as Json;
      for (const path of leafPaths(dict)) {
        const value = path
          .split(".")
          .reduce<Json>((acc, key) => (acc as { [k: string]: Json })[key], dict);
        expect(value, `${code}.${path}`).not.toBe("");
      }
    }
  });
});
