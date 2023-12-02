// @ts-check

import { expect, it, beforeEach, describe } from "vitest";
import { KVMap } from "../src";

/**
 * @typedef KeyValueMap
 * @property { string } title
 */

describe("KVMap class", () => {
  /** @type {KVMap<KeyValueMap>} */
  let kvmap;

  beforeEach(() => {
    kvmap = new KVMap(/** @type {KeyValueMap} */ ({}));
  });

  it("should get title", () => {
    // Arrange
    kvmap.set("title", "Title 1");

    // Assert
    expect(kvmap.get("title")).toBe("Title 1");
  });

  it("should not get title when deleted", () => {
    // Arrange
    kvmap.set("title", "Title 1");
    kvmap.delete("title");

    // Assert
    expect(kvmap.get("title")).toBe(undefined);
  });

  it("should get title from initDb", () => {
    // Arrange
    const kvmap = new KVMap(
      /** @type {KeyValueMap} */ ({
        title: "Title 1",
      })
    );

    // Assert
    expect(kvmap.get("title")).toBe("Title 1");
  });
});
