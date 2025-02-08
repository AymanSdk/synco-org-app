'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAuthActions } from '@convex-dev/auth/react';
import { FaGithub } from 'react-icons/fa';
import { TriangleAlert, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
import { SignUpCardProps } from '../types';

// Zod schema for form validation
const signUpSchema = z
  .object({
    name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and privacy policy.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [isSocialLoading, setIsSocialLoading] = useState<
    'github' | 'google' | null
  >(null);

  // Initialize the form with Zod resolver
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setPending(true);
    setErrorMessage(null);
    try {
      await signIn('password', {
        name: values.name,
        email: values.email,
        password: values.password,
        flow: 'signUp',
      });
      toast.success('Signed up successfully!'); // TODO: Display success toast on homepage after authentication.
    } catch (error) {
      setErrorMessage('Failed to sign up. Please try again.');
      toast.error('Failed to sign up. Please try again.');
    } finally {
      setPending(false);
    }
  };

  // Handle social login
  const onProviderSignUp = async (provider: 'github' | 'google') => {
    setIsSocialLoading(provider);
    setPending(true);
    setErrorMessage(null);
    try {
      await signIn(provider);
      toast.success(`Signed up with ${provider} successfully!`); // TODO: Display success toast on homepage after authentication.
    } catch (error) {
      setErrorMessage(`Failed to sign up with ${provider}. Please try again.`);
      toast.error(`Failed to sign up with ${provider}. Please try again.`);
    } finally {
      setIsSocialLoading(null);
      setPending(false);
    }
  };

  // Clear error message when typing in errored input
  const clearErrorOnType = (fieldName: keyof z.infer<typeof signUpSchema>) => {
    if (errorMessage && form.getValues(fieldName)) {
      setErrorMessage(null);
    }
  };

  // Handle next step
  const handleNextStep = () => {
    const { name, email } = form.getValues();
    if (!name || !email) {
      form.setError('name', { message: 'Full name is required' });
      form.setError('email', { message: 'Email is required' });
      return;
    }
    setStep(2);
  };

  // Handle back to step 1
  const handleBackStep = () => {
    setStep(1);
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-1 px-0">
        <CardTitle className="text-center text-3xl font-semibold">
          Create an Account
        </CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          {step === 1
            ? 'Enter your name and email to get started'
            : 'Set a password to secure your account'}
        </CardDescription>
      </CardHeader>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="h-5 w-5" />
          <p>{errorMessage}</p>
        </div>
      )}

      <CardContent className="space-y-4 px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Step 1: Name and Email */}
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          disabled={pending}
                          autoComplete="name"
                          aria-describedby="name-error"
                          onChange={(e) => {
                            field.onChange(e);
                            clearErrorOnType('name');
                          }}
                        />
                      </FormControl>
                      <FormMessage id="name-error" className="text-xs" />
                    </FormItem>
                  )}
                />

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
                          disabled={pending}
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

                <Button
                  type="button"
                  className="w-full"
                  size="lg"
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              </>
            )}

            {/* Step 2: Password and Confirm Password */}
            {step === 2 && (
              <>
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
                          disabled={pending}
                          autoComplete="new-password"
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          placeholder="Re-enter your password"
                          disabled={pending}
                          autoComplete="new-password"
                          aria-describedby="confirm-password-error"
                          onChange={(e) => {
                            field.onChange(e);
                            clearErrorOnType('confirmPassword');
                          }}
                        />
                      </FormControl>
                      <FormMessage
                        id="confirm-password-error"
                        className="text-xs"
                      />
                    </FormItem>
                  )}
                />

                {/* Agree to Terms Checkbox */}
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={pending}
                        />
                      </FormControl>
                      <FormLabel className="text-xs text-muted-foreground">
                        I agree to the{' '}
                        <Link
                          href="/terms"
                          className="font-medium text-primary hover:text-primary/90"
                        >
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link
                          href="/privacy"
                          className="font-medium text-primary hover:text-primary/90"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={handleBackStep}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={pending || !form.watch('agreeToTerms')}
                  >
                    {pending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {pending ? 'Signing Up...' : 'Sign Up'}
                  </Button>
                </div>
              </>
            )}
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
            onClick={() => onProviderSignUp('google')}
            variant="outline"
            size="lg"
            disabled={pending || isSocialLoading === 'google'}
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
            onClick={() => onProviderSignUp('github')}
            variant="outline"
            size="lg"
            disabled={pending || isSocialLoading === 'github'}
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

        {/* Sign In Link */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            onClick={() => setState('SignIn')}
            className="font-medium text-primary underline hover:text-primary/90"
          >
            Sign In
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
