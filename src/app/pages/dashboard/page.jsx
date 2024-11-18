"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/navbar";
import {
  IconEdit,
  IconUser,
  IconBriefcase,
  IconMessageCircle,
  IconPlus,
} from "@tabler/icons-react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../../firebase"; // Replace with your firebase setup

function ActivityCard({ name, action, time }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-md">
      <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
        {name} {action}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
    </div>
  );
}

function SuggestionCard({ name, position }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-md flex items-center space-x-4">
      <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      <div>
        <h4 className="text-sm text-gray-800 dark:text-gray-200 font-medium">
          {name}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{position}</p>
        <button className="text-blue-500 text-xs mt-1">Connect</button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [recentActivities, setRecentActivities] = useState([
    { name: "John Doe", action: "liked your post", time: "2 hours ago" },
    { name: "Jane Smith", action: "commented on your post", time: "3 hours ago" },
    { name: "Alice Johnson", action: "shared your post", time: "5 hours ago" },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [newPost, setNewPost] = useState("");
  const [newProfilePic, setNewProfilePic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUserData();
  }, []);

  const saveProfileChanges = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);

    try {
      await updateDoc(userDocRef, { ...editedData });
      setUserData((prev) => ({ ...prev, ...editedData }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProfilePic(reader.result); // Display preview
        setEditedData((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto p-6 lg:flex lg:gap-6">
        {/* Sidebar */}
        <aside className="bg-white dark:bg-gray-800 rounded-lg mt-16 shadow-md p-4 w-full lg:w-1/4">
          <div className="text-center">
            <Image
              src={newProfilePic || userData?.profilePic || "/profile-placeholder.png"}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full mx-auto"
            />
            <label className="mt-4 block text-blue-500 cursor-pointer">
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </label>
            <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              {userData?.firstName || "First"} {userData?.lastName || "Last"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userData?.jobTitle || "Job Title"}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            <IconEdit className="inline-block mr-2" />
            Edit Profile
          </button>
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
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                onClick={() => {
                  if (newPost) {
                    setRecentActivities([
                      ...recentActivities,
                      { name: "You", action: `posted: ${newPost}`, time: "Just now" },
                    ]);
                    setNewPost("");
                  }
                }}
              >
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

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Edit Profile
            </h3>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="First Name"
                defaultValue={userData?.firstName}
                onChange={(e) =>
                  setEditedData({ ...editedData, firstName: e.target.value })
                }
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                defaultValue={userData?.lastName}
                onChange={(e) =>
                  setEditedData({ ...editedData, lastName: e.target.value })
                }
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
              />
              <input
                type="text"
                placeholder="Job Title"
                defaultValue={userData?.jobTitle}
                onChange={(e) =>
                  setEditedData({ ...editedData, jobTitle: e.target.value })
                }
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
              />
              <input
                type="text"
                placeholder="Email"
                defaultValue={userData?.email}
                onChange={(e) =>
                  setEditedData({ ...editedData, email: e.target.value })
                }
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md focus:outline-none"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={saveProfileChanges}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
