import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { localeService } from "../services/LocaleService";

// Configures i18next with Spanish as the reference/fallback language, matching
// the day-one decision: the region decides the default, not the browser, and
// a missing key always falls back to Spanish rather than showing a raw key.
//
// The actual "which language does this user see" decision is made by
// LocaleService.resolveLocale (saved preference -> region default -> app
// default) and applied via initLocale() below, called once at app startup.

void i18n.use(initReactI18next).init({
  fallbackLng: "es",
  supportedLngs: ["es", "eu", "en"],
  ns: ["translation"],
  defaultNS: "translation",
  interpolation: { escapeValue: false },
  resources: {}, // populated below via loadLocaleResources
});

async function loadLocaleResources(languageCode: string): Promise<void> {
  if (i18n.hasResourceBundle(languageCode, "translation")) return;
  const response = await fetch(`/locales/${languageCode}.json`);
  const resource = await response.json();
  i18n.addResourceBundle(languageCode, "translation", resource);
}

/**
 * Resolves and applies the correct language for the current user/session.
 * Call once at app startup, after the user's region has been resolved by
 * LocationService.
 */
export async function initLocale(userId: string | null, regionId: string | null): Promise<void> {
  const resolved = await localeService.resolveLocale(userId, regionId);
  await loadLocaleResources(resolved.languageCode);
  await i18n.changeLanguage(resolved.languageCode);
}

export default i18n;
