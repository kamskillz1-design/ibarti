export type NotificationType =
  | "trade_proposed"
  | "trade_accepted"
  | "trade_rejected"
  | "trade_message"
  | "trade_completed";

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  relatedTradeId: string | null;
  readAt: string | null;
  createdAt: string;
}
