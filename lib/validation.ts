import { z } from "zod";

export const LoginFormValidation = z.object({
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),

  password: z.string().min(5, "Password must be at least 5 characters"),
});

export const RegistationFormValidation = z.object({
  username: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  country: z.string().optional(),
  isSeller: z.boolean().optional(),

  profilePicture: z
    .string()
    .url("Profile picture must be a valid URL")
    .min(1, "Profile picture is required"),
});

export const SellerFormValidation = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be at most 100 characters"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  profilePicture: z
    .string()
    .url("Profile picture must be a valid URL")
    .min(1, "Profile picture is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be at most 500 characters"),

  languages: z
    .array(
      z.object({
        language: z.string().min(1, "Language is required"),
        level: z.string().min(1, "Level is required"),
      })
    )
    .nonempty("At least one language is required"),
});

export const GigFormValidation = z.object({
  userId: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  desc: z.string().optional(),
  descJson: z.string().optional(),
  totalStars: z.number().nonnegative().default(0),
  starNumber: z.number().nonnegative().default(0),
  cat: z.string().min(1, "Category is required"),
  subCat: z.string().min(1, "Subcategory is required"),
  price: z.string(),
  cover: z.string().optional(),
  images: z.array(z.string()).optional(),
  shortTitle: z.string().min(1, "Short title is required"),
  shortDesc: z.string().min(1, "Short description is required"),
  deliveryTime: z.string().min(1, "Delivery time is required"),
  revisionNumber: z
    .string()
    .min(1, "Revision number is required and must be non-negative"),
  features: z.array(z.string()).optional(),
  sales: z.number().nonnegative().default(0),
});

export const ReviewValidationSchema = z.object({
  gigId: z.string().optional(),
  userId: z.string().optional(),
  star: z
    .number()
    .int()
    .min(1, "Star rating must be between 1 and 5")
    .max(5, "Star rating must be between 1 and 5")
    .refine((val) => [1, 2, 3, 4, 5].includes(val), {
      message: "Star rating must be one of 1, 2, 3, 4, 5",
    })
    .optional(),
  desc: z.string().min(1, "Description is required"),
});
