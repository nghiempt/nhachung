import { z } from "zod";

export const BuildingSchema = z.object({
  id: z.string(),
  name: z.string(),
  apartment: z.string().optional(),  // e.g. "Căn hộ A-12.05"
  location: z.string(),              // e.g. "Vinhomes Central Park"
  isOwned: z.boolean().default(false),
  isActive: z.boolean().default(false),
});
export type Building = z.infer<typeof BuildingSchema>;
