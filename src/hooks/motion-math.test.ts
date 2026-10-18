import { test } from "node:test";
import assert from "node:assert/strict";
import { compactNavigation, mvpProgress, scrollProgress } from "./motion-math";

test("navigation compacts only after 80px", () => {
  assert.equal(compactNavigation(80), false);
  assert.equal(compactNavigation(81), true);
});
test("four MVP steps fill 25, 50, 75 and 100 percent", () => {
  assert.deepEqual([0, 1, 2, 3].map(mvpProgress), [0.25, 0.5, 0.75, 1]);
});
test("scroll track clamps at the first and final card", () => {
  assert.equal(scrollProgress(-20, 200), 0);
  assert.equal(scrollProgress(100, 200), 0.5);
  assert.equal(scrollProgress(400, 200), 1);
});