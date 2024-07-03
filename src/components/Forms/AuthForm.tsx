"use client";
import { AuthFormType } from "@/enums/authForm";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CustomInput from "@/components/Forms/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { signIn, signUp } from "@/lib/actions/userActions";
import { authFormSchema } from "@/lib/zodSchemas";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PlaidLink from "../PlaidLink";

const AuthForm = ({ type }: AuthFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type as AuthFormType);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      address1: "",
      dateOfBirth: "",
      firstName: "",
      lastName: "",
      postalCode: "",
      ssn: "",
      state: "",
      city: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      if (type === AuthFormType.SIGN_UP) {
        const userData = {
          email: data.email,
          password: data.password,
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === AuthFormType.SIGN_IN) {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      toast({
        title: "An Error Occurred",
        description:
          error instanceof Error ? error.message : "An Unknown Error Occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="flex cursor-pointer items-center gap-1">
          <Image
            src={"/icons/logo.svg"}
            alt="horizon logo"
            width={34}
            height={34}
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold">Horizon</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-400">
            {user
              ? "Link Account"
              : type === AuthFormType.SIGN_IN
                ? "Sign In"
                : "Sign Up"}

            <p className="text-16 font-normal text-gray-400">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          {/* Plaid Link */}
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === AuthFormType.SIGN_UP && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter specific address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example: NY"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="Example: YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="Social Security Number"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />

              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading
                    </>
                  ) : type === AuthFormType.SIGN_IN ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-400">
              {type === AuthFormType.SIGN_IN
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === AuthFormType.SIGN_IN ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === AuthFormType.SIGN_IN ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
