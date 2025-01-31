'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useAuthActions } from '@convex-dev/auth/react';
import { Input } from '@/components/ui/input';
import { useConvexAuth } from 'convex/react';

export default function LandingPage() {
  const { signIn } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-10 lg:px-20">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Syncro Logo"
            width={32}
            height={32}
            className="text-[#213555]"
          />
          <span className="text-2xl font-bold text-[#213555]">Syncro</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="/product"
            className="text-sm text-gray-600 hover:text-[#213555]"
          >
            Product
          </Link>
          <Link
            href="/enterprise"
            className="text-sm text-gray-600 hover:text-[#213555]"
          >
            Enterprise
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-gray-600 hover:text-[#213555]"
          >
            Pricing
          </Link>
          {isAuthenticated ? (
            <Button asChild className="bg-[#213555] hover:text-white">
              <Link href="/workspace">Go to Workspace</Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="border-[#213555] text-[#213555] hover:bg-[#213555] hover:text-white"
            >
              <Link href="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative bg-[#213555] px-6 pb-40 pt-20 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.h1
              className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your Place to Collaborate with different{' '}
              <span className="text-blue-300">Communities.</span>
            </motion.h1>
            <motion.p
              className="mb-8 text-lg text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              With all your people, tools and communication in one place, you
              can work faster and more flexibly than ever before.
            </motion.p>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-[#4285F4] text-white hover:bg-[#174EA6]"
              >
                <FcGoogle className="mr-2 h-5 w-5" />
                Sign Up with Google
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-[#213555] hover:bg-gray-200 hover:text-[#213555]"
              >
                <FaGithub className="mr-2 h-5 w-5" />
                Sign Up with Github
              </Button>
            </motion.div>
            <p className="mt-4 text-sm text-white/60">
              Syncro is free to try for as long as you like
            </p>
          </div>
          <div className="relative">
            <Image
              src="/online-collab-2.svg"
              alt="Syncro App Interface"
              width={800}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-20">
          <div className="mb-32 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#213555] md:text-4xl">
                Bring your team together
              </h2>
              <p className="text-lg text-gray-600">
                At the heart of Syncro are channels, organized spaces for
                everyone and everything that you need for work. In channels,
                it&apos;s easier to connect across departments, offices, time
                zones and even other companies.
              </p>
            </div>
            <Image
              src="/online-collab.svg"
              alt="Team Collaboration"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="mb-32 grid items-center gap-12 lg:grid-cols-2">
            <Image
              src="/team-1.svg"
              alt="Easy Communication"
              width={500}
              height={400}
              className="rounded-lg shadow-lg lg:order-2"
            />
            <div className="lg:order-1">
              <h2 className="mb-6 text-3xl font-bold text-[#213555] md:text-4xl">
                Where hanging out is easy
              </h2>
              <p className="text-lg text-gray-600">
                Grab a seat in a voice channel when you&apos;re free. Friends in
                your server can see you&apos;re around and instantly join to
                talk without having to call.
              </p>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#213555] md:text-4xl">
                Create an invite-only place where you belong
              </h2>
              <p className="text-lg text-gray-600">
                Syncro servers are organized into topic-based channels where you
                can collaborate, share, and just talk about your day without
                clogging up a group chat.
              </p>
            </div>
            <Image
              src="/security.svg"
              alt="Exclusive Space"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="bg-gray-50 px-6 py-20 md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-16 text-3xl font-bold text-[#213555] md:text-4xl">
            Teams and Communities rely on Syncro
          </h2>
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            <div>
              <p className="mb-4 text-5xl font-bold text-[#213555]">85%</p>
              <p className="text-lg text-gray-600">
                of users feel Syncro has improved communication
              </p>
            </div>
            <div>
              <p className="mb-4 text-5xl font-bold text-[#213555]">86%</p>
              <p className="text-lg text-gray-600">
                feel their ability to work remotely has improved
              </p>
            </div>
            <div>
              <p className="mb-4 text-5xl font-bold text-[#213555]">88%</p>
              <p className="text-lg text-gray-600">
                feel more connected to their teams
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-[#213555] px-6 py-20 text-white md:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">
            Ready to start your journey?
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-white text-[#213555] hover:bg-gray-100"
          >
            <Link href="/auth">Get Started For Free</Link>
          </Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t bg-white px-6 py-12 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="Syncro Logo" width={32} height={32} />
              <span className="text-xl font-bold text-[#213555]">Syncro</span>
            </Link>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-[#213555]">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Enterprise
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-[#213555]">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-[#213555]">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/support"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Developers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-[#213555]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-600 hover:text-[#213555]"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
