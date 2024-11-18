"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar";
import { IconUser, IconMessageCircle, IconBriefcase } from "@tabler/icons-react";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore imports
import { auth } from "../../firebase"; // Assuming auth is properly set up in your firebase.js

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([
    { name: "Jane Smith", action: "liked your post", time: "2 hours ago" },
    { name: "Michael Brown", action: "commented on your post", time: "5 hours ago" },
    { name: "Lisa Johnson", action: "shared your profile", time: "1 day ago" },
  ]);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in");
        return;
      }

      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid); // Fetching user document using UID
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        // User data exists, set the state
        setUserData(docSnap.data());
      } else {
        console.log("No user data found");
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="class">
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        {/* Sidebar */}
        <aside className="bg-white dark:bg-gray-800 mt-16 rounded-lg shadow-md p-4 w-full lg:w-1/4">
          <div className="text-center">
            <Image
              src={userData?.profilePic || "/images/profile-pic.jpg"} // Use dynamic profile pic from Firestore
              alt="User Profile"
              width={100}
              height={100}
              className="mx-auto rounded-full"
            />
            <h2 className="text-lg font-semibold mt-4 text-gray-800 dark:text-gray-100">
              {userData?.firstName || "Loading..."} {/* Dynamically display user name */}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userData?.jobTitle || "Software Engineer at TechCorp"} {/* Display job title */}
            </p>
            {/* Display location */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Location: {userData?.location || "Unknown Location"}
            </p>
            {/* Display interests */}
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Interests:</p>
              <ul className="text-sm text-gray-500 dark:text-gray-400">
                {userData?.interests && Object.keys(userData.interests).map((interest, index) => (
                  userData.interests[interest] && (
                    <li key={index}>{interest.charAt(0).toUpperCase() + interest.slice(1)}</li> // Capitalize the first letter of each interest
                  )
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <button className="w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-md">
              <IconUser className="inline-block mr-2" /> Profile
            </button>
            <button className="w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-md">
              <IconBriefcase className="inline-block mr-2" /> Jobs
            </button>
            <button className="w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-md">
              <IconMessageCircle className="inline-block mr-2" /> Messages
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Post Creation */}
          <div className="bg-white dark:bg-gray-800 mt-16 rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-gray-800 dark:text-gray-100 text-lg font-medium">
              Create a Post
            </h3>
            <textarea
              className="mt-4 w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-3 rounded-md focus:outline-none"
              rows="3"
              placeholder="What's on your mind?"
            ></textarea>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                Post
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <section>
            <h3 className="text-gray-800 mt-10 dark:text-gray-100 text-lg font-medium mb-4">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  name={activity.name}
                  action={activity.action}
                  time={activity.time}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Suggestions */}
        <aside className="bg-white dark:bg-gray-800 mt-16 rounded-lg shadow-md p-4 w-full lg:w-1/4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
            Suggestions
          </h3>
          <div className="mt-4 space-y-4">
            <SuggestionCard name="Alice White" position="UI Designer" />
            <SuggestionCard name="Bob Green" position="Data Scientist" />
            <SuggestionCard name="Charlie Blue" position="Product Manager" />
          </div>
        </aside>
      </div>
    </div>
  );
}

const ActivityCard = ({ name, action, time }) => (
  <div className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
    <div>
      <p className="text-sm text-gray-800 dark:text-gray-100">
        <span className="font-semibold">{name}</span> {action}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
    </div>
  </div>
);

const SuggestionCard = ({ name, position }) => (
  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
    <div>
      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
        {name}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{position}</p>
    </div>
    <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition text-xs">
      Connect
    </button>
  </div>
);
