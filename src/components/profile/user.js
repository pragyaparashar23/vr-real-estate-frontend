import React, { useState } from "react";

const UserProfile = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [notificationPreference, setNotificationPreference] = useState(
    userDetails.notification || false
  );

  const updatePreference = async () => {
    try {
      const response = await fetch(
        `/api/update-preference?preference=${notificationPreference}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success) {
        console.log("Preference updated successfully");
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleNotificationChange = (e) => {
    console.log("Notification changed");
    console.log(e.target.checked);
    setNotificationPreference(e.target.checked);
    updatePreference();
  };

  return (
    <div className="bg-white w-2/4 shadow-lg rounded-lg overflow-hidden mx-auto mt-8 z-10 flex flex-col justify-center items-center">
      <div className="p-6 relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">User Details</h2>
        <ul className="flex flex-col gap-5 p-2">
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
              ></path>
            </svg>
            <span className="text-lg">Username: {userDetails.name}</span>
          </li>
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-lg">Email: {userDetails.email}</span>
          </li>
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 002 2zM9 9h6v6H9V9z"
              ></path>
            </svg>
            <span className="text-lg">Role: {userDetails.role}</span>
          </li>
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405a0.5 0.5 0 00-.708-.708l-3-3a0.5 0.5 0 00-.708 0l-4 4a0.5 0.5 0 010 .708l3 3a0.5 0.5 0 00.708 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 13H5v-2h14v2z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 100 4V5z"
              ></path>
            </svg>
            <span className="text-lg">Notification Preference:</span>
            <div className="ml-4">
              <label
                htmlFor="notifications"
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  id="notifications"
                  type="checkbox"
                  value={notificationPreference}
                  onChange={handleNotificationChange}
                  className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                />
                <span className="ml-3 text-gray-700 inline-flex items-center">
                  <span>Enable Email Notifications</span>
                </span>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
