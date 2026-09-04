import { supabase } from "../lib/supabaseClient";
import type { AppNotification } from "../types/notification";

/**
 * Structural placeholder for day one — see plan section "structural
 * placeholder now, feature completed later". The `notifications` table and
 * this service exist from the start so later slices (Trade workflow,
 * Messaging) don't require a schema migration to add notifications; the
 * actual Realtime subscription wiring and in-app badge UI are built when
 * those slices are reached.
 */
export class NotificationService {
  async getUnreadCount(_userId: string): Promise<number> {
    throw new Error("not implemented — count notifications where read_at is null");
  }

  async listForUser(_userId: string): Promise<AppNotification[]> {
    throw new Error("not implemented — query notifications for user, newest first");
  }

  async markRead(_notificationId: string): Promise<void> {
    throw new Error("not implemented — set read_at = now()");
  }

  /**
   * Subscribes to new notifications for a user via Supabase Realtime.
   * Not implemented yet — wired up in the Trade/Messaging slice, once
   * something actually creates notification rows.
   */
  subscribe(_userId: string, _onNotification: (n: AppNotification) => void): () => void {
    void supabase;
    throw new Error("not implemented — supabase.channel(...).on('postgres_changes', ...)");
  }
}

export const notificationService = new NotificationService();
