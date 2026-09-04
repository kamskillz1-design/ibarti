import { supabase } from "../lib/supabaseClient";

export type TradeStatus =
  | "pending"
  | "accepted"
  | "meeting_arranged"
  | "completed"
  | "rejected"
  | "cancelled"
  | "disputed";

/**
 * Owns trade_requests / trade_request_items. Built out fully in the Trade
 * workflow slice. Enforces the explicit state machine from the plan:
 *   pending -> accepted -> meeting_arranged -> completed
 *   pending -> rejected | cancelled
 *   accepted -> cancelled | disputed
 */
export class TradeService {
  async proposeTrade(_input: {
    proposerId: string;
    requestedListingId: string;
    offeredListingId: string;
  }) {
    void supabase;
    throw new Error("not implemented — insert trade_requests row with status 'pending'");
  }

  async transitionStatus(_tradeId: string, _newStatus: TradeStatus) {
    throw new Error("not implemented — validate against the state machine, then update status");
  }
}

export const tradeService = new TradeService();
