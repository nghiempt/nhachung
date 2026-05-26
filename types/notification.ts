import { z } from "zod";

// ── Enums ──────────────────────────────────────────────────────
export const NotificationCategorySchema = z.enum([
  "urgent",
  "maintenance",
  "finance",
  "event",
  "community",
  "announcement",
  "security",
]);
export type NotificationCategory = z.infer<typeof NotificationCategorySchema>;

export const NotificationStatusSchema = z.enum(["unread", "read"]);
export type NotificationStatus = z.infer<typeof NotificationStatusSchema>;

export const NotificationIconColorSchema = z.enum([
  "red", "blue", "orange", "violet", "green", "mint", "amber",
]);
export type NotificationIconColor = z.infer<typeof NotificationIconColorSchema>;

// ── Attachment ─────────────────────────────────────────────────
export const AttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["pdf", "doc", "xls", "img"]),
  sizeLabel: z.string(), // e.g. "2.4 MB"
  url: z.string().url().optional(),
});
export type Attachment = z.infer<typeof AttachmentSchema>;

export const NotificationIconTypeSchema = z.enum([
  "warning",   // orange bg + triangle alert
  "info",      // blue bg + circle info
  "lightning", // amber bg + lightning bolt
  "document",  // violet bg + clipboard
  "calendar",  // green bg + calendar
  "shield",    // red bg + shield
  "bell",      // generic bell
]);
export type NotificationIconType = z.infer<typeof NotificationIconTypeSchema>;

// ── Notification (list item) ────────────────────────────────────
export const NotificationSchema = z.object({
  id: z.string(),
  category: NotificationCategorySchema,
  status: NotificationStatusSchema,
  eyebrow: z.string(),               // e.g. "THÔNG BÁO"
  title: z.string(),
  meta: z.string(),                  // e.g. "10:30 AM"
  time: z.string(),                  // ISO string
  timeLabel: z.string(),
  iconColor: NotificationIconColorSchema,
  iconType: NotificationIconTypeSchema,
  hasStatusDot: z.boolean().default(true),
  statusDotColor: z.enum(["red", "blue"]).optional(),
  isUrgent: z.boolean().default(false),
});
export type Notification = z.infer<typeof NotificationSchema>;

// ── Notification Detail ────────────────────────────────────────
export const NotificationDetailSchema = z.object({
  id: z.string(),
  category: NotificationCategorySchema,
  status: NotificationStatusSchema,
  eyebrow: z.string(),
  title: z.string(),
  isUrgent: z.boolean(),
  urgentLabel: z.string().optional(),
  author: z.object({
    name: z.string(),
    role: z.string(),
    verified: z.boolean().default(false),
    time: z.string(),
    viewCount: z.number(),
  }),
  body: z.array(z.string()),           // paragraphs
  timeCard: z.object({
    heading: z.string(),
    rows: z.array(z.string()),
  }).optional(),
  checklist: z.array(z.string()).optional(),
  alertText: z.string().optional(),
  signoff: z.object({
    lines: z.array(z.string()),
    signedBy: z.string(),
    title: z.string(),
  }).optional(),
  attachments: z.array(AttachmentSchema).optional(),
});
export type NotificationDetail = z.infer<typeof NotificationDetailSchema>;

// ── Featured (right-rail) ──────────────────────────────────────
export const FeaturedNotificationSchema = z.object({
  id: z.string(),
  isUrgent: z.boolean().default(false),
  kicker: z.string(),
  title: z.string(),
  meta: z.string(),
  iconColor: NotificationIconColorSchema,
  iconType: NotificationIconTypeSchema,
});
export type FeaturedNotification = z.infer<typeof FeaturedNotificationSchema>;

// ── Category count ─────────────────────────────────────────────
export const CategoryCountSchema = z.object({
  label: z.string(),
  count: z.number(),
  href: z.string().optional(),
});
export type CategoryCount = z.infer<typeof CategoryCountSchema>;

// ── Tab ────────────────────────────────────────────────────────
export const NotificationTabSchema = z.object({
  key: z.enum(["all", "urgent", "unread", "read"]),
  label: z.string(),
  count: z.number().optional(),
});
export type NotificationTab = z.infer<typeof NotificationTabSchema>;
