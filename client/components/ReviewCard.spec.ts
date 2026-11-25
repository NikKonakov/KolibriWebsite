import { describe, expect, it } from "vitest";
import { getInitials } from "./ReviewCard";

describe("getInitials", () => {
  it("takes the first letters of up to two words", () => {
    expect(getInitials("Larisa Kolesnikova")).toBe("LK");
    expect(getInitials("Алла Колядова")).toBe("АК");
    expect(getInitials("Anna Maria Petrova")).toBe("AM");
    expect(getInitials("cher")).toBe("C");
  });
});
