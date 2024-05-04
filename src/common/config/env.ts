import * as z from "zod";

const envSchema = z.object({
    VITE_SERVER_URL: z.string(),
});

export const env = envSchema.parse(import.meta.env);
