import { supabase } from "../lib/supabaseClient";
import type { ResolvedLocation, City, StateProvince, Country } from "../types/location";

/**
 * Resolves the user's current location and provides lookup/search over the
 * seeded countries/states_provinces/cities tables.
 *
 * Resolution order, matching the day-one plan:
 *   1. Saved location on the user's profile (if signed in and set)
 *   2. Browser geolocation (if permission granted)
 *   3. IP-based fallback (ipapi.co free tier)
 *   4. Manual prompt — caller is responsible for showing a "choose your
 *      region" UI when this function returns a location with all fields null.
 *
 * This is the only place in the app that calls the browser geolocation API
 * or the IP fallback API. Pages and components must go through this service.
 */
export class LocationService {
  /** Resolves the best-available location for the current user/session. */
  async resolveCurrentLocation(userId: string | null): Promise<ResolvedLocation> {
    const savedLocation = userId ? await this.getSavedProfileLocation(userId) : null;
    if (savedLocation) {
      return { ...savedLocation, source: "saved-profile" };
    }

    const browserLocation = await this.tryBrowserGeolocation();
    if (browserLocation) {
      return { ...browserLocation, source: "browser-geolocation" };
    }

    const ipLocation = await this.tryIpFallback();
    if (ipLocation) {
      return { ...ipLocation, source: "ip-fallback" };
    }

    // Nothing resolved — caller must prompt the user to pick a region manually.
    return {
      cityId: null,
      stateProvinceId: null,
      countryId: null,
      source: "manual",
    };
  }

  async getCountries(): Promise<Country[]> {
    throw new Error("not implemented — query the seeded countries table");
  }

  async getStateProvinces(_countryId: string): Promise<StateProvince[]> {
    throw new Error("not implemented — query the seeded states_provinces table");
  }

  async getCities(_stateProvinceId: string): Promise<City[]> {
    throw new Error("not implemented — query the seeded cities table");
  }

  async searchCities(_query: string): Promise<City[]> {
    throw new Error("not implemented — full-text search over the cities table");
  }

  private async getSavedProfileLocation(
    _userId: string,
  ): Promise<Omit<ResolvedLocation, "source"> | null> {
    void supabase; // service will read from `profiles` once implemented
    throw new Error("not implemented — read city_id/state_province_id/country_id from profiles");
  }

  private async tryBrowserGeolocation(): Promise<Omit<ResolvedLocation, "source"> | null> {
    throw new Error(
      "not implemented — navigator.geolocation.getCurrentPosition, then reverse-match to nearest seeded city",
    );
  }

  private async tryIpFallback(): Promise<Omit<ResolvedLocation, "source"> | null> {
    throw new Error(
      "not implemented — call VITE_IPAPI_BASE_URL, then match the returned country/region to seeded rows",
    );
  }
}

export const locationService = new LocationService();
