"use client";

import React, { useState } from "react";
import { Label } from "../../components/signup/label";
import { cn } from "../../../../utils/cn";
import Navbar from "../../components/navbar";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function LoginFormDemo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      router.push("/dashboard"); // Navigate to dashboard or homepage
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      console.error("Error during login:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="class">
      <Navbar />
      <div className="w-[70%] mt-20 max-w-4xl mx-auto rounded-lg p-6 shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black">
        <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-100">
          Welcome Back to Aceternity
        </h2>
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          Login to continue exploring the wonders of Aceternity
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form className="my-8 space-y-6" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <InputField id="email" placeholder="yourname@example.com" type="email" />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <InputField id="password" placeholder="••••••••" type="password" />
          </LabelInputContainer>

          <button
            disabled={loading}
            className="submit-button bg-gradient-to-br from-blue-500 to-purple-500 w-full text-white rounded-md h-10 font-semibold transform transition-transform duration-300 hover:scale-105"
          >
            {loading ? "Loading..." : "Login →"}
            <BottomGradient />
          </button>
        </form>

        <div className="divider bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <SocialButton icon={<IconBrandGithub />} label="GitHub" />
          <SocialButton icon={<IconBrandGoogle />} label="Google" />
          <SocialButton icon={<IconBrandOnlyfans />} label="OnlyFans" />
        </div>

        <button
          onClick={() => router.push("/pages/signup")}
          className="mt-6 bg-gradient-to-br from-gray-800 to-gray-600 w-full text-white rounded-md h-10 font-medium transform transition-transform duration-300 hover:scale-105"
        >
          Don&apos;t have an account? Sign up
        </button>
      </div>
    </div>
  );
}

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

const InputField = ({ id, placeholder, type }) => (
  <input
    id={id}
    placeholder={placeholder}
    type={type}
    className="input-field bg-gray-100 dark:bg-gray-800 text-neutral-900 dark:text-neutral-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-black dark:placeholder-gray-400"
  />
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
