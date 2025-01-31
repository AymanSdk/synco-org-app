import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthActions } from '@convex-dev/auth/react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignUpFormInputs, SignUpCardProps } from '../types';

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<SignUpFormInputs>();
  const [pending, setPending] = useState(false);

  const onSubmit = async (data: SignUpFormInputs) => {
    const { name, email, password } = data;
    setPending(true);
    try {
      await signIn('password', { name, email, password, flow: 'signUp' });
    } catch (err) {
      setError(
        'email',
        { type: 'manual', message: 'Failed to sign up. Please try again.' },
        { shouldFocus: true }
      );
    } finally {
      setPending(false);
    }
  };

  const onProviderSignUp = (value: 'github' | 'google') => {
    setPending(true);
    signIn(value)
      .catch(() =>
        setError('email', {
          type: 'manual',
          message: `Failed to sign up with ${value}. Please try again.`,
        })
      )
      .finally(() => setPending(false));
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-1 px-0">
        <CardTitle className="text-center text-3xl font-semibold">
          Create an Account
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-500">
          Fill the form below to create an account
        </CardDescription>
      </CardHeader>

      {/* Error Message */}
      {errors.email && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="h-5 w-5" />
          <p>{errors.email?.message}</p>
        </div>
      )}

      <CardContent className="space-y-4 px-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            disabled={pending}
            placeholder="Full name"
            {...register('name', { required: 'Full name is required' })}
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name?.message}</p>
          )}

          <Input
            disabled={pending}
            placeholder="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: 'Invalid email',
              },
            })}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email?.message}</p>
          )}

          <Input
            disabled={pending}
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password?.message}
            </p>
          )}

          <Input
            disabled={pending}
            placeholder="Confirm password"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) =>
                value === watch('password') || "Passwords don't match",
            })}
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword?.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-sky-900 hover:bg-sky-950"
            size="lg"
            disabled={pending}
          >
            {pending ? 'Signing Up...' : 'Sign Up'}
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
            onClick={() => onProviderSignUp('google')}
            variant="outline"
            size="lg"
            disabled={pending}
            className="flex w-full items-center justify-center"
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
            onClick={() => onProviderSignUp('github')}
            variant="outline"
            size="lg"
            disabled={pending}
            className="flex w-full items-center justify-center"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => setState('SignIn')}
            className="font-medium text-sky-600 underline hover:text-sky-700"
          >
            Sign In
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
