"use client";

import { AuthFormType } from "@/enums/authForm";
import { z } from "zod";

export const authFormSchema = (type: AuthFormType) =>
  z.object({
    // sign up
    firstName:
      type === AuthFormType.SIGN_IN ? z.string().optional() : z.string().min(3),
    lastName:
      type === AuthFormType.SIGN_IN ? z.string().optional() : z.string().min(3),
    address1:
      type === AuthFormType.SIGN_IN
        ? z.string().optional()
        : z.string().max(50),
    city:
      type === AuthFormType.SIGN_IN
        ? z.string().optional()
        : z.string().max(50),
    state:
      type === AuthFormType.SIGN_IN
        ? z.string().optional()
        : z.string().min(2).max(2),
    postalCode:
      type === AuthFormType.SIGN_IN
        ? z.string().optional()
        : z.string().min(3).max(6),
    dateOfBirth:
      type === AuthFormType.SIGN_IN ? z.string().optional() : z.string().min(3),
    ssn:
      type === AuthFormType.SIGN_IN ? z.string().optional() : z.string().min(3),
    // both

    email: z.string().email(),
    password: z.string().min(8),
  });
