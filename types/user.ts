import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  apartment: z.string(),    // e.g. "Căn hộ A-12.05"
  avatarUrl: z.string().url(),
  role: z.enum(["resident", "admin", "manager"]).default("resident"),
});
export type User = z.infer<typeof UserSchema>;
