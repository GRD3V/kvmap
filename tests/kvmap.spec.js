// @ts-check

import { expect, it, beforeEach, describe, vi } from "vitest";
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

  describe("get, set, delete", () => {
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

  describe("Event when set", () => {
    it("should emit an event when title is set", () => {
      const handler_title = vi.fn();
      kvmap.addListenner("title", handler_title);

      kvmap.set("title", "Hello, world!");
      expect(handler_title).toBeCalledWith("Hello, world!");

      kvmap.set("title", "Hello, KVMap!");
      expect(handler_title).toBeCalledWith("Hello, KVMap!");
    });

    it("should not emit an event when title is set", () => {
      const handler_title = vi.fn();

      kvmap.addListenner("title", handler_title);
      kvmap.set("title", "Hello, world!");
      expect(handler_title).toBeCalledWith("Hello, world!");

      kvmap.removeListenner("title", handler_title);
      kvmap.set("title", "Hello, KVMap!");
      expect(handler_title).not.toBeCalledWith("Hello, KVMap!");
    });
  });
});
