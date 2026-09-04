export interface FairnessInputs {
  categoryCompatibility: number; // 0-1
  mutualPreferenceFit: number; // 0-1
  scopeLocationCompatibility: number; // 0-1
  userConfirmedBalance: number; // 0-1
}

export interface FairnessScore {
  score: number; // 0-100
  breakdown: FairnessInputs;
}

/**
 * Non-monetary fairness indicator, built out fully once Listings and Trade
 * workflow exist to feed it real inputs. Weights match the plan:
 *   0.35 category + 0.25 preference fit + 0.20 scope/location + 0.20 confirmed balance
 */
export class FairnessEngine {
  calculateScore(inputs: FairnessInputs): FairnessScore {
    const score =
      0.35 * inputs.categoryCompatibility +
      0.25 * inputs.mutualPreferenceFit +
      0.2 * inputs.scopeLocationCompatibility +
      0.2 * inputs.userConfirmedBalance;

    return { score: Math.round(score * 100), breakdown: inputs };
  }
}

export const fairnessEngine = new FairnessEngine();
