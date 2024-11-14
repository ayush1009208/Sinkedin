// Updated SignupFormDemo Component
"use client";
import React from "react";
import { Label } from "../components/signup/label";
import { cn } from "../../../utils/cn";
import Navbar from "../components/navbar";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="class">
    <Navbar/>
<div className="w-[70%] mt-20 max-w-4xl mx-auto rounded-lg p-6 shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black">

      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-100">
        Welcome to Aceternity
      </h2>
      <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
        Login to Aceternity if you can because we don&apos;t have a login flow yet
      </p>

      <form className="my-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <input
              id="firstname"
              placeholder="Tyler"
              type="text"
              className="input-field bg-gray-100 dark:bg-gray-800 text-neutral-900 dark:text-neutral-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-black dark:placeholder-gray-400"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <input
              id="lastname"
              placeholder="Durden"
              type="text"
              className="input-field bg-gray-100 dark:bg-gray-800 text-neutral-900 dark:text-neutral-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-black dark:placeholder-gray-400"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            className="input-field bg-gray-100 dark:bg-gray-800 text-neutral-900 dark:text-neutral-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-black dark:placeholder-gray-400"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <input
            id="password"
            placeholder="••••••••"
            type="password"
            className="input-field bg-gray-100 dark:bg-gray-800 text-neutral-900 dark:text-neutral-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-black dark:placeholder-gray-400"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="twitterpassword">Your Twitter Password</Label>
          <input
            id="twitterpassword"
            placeholder="••••••••"
            type="password"
            className="input-field bg-gray-100 dark:bg-gray-800 text-neutral-900 dark:text-neutral-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-black dark:placeholder-gray-400"
          />
        </LabelInputContainer>

        <button className="submit-button bg-gradient-to-br from-blue-500 to-purple-500 w-full text-white rounded-md h-10 font-semibold transform transition-transform duration-300 hover:scale-105">
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="divider bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <SocialButton icon={<IconBrandGithub />} label="GitHub" />
          <SocialButton icon={<IconBrandGoogle />} label="Google" />
          <SocialButton icon={<IconBrandOnlyfans />} label="OnlyFans" />
        </div>
      </form>
    </div>
    </div>
  );
}

// Reusable Components and Styles

const BottomGradient = () => (
  <>
    <span className="hover-line group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="blur-line group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

const SocialButton = ({ icon, label }) => (
  <button className="social-button flex space-x-2 items-center justify-start px-4 w-full text-black dark:text-white rounded-md h-10 font-medium bg-gray-50 dark:bg-zinc-900 dark:shadow-lg transform transition-transform duration-300 hover:scale-102">
    {icon}
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
      {label}
    </span>
    <BottomGradient />
  </button>
);
