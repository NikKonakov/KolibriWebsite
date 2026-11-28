import { describe, expect, it } from "vitest";
import {
  collapseBlankLines,
  imageFileName,
  localDate,
  safeHttpsUrl,
  shorten,
  splitTitle,
  toNewsItem,
} from "./news.mjs";

describe("localDate", () => {
  it("uses the Calgary day, not the UTC day", () => {
    // 01:01 UTC on Nov 23 is 18:01 on Nov 22 in Calgary.
    expect(localDate("2026-11-23T01:01:23+0000")).toBe("2026-11-22");
    expect(localDate("2026-07-01T18:00:00+0000")).toBe("2026-07-01");
  });

  it("returns undefined for an unreadable date", () => {
    expect(localDate("yesterday")).toBeUndefined();
  });
});

describe("splitTitle", () => {
  it("uses a short first line as the title", () => {
    expect(splitTitle("Стихи с чаем\nПриходите 29 ноября")).toEqual({
      title: "Стихи с чаем",
      text: "Приходите 29 ноября",
    });
  });

  it("makes a short one-line post all title", () => {
    expect(splitTitle("Встреча с поэзией — 29 ноября!!!")).toEqual({
      title: "Встреча с поэзией — 29 ноября!!!",
      text: "",
    });
  });

  it("keeps a long first line as text", () => {
    const long = "а".repeat(150) + "\nещё";
    expect(splitTitle(long)).toEqual({ text: long });
    expect(splitTitle("б".repeat(150))).toEqual({ text: "б".repeat(150) });
  });

  it("keeps emoji in the title", () => {
    expect(splitTitle("🎄 Family Movie Night\nТекст").title).toBe(
      "🎄 Family Movie Night",
    );
  });
});

describe("collapseBlankLines and shorten", () => {
  it("removes empty lines between paragraphs", () => {
    expect(collapseBlankLines("  один\n\n\nдва \n \nтри ")).toBe(
      "один\nдва \nтри",
    );
  });

  it("cuts long text at a word boundary with an ellipsis", () => {
    const text = "слово ".repeat(200);
    const short = shorten(text, 100);
    expect(short.length).toBeLessThanOrEqual(101);
    expect(short.endsWith("слово…")).toBe(true);
    expect(shorten("коротко", 100)).toBe("коротко");
  });

  it("never cuts an emoji in half", () => {
    // No spaces, so the cut falls at max - 40 = 60: inside the 8-unit emoji.
    const text = "а".repeat(59) + "👨‍👩‍👧" + "б".repeat(60);
    expect(shorten(text, 100)).toBe("а".repeat(59) + "…");
    const whole = "а".repeat(55) + "🎄" + "б".repeat(60);
    expect(shorten(whole, 100)).toBe(
      "а".repeat(55) + "🎄" + "б".repeat(3) + "…",
    );
  });
});

describe("safeHttpsUrl and imageFileName", () => {
  it("accepts only https links", () => {
    expect(safeHttpsUrl("https://www.facebook.com/reel/1/")).toBe(
      "https://www.facebook.com/reel/1/",
    );
    expect(safeHttpsUrl("javascript:alert(1)")).toBeUndefined();
    expect(safeHttpsUrl("http://example.com")).toBeUndefined();
    expect(safeHttpsUrl("not a url")).toBeUndefined();
    expect(safeHttpsUrl(42)).toBeUndefined();
  });

  it("keeps only digits and underscores in file names", () => {
    expect(imageFileName("1887_2310")).toBe("1887_2310");
    expect(imageFileName("../../etc/passwd")).toBe("post");
  });
});

describe("toNewsItem", () => {
  const post = {
    message: "Заголовок\n\nТекст поста",
    created_time: "2026-11-22T00:50:45+0000",
    permalink_url: "https://www.facebook.com/reel/2093030784720629/",
  };

  it("builds a card with title, Calgary date, text, photo and link", () => {
    expect(toNewsItem(post, "/news/fb/1.jpg")).toEqual({
      date: "2026-11-21",
      title: { ru: "Заголовок" },
      text: { ru: "Текст поста" },
      image: "/news/fb/1.jpg",
      link: "https://www.facebook.com/reel/2093030784720629/",
    });
  });

  it("turns a one-line post into a title-only card", () => {
    expect(
      toNewsItem({ ...post, message: "Встреча с поэзией — 29 ноября!!!" }),
    ).toMatchObject({
      title: { ru: "Встреча с поэзией — 29 ноября!!!" },
      text: {},
    });
  });

  it("drops unsafe links and skips posts without text or date", () => {
    expect(
      toNewsItem({ ...post, permalink_url: "javascript:alert(1)" }),
    ).not.toHaveProperty("link");
    expect(toNewsItem({ ...post, message: "  " })).toBeNull();
    expect(toNewsItem({ ...post, created_time: undefined })).toBeNull();
  });
});
