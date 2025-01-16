"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";
import { Input } from "@/components/ui/input";
import { Instagram } from "lucide-react";

export default function LandingPage() {
  const { signIn } = useAuthActions();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-6 md:px-10 lg:px-20">
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
          <Button
            asChild
            variant="outline"
            className="border-[#213555] text-[#213555] hover:bg-[#213555] hover:text-white"
          >
            <Link href="/auth">Sign in</Link>
          </Button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative pt-20 pb-40 px-6 md:px-10 lg:px-20 bg-[#213555]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Your Place to Collaborate with different{" "}
              <span className="text-blue-300">Communities.</span>
            </motion.h1>
            <motion.p
              className="text-lg text-white/80 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              With all your people, tools and communication in one place, you
              can work faster and more flexibly than ever before.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-[#4285F4] hover:bg-[#174EA6] text-white"
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
      {/* Trusted By Section
      <section className="bg-gray-50 py-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-8">
            TRUSTED BY COMPANIES ALL OVER THE WORLD
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {[...Array(6)].map((_, i) => (
              <Image
                key={i}
                src="/placeholder.svg?height=50&width=120"
                alt={`Company ${i + 1}`}
                width={120}
                height={50}
                className="max-h-12 w-auto"
              />
            ))}
          </div>
        </div>
      </section> */}
      {/* Feature Sections */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-20 px-6 md:px-10 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#213555] mb-6">
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

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
            <Image
              src="/team-1.svg"
              alt="Easy Communication"
              width={500}
              height={400}
              className="rounded-lg shadow-lg lg:order-2"
            />
            <div className="lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-[#213555] mb-6">
                Where hanging out is easy
              </h2>
              <p className="text-lg text-gray-600">
                Grab a seat in a voice channel when you&apos;re free. Friends in
                your server can see you&apos;re around and instantly join to
                talk without having to call.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#213555] mb-6">
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
      <section className="bg-gray-50 py-20 px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#213555] mb-16">
            Teams and Communities rely on Syncro
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div>
              <p className="text-5xl font-bold text-[#213555] mb-4">85%</p>
              <p className="text-lg text-gray-600">
                of users feel Syncro has improved communication
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#213555] mb-4">86%</p>
              <p className="text-lg text-gray-600">
                feel their ability to work remotely has improved
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold text-[#213555] mb-4">88%</p>
              <p className="text-lg text-gray-600">
                feel more connected to their teams
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-[#213555] text-white py-20 px-6 md:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
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
      <footer className="bg-white py-12 px-6 md:px-10 lg:px-20 border-t">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="Syncro Logo" width={32} height={32} />
              <span className="text-xl font-bold text-[#213555]">Syncro</span>
            </Link>
          </div>
          <div>
            <h3 className="font-semibold text-[#213555] mb-4">Product</h3>
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
            <h3 className="font-semibold text-[#213555] mb-4">Company</h3>
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
            <h3 className="font-semibold text-[#213555] mb-4">Resources</h3>
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
            <h3 className="font-semibold text-[#213555] mb-4">Legal</h3>
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
