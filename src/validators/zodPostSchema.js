import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ["images/jpeg", "images/jpg", "images/png", "images./webp"];
export const zodPostSchema = z.object({
    caption: z.string({message: "Caption is required"}).min(1),
});