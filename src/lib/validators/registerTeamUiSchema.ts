import { z } from "zod";

const MAX_LOGO_MB = 5;
const MAX_GUIDE_MB = 10;

const fileSchema = z.instanceof(File);

const logoPngSchema = fileSchema
  .refine((f) => f.type === "image/png", "Logo must be a PNG file")
  .refine((f) => f.size <= MAX_LOGO_MB * 1024 * 1024, `Logo must be under ${MAX_LOGO_MB}MB`);

const guidelinePdfSchema = fileSchema
  .refine((f) => f.type === "application/pdf", "Brand guidelines must be a PDF")
  .refine((f) => f.size <= MAX_GUIDE_MB * 1024 * 1024, `Brand guidelines must be under ${MAX_GUIDE_MB}MB`);

export const playerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  jerseyNumber: z.coerce.number().int().min(1, "Jersey number is required").max(99, "Max 99"),
  position: z.string().min(2, "Position is required"),
  jerseySize: z.enum(["S", "M", "L", "XL", "XXL"]),
  phone: z.string().min(7, "Phone is required"),
});

export const registerTeamUiSchema = z.object({
  companyName: z.string().min(2, "Company/Team name is required"),
  email: z.string().email("Valid email is required"),
  managerName: z.string().min(2, "Manager name is required"),
  phone: z.string().min(7, "Phone is required"),
  captainName: z.string().min(2, "Captain name is required"),
  captainPhone: z.string().min(7, "Captain phone is required"),

  players: z.array(playerSchema).length(10, "Exactly 10 players are required"),

  logoPng: logoPngSchema,
  brandGuidelinesPdf: guidelinePdfSchema.optional(),

  confirmEmployees: z.literal(true, { errorMap: () => ({ message: "Please confirm players are employees" }) }),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms & conditions" }) }),
});

export type RegisterTeamUiInput = z.infer<typeof registerTeamUiSchema>;
