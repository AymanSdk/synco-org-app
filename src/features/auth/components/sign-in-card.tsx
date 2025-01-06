// authentication Actions
import { useAuthActions } from "@convex-dev/auth/react";
// Icons for the social login buttons
import { FaGithub } from "react-icons/fa";
// Lucid Icons
import { TriangleAlert } from "lucide-react";
// shadcn UI components imported from the UI components file
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// types
import { SignInFlow } from "../types";
// react hooks
import React, { useState } from "react";
import Image from "next/image";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  // Handle Password Sign In
  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-1 px-0">
        <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your email to sign in to your account
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-4 px-0">
        <form onSubmit={onPasswordSignIn} className="space-y-2">
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Button
            type="submit"
            className="w-full bg-[#3E5879] hover:bg-[#213555]"
            size="lg"
            disabled={pending}
          >
            Sign In
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("google")}
            variant="outline"
            size="lg"
          >
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google"
              width={16}
              height={16}
              className="mr-2"
            />
            {/* <FcGoogle className="size-5 absolute top-3 left-2.5" /> */}
            Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("github")}
            variant="outline"
            size="lg"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Github
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => setState("SignUp")}
            className="font-medium underline underline-offset-4 hover:text-blue-700 text-blue-400"
          >
            Sign Up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
