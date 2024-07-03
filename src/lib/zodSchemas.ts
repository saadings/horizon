"use client";

import { AuthFormType } from "@/enums/authForm";
import { z } from "zod";

const oneDigit = new RegExp("(?=.*\\d)");
const oneLowerCase = new RegExp("(?=.*[a-z])");
const oneUpperCase = new RegExp("(?=.*[A-Z])");
const oneSpecialCharacter = new RegExp("(?=.*[!@#$%^&*.])");

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
    password: z
      .string()
      .min(6, {
        message: "Password must be at least six characters long",
      })
      .regex(oneDigit, {
        message: "Password must include at least one number",
      })
      .regex(oneLowerCase, {
        message: "Password must include at least one lowercase letter",
      })
      .regex(oneUpperCase, {
        message: "Password must include at least one uppercase letter",
      })
      .regex(oneSpecialCharacter, {
        message: "Password must include at least one special character",
      }),
  });
