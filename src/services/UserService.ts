import { supabase } from "../lib/supabaseClient";

/**
 * Owns the `profiles` table — identity, bio, saved location, saved language
 * preference, and role. Built out fully in the Auth + Profile slice; the
 * shape below is the day-one interface other services and pages code against.
 */
export class UserService {
  async getProfile(_userId: string) {
    throw new Error("not implemented — select from profiles where id = userId");
  }

  async updateProfile(
    _userId: string,
    _updates: {
      fullName?: string;
      bio?: string;
      cityId?: string;
      preferredLanguage?: string;
    },
  ) {
    void supabase;
    throw new Error("not implemented — update profiles set ... where id = userId");
  }
}

export const userService = new UserService();
