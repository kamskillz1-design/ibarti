export interface Country {
  id: string;
  name: string;
  isoCode: string;
}

export interface StateProvince {
  id: string;
  countryId: string;
  name: string;
}

export interface City {
  id: string;
  stateProvinceId: string;
  name: string;
  lat: number | null;
  lng: number | null;
}

/** The user's currently resolved location, and how it was resolved. */
export interface ResolvedLocation {
  cityId: string | null;
  stateProvinceId: string | null;
  countryId: string | null;
  source: "saved-profile" | "browser-geolocation" | "ip-fallback" | "manual";
}
