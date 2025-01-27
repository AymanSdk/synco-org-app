import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthActions } from "@convex-dev/auth/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInFormInputs, SignInCardProps } from "../types";

export const SignInCard: React.FC<SignInCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>();

  const onSubmit: SubmitHandler<SignInFormInputs> = async ({ email, password }) => {
    setErrorMessage(null);
    try {
      await signIn("password", { email, password, flow: "signIn" });
    } catch {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const onProviderSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider);
    } catch {
      setErrorMessage(`Failed to sign in with ${provider}. Please try again.`);
    }
  };

  return (
    <Card className="w-full border-none shadow-none max-w-md">
      <CardHeader className="space-y-2 px-0">
        <CardTitle className="text-3xl font-semibold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-sm text-center text-gray-500">
          Enter your email and password to sign in to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-0 py-4">
        {/* Error Message */}
        {errorMessage && (
          <div className="flex items-center bg-destructive/15 p-3 rounded-md text-sm text-destructive space-x-2 mb-4">
            <TriangleAlert className="w-5 h-5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            placeholder="example@email.com"
            type="email"
            aria-invalid={!!errors.email}
            disabled={isSubmitting}
            autoComplete="email"
            className="w-full"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            placeholder="Password"
            type="password"
            aria-invalid={!!errors.password}
            disabled={isSubmitting}
            autoComplete="current-password"
            className="w-full"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-sky-900 hover:bg-sky-950"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase text-gray-500">
            <span className="bg-background px-2">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onProviderSignIn("google")}
            variant="outline"
            size="lg"
            disabled={isSubmitting}
            className="flex items-center justify-center w-full"
          >
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google"
              width={16}
              height={16}
              className="mr-2"
            />
            Google
          </Button>
          <Button
            onClick={() => onProviderSignIn("github")}
            variant="outline"
            size="lg"
            disabled={isSubmitting}
            className="flex items-center justify-center w-full"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>

        <div className="text-center text-sm mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => setState("SignUp")}
            className="font-medium underline text-sky-600 hover:text-sky-700"
          >
            Sign Up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
