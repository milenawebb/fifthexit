import { test } from "node:test";
import assert from "node:assert/strict";
import { originForHost, isLegacyHost, SITEMAP_PAGES, hreflangLinks } from "./seo-hosts";

test("hosts", () => {
  assert.equal(originForHost("fifthexit.eu"), "https://fifthexit.eu");
  assert.equal(originForHost("www.fifthexit.eu"), "https://fifthexit.eu");
  assert.equal(originForHost("fifthexit.com"), "https://fifthexit.com");
  assert.equal(isLegacyHost("hype-street.com"), true);
  assert.equal(isLegacyHost("www.hype-street.com:443"), true);
  assert.equal(isLegacyHost("fifthexit.com"), false);
});

test("RIN case study is included in both domain sitemaps", () => {
  const page = SITEMAP_PAGES.find(page => page.path === "/work/rin-aesthetic-practice");
  assert.ok(page);
  assert.equal(`${originForHost("fifthexit.com")}${page.path}`, "https://fifthexit.com/work/rin-aesthetic-practice");
  assert.equal(`${originForHost("fifthexit.eu")}${page.path}`, "https://fifthexit.eu/work/rin-aesthetic-practice");
});

test("RIN case study has English, Bulgarian and x-default alternates", () => {
  assert.deepEqual(hreflangLinks("/work/rin-aesthetic-practice"), [
    { rel: "alternate", hrefLang: "en", href: "https://fifthexit.com/work/rin-aesthetic-practice" },
    { rel: "alternate", hrefLang: "bg", href: "https://fifthexit.eu/work/rin-aesthetic-practice" },
    { rel: "alternate", hrefLang: "x-default", href: "https://fifthexit.com/work/rin-aesthetic-practice" },
  ]);
});
