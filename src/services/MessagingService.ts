import { supabase } from "../lib/supabaseClient";

/**
 * Owns trade_messages and user_blocks. Built out fully in the Messaging &
 * moderation slice.
 */
export class MessagingService {
  async sendMessage(_tradeId: string, _senderId: string, _body: string) {
    void supabase;
    throw new Error("not implemented — insert into trade_messages");
  }

  async listMessages(_tradeId: string) {
    throw new Error("not implemented — select trade_messages for tradeId, oldest first");
  }

  async blockUser(_userId: string, _blockedUserId: string) {
    throw new Error("not implemented — insert into user_blocks");
  }
}

export const messagingService = new MessagingService();
