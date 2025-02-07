'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthActions } from '@convex-dev/auth/react';
import { FaGithub } from 'react-icons/fa';
import { TriangleAlert, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SignInCardProps } from '../types';
import { toast } from 'sonner';

// Zod schema for form validation
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const SignInCard: React.FC<SignInCardProps> = ({ setState }) => {
  const { signIn } = useAuthActions();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSocialLoading, setIsSocialLoading] = useState<
    'github' | 'google' | null>(null);

  // Initialize the form with Zod resolver
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setErrorMessage(null);
    try {
      await signIn('password', {
        email: values.email,
        password: values.password,
        flow: 'signIn',
      });
      toast.success('Signed in successfully!'); // TODO: Display success toast on homepage after authentication.
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
      toast.error('Failed to sign in. Please try again.');
    }
  };

  // Handle social login
  const onProviderSignIn = async (provider: 'github' | 'google') => {
    setIsSocialLoading(provider);
    try {
      await signIn(provider);
      toast.success(`Signed in with ${provider} successfully!`); // TODO: Display success toast on homepage after authentication.
    } catch (error) {
      setErrorMessage(`Failed to sign in with ${provider}. Please try again.`);
      toast.error(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsSocialLoading(null);
    }
  };

  // Clear error message when typing in errored input
  const clearErrorOnType = (fieldName: keyof z.infer<typeof signInSchema>) => {
    if (errorMessage && form.getValues(fieldName)) {
      setErrorMessage(null);
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-none">
      <CardHeader className="space-y-2 px-0">
        <CardTitle className="text-center text-3xl font-semibold">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          Enter your email and password to sign in to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-0 py-4">
        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 flex items-center space-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            <TriangleAlert className="h-4 w-4" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email address"
                      type="email"
                      disabled={form.formState.isSubmitting}
                      autoComplete="email"
                      aria-describedby="email-error"
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrorOnType('email');
                      }}
                    />
                  </FormControl>
                  <FormMessage id="email-error" className="text-xs" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Enter your password"
                      disabled={form.formState.isSubmitting}
                      autoComplete="current-password"
                      aria-describedby="password-error"
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrorOnType('password');
                      }}
                    />
                  </FormControl>
                  <FormMessage id="password-error" className="text-xs" />
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            <div className="text-right">
              <button
                onClick={() => setState('ForgotPassword')}
                className="text-sm font-medium text-primary underline hover:text-primary/90"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
            <span className="bg-background px-2">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onProviderSignIn('google')}
            variant="outline"
            size="lg"
            disabled={
              form.formState.isSubmitting || isSocialLoading === 'google'
            }
            className="flex w-full items-center justify-center"
          >
            {isSocialLoading === 'google' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <img
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google"
                width={16}
                height={16}
                className="mr-2"
              />
            )}
            {isSocialLoading === 'google' ? 'Loading...' : 'Google'}
          </Button>
          <Button
            onClick={() => onProviderSignIn('github')}
            variant="outline"
            size="lg"
            disabled={
              form.formState.isSubmitting || isSocialLoading === 'github'
            }
            className="flex w-full items-center justify-center"
          >
            {isSocialLoading === 'github' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FaGithub className="mr-2 h-4 w-4" />
            )}
            {isSocialLoading === 'github' ? 'Loading...' : 'GitHub'}
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => setState('SignUp')}
            className="font-medium text-primary underline hover:text-primary/90"
          >
            Sign Up
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
