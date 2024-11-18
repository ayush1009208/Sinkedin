"use client";
import React, { useState } from "react";
import { Label } from "../../components/signup/label";
import { cn } from "../../../../utils/cn";
import Navbar from "../../components/navbar";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import { db } from "../../firebase"; // Import the Firestore instance

export default function SignupFormDemo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "", 
    interests: "", 
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
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        location: formData.location,
        interests: formData.interests,
      });

      console.log("User registered and data saved to Firestore");
      router.push("/pages/Location");
    } catch (err) {
      console.error("Error creating user or saving data:", err.message);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email,
        location: formData.location || "",
        interests: formData.interests || "",
      });

      console.log("Google login successful and data saved to Firestore");
      router.push("/pages/Location");
    } catch (err) {
      console.error("Google login error:", err.message);
      setError(err.message);
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email,
        location: formData.location || "",
        interests: formData.interests || "",
      });

      console.log("GitHub login successful and data saved to Firestore");
      router.push("/pages/Location");
    } catch (err) {
      console.error("GitHub login error:", err.message);
      setError(err.message);
    }
  };

  const handleOnlyFansLogin = async () => {
    console.log("OnlyFans login mock clicked");
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

          {/* Location Input */}
          <LabelInputContainer>
            <Label htmlFor="location">Location</Label>
            <select
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              className="input-field bg-gray-100 dark:bg-gray-800 text-neutral-900 dark:text-neutral-100 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-black dark:placeholder-gray-400"
            >
              <option value="">Select your city</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
            </select>
          </LabelInputContainer>

          {/* Interests Input */}
          <LabelInputContainer>
            <Label htmlFor="interests">Interests</Label>
            <InputField
              id="interests"
              placeholder="e.g., Reading, Traveling, Coding"
              value={formData.interests}
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
    className="social-button w-full bg-gray-200 dark:bg-gray-700 rounded-md py-3 flex items-center justify-center space-x-4 text-sm font-medium hover:opacity-90 transition-opacity"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </button>
);
