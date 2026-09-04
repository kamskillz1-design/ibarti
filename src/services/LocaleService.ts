import { supabase } from "../lib/supabaseClient";
import type { Language, RegionLanguageOption, ResolvedLocale } from "../types/locale";

const APP_DEFAULT_LOCALE = import.meta.env.VITE_APP_DEFAULT_LOCALE ?? "en";

/**
 * Resolves which language the app should render in, and provides the
 * language options to show in the switcher for a given region.
 *
 * Resolution order, matching the day-one plan — the region decides the
 * default, not the device:
 *   1. Signed-in user's saved language preference
 *   2. The is_default=true row in region_languages for the resolved region
 *   3. VITE_APP_DEFAULT_LOCALE, if the region has no seeded row yet
 *
 * Browser language (navigator.language) is intentionally NOT part of this
 * chain — it may only be used to power an optional "switch to English?"
 * suggestion, never to silently override the region default.
 */
export class LocaleService {
  async resolveLocale(userId: string | null, regionId: string | null): Promise<ResolvedLocale> {
    const savedPreference = userId ? await this.getSavedLanguagePreference(userId) : null;
    if (savedPreference) {
      return { languageCode: savedPreference, source: "saved-preference" };
    }

    const regionDefault = regionId ? await this.getRegionDefaultLanguage(regionId) : null;
    if (regionDefault) {
      return { languageCode: regionDefault, source: "region-default" };
    }

    // No saved preference and no seeded default for this region yet — this is
    // the explicit final fallback so expansion into a new, not-yet-seeded
    // region never breaks the site.
    return { languageCode: APP_DEFAULT_LOCALE, source: "app-default" };
  }

  /** Options to render in the language switcher for the given region, in display order. */
  async getLanguageOptionsForRegion(_regionId: string): Promise<RegionLanguageOption[]> {
    throw new Error("not implemented — query region_languages ordered by display_order");
  }

  async getAllLanguages(): Promise<Language[]> {
    throw new Error("not implemented — query the languages table");
  }

  async saveUserLanguagePreference(_userId: string, _languageCode: string): Promise<void> {
    throw new Error("not implemented — write to profiles.preferred_language");
  }

  private async getSavedLanguagePreference(_userId: string): Promise<string | null> {
    void supabase;
    throw new Error("not implemented — read profiles.preferred_language");
  }

  private async getRegionDefaultLanguage(_regionId: string): Promise<string | null> {
    throw new Error(
      "not implemented — query region_languages where region_id = ? and is_default = true",
    );
  }
}

export const localeService = new LocaleService();
