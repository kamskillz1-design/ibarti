export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

/** One language option available for a given region, seeded per-region in the DB. */
export interface RegionLanguageOption {
  regionId: string;
  languageCode: string;
  isDefault: boolean;
  displayOrder: number;
}

/** The language actually resolved for the current session, and why. */
export interface ResolvedLocale {
  languageCode: string;
  source: "saved-preference" | "region-default" | "app-default";
}
