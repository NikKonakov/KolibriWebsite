import { describe, expect, it } from "vitest";
import { school, whatsappLink } from "./school";

describe("whatsappLink", () => {
  it("opens the school's chat", () => {
    expect(whatsappLink()).toBe(school.whatsapp);
    expect(whatsappLink()).toMatch(/^https:\/\/wa\.me\/\d+$/);
  });

  it("URL-encodes the pre-filled message", () => {
    const link = whatsappLink("Здравствуйте! «Колибри» & co?\nСпасибо");
    expect(link.startsWith(`${school.whatsapp}?text=`)).toBe(true);
    const query = link.split("?text=")[1];
    expect(query).not.toMatch(/[\s«»&?]/u);
    const message = new URL(link).searchParams.get("text");
    expect(message).toBe("Здравствуйте! «Колибри» & co?\nСпасибо");
  });
});
