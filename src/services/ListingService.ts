import { supabase } from "../lib/supabaseClient";

/**
 * Owns the `listings` table (see supabase/migrations/0002_listings.sql).
 * Built out fully in the Listings slice; the shape below is the day-one
 * interface the Discovery/Home slice codes against.
 */
export class ListingService {
  async createListing(_input: {
    userId: string;
    listingType: "have" | "want";
    title: string;
    description?: string;
    exchangeType: "goods" | "services" | "digital";
    category: string;
    deliveryScope: "local" | "national" | "international" | "online";
    cityId?: string;
  }) {
    void supabase;
    throw new Error("not implemented — insert into listings, RLS + rate limit enforced by the DB");
  }

  async getListing(_listingId: string) {
    throw new Error("not implemented — select from listings where id = listingId");
  }

  async searchListings(_params: { query?: string; cityId?: string; category?: string }) {
    throw new Error("not implemented — query listings using search_vector for text, city_id for region");
  }
}

export const listingService = new ListingService();
