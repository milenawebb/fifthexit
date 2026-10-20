import { expect, test } from "vitest";
import { originForHost, isLegacyHost } from "./seo-hosts";
test("hosts", () => {
  expect(originForHost("fifthexit.eu")).toBe("https://fifthexit.eu");
  expect(originForHost("www.fifthexit.eu")).toBe("https://fifthexit.eu");
  expect(originForHost("fifthexit.com")).toBe("https://fifthexit.com");
  expect(isLegacyHost("hype-street.com")).toBe(true);
  expect(isLegacyHost("www.hype-street.com:443")).toBe(true);
  expect(isLegacyHost("fifthexit.com")).toBe(false);
});
