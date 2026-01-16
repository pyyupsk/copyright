/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Copyright } from "../src/react";

describe("Copyright React Component", () => {
  let mockDate: Date;

  beforeEach(() => {
    mockDate = new Date(2026, 0, 1);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  describe("basic rendering", () => {
    it("should render copyright text", () => {
      render(<Copyright owner="ACME Corp" />);
      expect(screen.getByText("\u00A9 2026 ACME Corp")).toBeDefined();
    });

    it("should render with year range", () => {
      render(<Copyright owner="ACME Corp" startYear={2020} />);
      expect(screen.getByText("\u00A9 2020-2026 ACME Corp")).toBeDefined();
    });

    it("should render with default span element", () => {
      render(<Copyright owner="ACME Corp" />);
      const element = screen.getByText("\u00A9 2026 ACME Corp");
      expect(element.tagName.toLowerCase()).toBe("span");
    });
  });

  describe("format option", () => {
    it("should render minimal format", () => {
      render(<Copyright owner="ACME Corp" format="minimal" />);
      expect(screen.getByText("\u00A9 2026 ACME Corp")).toBeDefined();
    });

    it("should render standard format", () => {
      render(<Copyright owner="ACME Corp" format="standard" />);
      expect(screen.getByText("Copyright \u00A9 2026 ACME Corp")).toBeDefined();
    });

    it("should render full format", () => {
      render(<Copyright owner="ACME Corp" format="full" />);
      expect(
        screen.getByText(
          "Copyright \u00A9 2026 ACME Corp. All rights reserved.",
        ),
      ).toBeDefined();
    });

    it("should render legal format", () => {
      render(<Copyright owner="ACME Corp" format="legal" />);
      expect(
        screen.getByText(
          "Copyright \u00A9 2026 ACME Corp. All Rights Reserved.",
        ),
      ).toBeDefined();
    });
  });

  describe("custom template", () => {
    it("should render with custom template", () => {
      render(
        <Copyright owner="ACME Corp" template="Made by {owner} in {year}" />,
      );
      expect(screen.getByText("Made by ACME Corp in 2026")).toBeDefined();
    });
  });

  describe("as prop", () => {
    it("should render as footer element", () => {
      render(<Copyright owner="ACME Corp" as="footer" />);
      const element = screen.getByText("\u00A9 2026 ACME Corp");
      expect(element.tagName.toLowerCase()).toBe("footer");
    });

    it("should render as div element", () => {
      render(<Copyright owner="ACME Corp" as="div" />);
      const element = screen.getByText("\u00A9 2026 ACME Corp");
      expect(element.tagName.toLowerCase()).toBe("div");
    });

    it("should render as p element", () => {
      render(<Copyright owner="ACME Corp" as="p" />);
      const element = screen.getByText("\u00A9 2026 ACME Corp");
      expect(element.tagName.toLowerCase()).toBe("p");
    });
  });

  describe("tag prop", () => {
    it("should render with tag prop", () => {
      render(<Copyright owner="ACME Corp" tag="small" />);
      const element = screen.getByText("\u00A9 2026 ACME Corp");
      expect(element.tagName.toLowerCase()).toBe("small");
    });

    it("should prefer as prop over tag prop", () => {
      render(<Copyright owner="ACME Corp" as="footer" tag="div" />);
      const element = screen.getByText("\u00A9 2026 ACME Corp");
      expect(element.tagName.toLowerCase()).toBe("footer");
    });
  });

  describe("className prop", () => {
    it("should apply className", () => {
      render(<Copyright owner="ACME Corp" className="copyright-text" />);
      const element = screen.getByText("\u00A9 2026 ACME Corp");
      expect(element.className).toBe("copyright-text");
    });

    it("should apply multiple classes", () => {
      render(<Copyright owner="ACME Corp" className="text-sm text-gray-500" />);
      const element = screen.getByText("\u00A9 2026 ACME Corp");
      expect(element.className).toBe("text-sm text-gray-500");
    });
  });

  describe("style prop", () => {
    it("should apply inline styles", () => {
      render(
        <Copyright
          owner="ACME Corp"
          style={{ fontSize: "14px", color: "gray" }}
        />,
      );
      const element = screen.getByText("\u00A9 2026 ACME Corp");
      expect(element.style.fontSize).toBe("14px");
      expect(element.style.color).toBe("gray");
    });
  });
});
