"use client";
import React, { useState } from "react";
import { Label } from "../../components/signup/label";
import { cn } from "../../../../utils/cn";
import Navbar from "../../components/navbar";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation"; // For navigation

export default function SignupFormDemo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User registered successfully");
      router.push("/pages/Location"); // Redirect after successful signup
    } catch (err) {
      console.error("Error creating user:", err.message);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/pages/Location");
    } catch (err) {
      console.error("Google login error:", err.message);
      setError(err.message);
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/pages/Location");
    } catch (err) {
      console.error("GitHub login error:", err.message);
      setError(err.message);
    }
  };

  // Mock handler for OnlyFans login (as OnlyFans does not provide a public API)
  const handleOnlyFansLogin = async () => {
    console.log("OnlyFans login mock clicked");
    // Replace with actual API integration if OnlyFans provides an API in the future
    setError("OnlyFans login option is currently unavailable");
  };

  return (
    <div className="class">
      <Navbar />
      <div className="w-[70%] mt-20 max-w-4xl mx-auto rounded-lg p-6 shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black">
        <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-100">
          Welcome to Aceternity
        </h2>
        <form className="my-8 space-y-6" onSubmit={handleSubmit}>
          {/* First Name Input */}
          <LabelInputContainer>
            <Label htmlFor="firstName">First Name</Label>
            <InputField
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          {/* Last Name Input */}
          <LabelInputContainer>
            <Label htmlFor="lastName">Last Name</Label>
            <InputField
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          {/* Email Input */}
          <LabelInputContainer>
            <Label htmlFor="email">Email</Label>
            <InputField
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          {/* Password Input */}
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <InputField
              id="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          {/* Confirm Password Input */}
          <LabelInputContainer>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <InputField
              id="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </LabelInputContainer>

          {/* Signup Button */}
          <button className="submit-button bg-gradient-to-br from-blue-500 to-purple-500 w-full text-white rounded-md h-10 font-semibold transform transition-transform duration-300 hover:scale-105">
            Sign up
          </button>
        </form>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Social Login */}
        <div className="flex flex-col space-y-4 mt-6">
          <SocialButton icon={<IconBrandGoogle />} label="Sign up with Google" onClick={handleGoogleLogin} />
          <SocialButton icon={<IconBrandGithub />} label="Sign up with GitHub" onClick={handleGithubLogin} />
          
          {/* OnlyFans (mock) Login */}
          <SocialButton icon={<IconBrandOnlyfans />} label="Sign up with OnlyFans" onClick={handleOnlyFansLogin} />
        </div>
      </div>
    </div>
  );
}

// Reusable Components
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

const InputField = ({ id, placeholder, type, value, onChange }) => (
  <input
    id={id}
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={onChange}
    className="input-field bg-gray-100 dark:bg-gray-800 text-neutral-900 dark:text-neutral-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-black dark:placeholder-gray-400"
  />
);

const SocialButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="social-button flex space-x-2 items-center justify-start px-4 w-full text-black dark:text-white rounded-md h-10 font-medium bg-gray-50 dark:bg-zinc-900 dark:shadow-lg transform transition-transform duration-300 hover:scale-102"
  >
    {icon}
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
      {label}
    </span>
    <BottomGradient />
  </button>
);
