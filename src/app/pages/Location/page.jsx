"use client";
import React, { useState } from "react";
import Navbar from "../../components/navbar";

export default function UserPreferences() {
  const [city, setCity] = useState("");
  const [preferences, setPreferences] = useState({
    food: false,
    travel: false,
    technology: false,
    fitness: false,
    music: false,
  });

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Info Submitted:", { city, preferences });
  };

  return (
    <div className="class">
      <Navbar />
      <div className="w-[70%] max-w-4xl mt-24 mx-auto p-8 shadow-lg rounded-lg bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Tell us about yourself</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* City Selection */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2" htmlFor="city">
              Which city do you belong to?
            </label>
            <select
              id="city"
              value={city}
              onChange={handleCityChange}
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {/* Indian Cities */}
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>
          </div>

          {/* Preference Selection */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
              What are your interests?
            </label>
            <div className="space-y-2">
              {Object.keys(preferences).map((preference) => (
                <div key={preference} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={preference}
                    name={preference}
                    checked={preferences[preference]}
                    onChange={handlePreferenceChange}
                    className="h-4 w-4 text-cyan-500 focus:ring-cyan-400 border-gray-300 rounded"
                  />
                  <label htmlFor={preference} className="text-gray-700 dark:text-gray-200 capitalize">
                    {preference}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-br from-blue-500 to-purple-500 w-full text-white rounded-md h-10 font-semibold transform transition-transform duration-300 hover:scale-105"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}
