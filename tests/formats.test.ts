import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Copyright } from "../src/copyright";
import { FORMAT_TEMPLATES } from "../src/formats";

describe("Preset Formats", () => {
  let mockDate: Date;

  beforeEach(() => {
    mockDate = new Date(2026, 0, 1);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("FORMAT_TEMPLATES", () => {
    it("should have minimal format template", () => {
      expect(FORMAT_TEMPLATES.minimal).toBe("{symbol} {year} {owner}");
    });

    it("should have standard format template", () => {
      expect(FORMAT_TEMPLATES.standard).toBe(
        "Copyright {symbol} {year} {owner}",
      );
    });

    it("should have full format template", () => {
      expect(FORMAT_TEMPLATES.full).toBe(
        "Copyright {symbol} {year} {owner}. All rights reserved.",
      );
    });

    it("should have legal format template", () => {
      expect(FORMAT_TEMPLATES.legal).toBe(
        "Copyright {symbol} {year} {owner}. All Rights Reserved.",
      );
    });
  });

  describe("Copyright with format option", () => {
    const owner = "ACME Corp";

    it("should use minimal format by default", () => {
      const copyright = new Copyright({ owner });
      expect(copyright.getText()).toBe("\u00A9 2026 ACME Corp");
    });

    it("should use minimal format when explicitly set", () => {
      const copyright = new Copyright({ owner, format: "minimal" });
      expect(copyright.getText()).toBe("\u00A9 2026 ACME Corp");
    });

    it("should use standard format", () => {
      const copyright = new Copyright({ owner, format: "standard" });
      expect(copyright.getText()).toBe("Copyright \u00A9 2026 ACME Corp");
    });

    it("should use full format", () => {
      const copyright = new Copyright({ owner, format: "full" });
      expect(copyright.getText()).toBe(
        "Copyright \u00A9 2026 ACME Corp. All rights reserved.",
      );
    });

    it("should use legal format", () => {
      const copyright = new Copyright({ owner, format: "legal" });
      expect(copyright.getText()).toBe(
        "Copyright \u00A9 2026 ACME Corp. All Rights Reserved.",
      );
    });

    it("should use year range with minimal format", () => {
      const copyright = new Copyright({
        owner,
        startYear: 2020,
        format: "minimal",
      });
      expect(copyright.getText()).toBe("\u00A9 2020-2026 ACME Corp");
    });

    it("should use year range with standard format", () => {
      const copyright = new Copyright({
        owner,
        startYear: 2020,
        format: "standard",
      });
      expect(copyright.getText()).toBe("Copyright \u00A9 2020-2026 ACME Corp");
    });

    it("should use year range with full format", () => {
      const copyright = new Copyright({
        owner,
        startYear: 2020,
        format: "full",
      });
      expect(copyright.getText()).toBe(
        "Copyright \u00A9 2020-2026 ACME Corp. All rights reserved.",
      );
    });

    it("should use year range with legal format", () => {
      const copyright = new Copyright({
        owner,
        startYear: 2020,
        format: "legal",
      });
      expect(copyright.getText()).toBe(
        "Copyright \u00A9 2020-2026 ACME Corp. All Rights Reserved.",
      );
    });
  });
});
