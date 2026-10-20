import { test } from "node:test";
import assert from "node:assert/strict";
import { originForHost, isLegacyHost } from "./seo-hosts";

test("hosts", () => {
  assert.equal(originForHost("fifthexit.eu"), "https://fifthexit.eu");
  assert.equal(originForHost("www.fifthexit.eu"), "https://fifthexit.eu");
  assert.equal(originForHost("fifthexit.com"), "https://fifthexit.com");
  assert.equal(isLegacyHost("hype-street.com"), true);
  assert.equal(isLegacyHost("www.hype-street.com:443"), true);
  assert.equal(isLegacyHost("fifthexit.com"), false);
});
