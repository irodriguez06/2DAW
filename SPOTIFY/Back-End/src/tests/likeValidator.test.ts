import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isValidLike } from "../validators/likeValidator";

describe("like validator", () => {
    it("accepts a positive like event", () => {
        assert.equal(isValidLike({ track: "track-id", like: 1 }), true);
    });

    it("accepts a negative like event", () => {
        assert.equal(isValidLike({ track: "track-id", like: -1 }), true);
    });

    it("rejects empty tracks and values other than 1 or -1", () => {
        assert.equal(isValidLike({ track: " ", like: 1 }), false);
        assert.equal(isValidLike({ track: "track-id", like: 0 }), false);
        assert.equal(isValidLike({ track: "track-id", like: 2 }), false);
    });
});
