import { describe, expect, it } from "vitest";
import { FairnessEngine } from "../../src/services/FairnessEngine";

describe("FairnessEngine", () => {
  it("weights inputs according to the documented formula", () => {
    const engine = new FairnessEngine();
    const result = engine.calculateScore({
      categoryCompatibility: 1,
      mutualPreferenceFit: 1,
      scopeLocationCompatibility: 1,
      userConfirmedBalance: 1,
    });
    expect(result.score).toBe(100);
  });

  it("returns 0 when every input is 0", () => {
    const engine = new FairnessEngine();
    const result = engine.calculateScore({
      categoryCompatibility: 0,
      mutualPreferenceFit: 0,
      scopeLocationCompatibility: 0,
      userConfirmedBalance: 0,
    });
    expect(result.score).toBe(0);
  });
});
