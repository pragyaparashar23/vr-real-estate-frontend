import React, { useState } from "react";

export const ViewUserModal = ({
  isOpen,
  onClose,
  title,
  userData,
  propertyData,
  tourData,
  ratingData,
  type,
}) => {
  const [updatedUserData, setUpdatedUserData] = useState({
    name: userData?.name,
    notificationPreference: userData?.notificationPreference,
    role: userData?.role,
    email: userData?.email,
  });
  const [updatedPropertyData, setUpdatedPropertyData] = useState({
    address: propertyData?.address,
    agent: propertyData?.agent,
    availability: propertyData?.availability,
    bathrooms: propertyData?.bathrooms,
    bedrooms: propertyData?.bedrooms,
    description: propertyData?.description,
    features: propertyData?.features,
    garage: propertyData?.garage,
    price: propertyData?.price,
    squareFeet: propertyData?.squareFeet,
    status: propertyData?.status,
    title: propertyData?.title,
  });
  const [updatedTourData, setUpdatedTourData] = useState({
    agent: tourData?.agent,
    buyer: tourData?.buyer,
    isRated: tourData?.isRated,
    property: tourData?.property,
    createdAt: tourData?.createdAt,
    status: tourData?.status,
  });

  if (!isOpen) return null;
  console.log("userData", userData);
  console.log("propertyData", propertyData);
  console.log("tourData", tourData);
  console.log("ratingData", ratingData);

  const handleUpdateUser = async () => {
    console.log("updatedUserData", updatedUserData);
  };
  const handleUpdateTour = async () => {
    console.log("updatedTourData", updatedTourData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-lg bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            x
          </button>
        </div>

        {/* user Details Content */}
        {userData && type === "update" && (
          <div className="p-4">
            <p className="mb-2">
              <strong>Email:</strong> {userData?.email}
            </p>
            <p className="mb-2">
              <strong>Name:</strong>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-1"
                value={updatedUserData.name}
                onChange={(e) =>
                  setUpdatedUserData({
                    ...updatedUserData,
                    name: e.target.value,
                  })
                }
              />
            </p>
            <p className="mb-2">
              <strong>Update Notification Preference:</strong>{" "}
              <select
                value={updatedUserData.notificationPreference ? "Yes" : "No"}
                onChange={(e) =>
                  setUpdatedUserData({
                    ...updatedUserData,
                    notificationPreference: e.target.value === "Yes",
                  })
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </p>
            <p className="mb-2">
              <strong>Update Role:</strong>
              <select
                value={updatedUserData.role}
                onChange={(e) =>
                  setUpdatedUserData({
                    ...updatedUserData,
                    role: e.target.value,
                  })
                }
              >
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="agent">Agent</option>
              </select>
            </p>
            <button
              onClick={() => handleUpdateUser(updatedUserData)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        )}

        {userData && type === "view" && (
          <div className="p-4">
            <p className="mb-2">
              <strong>Email:</strong> {userData?.email}
            </p>
            <p className="mb-2">
              <strong>Name:</strong> {userData?.name}
            </p>
            <p className="mb-2">
              <strong>Notification Preference:</strong>{" "}
              {userData?.notificationPreference ? "Yes" : "No"}
            </p>
            <p className="mb-2">
              <strong>Role:</strong> {userData?.role}
            </p>
          </div>
        )}

        {/* property Details Content */}
        {propertyData && type === "view" && (
          <div className="p-4">
            <p className="mb-2">
              <strong>Address:</strong> {propertyData?.address}
            </p>
            <p className="mb-2">
              <strong>Agent:</strong> {propertyData?.agent}
            </p>
            <p className="mb-2">
              <strong>Availability:</strong>{" "}
              {propertyData?.availability ? "Yes" : "No"}
            </p>
            <p className="mb-2">
              <strong>Bathrooms:</strong> {propertyData?.bathrooms}
            </p>
            <p className="mb-2">
              <strong>Bedrooms:</strong> {propertyData?.bedrooms}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {propertyData?.description}
            </p>
            <p className="mb-2">
              <strong>Features:</strong>{" "}
              {propertyData?.features.map((feature, index) => (
                <span key={index}>
                  {feature}
                  {index < propertyData?.features.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="mb-2">
              <strong>Garage:</strong> {propertyData?.garage}
            </p>
            <p className="mb-2">
              <strong>Price:</strong> ${propertyData?.price}
            </p>
            <p className="mb-2">
              <strong>Square Feet:</strong> {propertyData?.squareFeet}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {propertyData?.status}
            </p>
            <p className="mb-2">
              <strong>Title:</strong> {propertyData?.title}
            </p>
          </div>
        )}
        {/* tour Details Content */}
        {tourData && type === "view" && (
          <div className="p-4">
            <p className="mb-2">
              <strong>Agent Email:</strong> {tourData?.agent.email}
            </p>
            <p className="mb-2">
              <strong>Agent Name:</strong> {tourData?.agent.name}
            </p>
            <p className="mb-2">
              <strong>Buyer Email:</strong> {tourData?.buyer.email}
            </p>
            <p className="mb-2">
              <strong>Is Rated:</strong> {tourData?.isRated ? "Yes" : "No"}
            </p>
            <p className="mb-2">
              <strong>Property Address:</strong> {tourData?.property.address}
            </p>
            <p className="mb-2">
              <strong>Property Bathrooms:</strong>{" "}
              {tourData?.property.bathrooms}
            </p>
            <p className="mb-2">
              <strong>Property Bedrooms:</strong> {tourData?.property.bedrooms}
            </p>
            <p className="mb-2">
              <strong>Property Description:</strong>{" "}
              {tourData?.property.description}
            </p>
            <p className="mb-2">
              <strong>Property Price:</strong> ${tourData?.property.price}
            </p>
            <p className="mb-2">
              <strong>Property Square Feet:</strong>{" "}
              {tourData?.property.squareFeet}
            </p>
            <p className="mb-2">
              <strong>Property Title:</strong> {tourData?.property.title}
            </p>
            <p className="mb-2">
              <strong>Property Status:</strong> {tourData?.property.status}
            </p>
          </div>
        )}
        {tourData && type === "update" && (
          <div className="p-4">
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <select
                value={updatedTourData.status}
                onChange={(e) =>
                  setUpdatedTourData({
                    ...updatedTourData,
                    status: e.target.value,
                  })
                }
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </p>
            <button
              onClick={() => handleUpdateTour(updatedTourData)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        )}

        {/* rating Details Content */}
        {ratingData && (
          <div className="p-4">
            <p className="mb-2">
              <strong>Rating:</strong> {ratingData?.rating}
            </p>
            <p className="mb-2">
              <strong>Review:</strong> {ratingData?.review}
            </p>
            <p className="mb-2">
              <strong>Reviewer:</strong> {ratingData?.reviewer.name}
            </p>
            <p className="mb-2">
              <strong>Reviewer Email:</strong> {ratingData?.reviewer.email}
            </p>
            <p className="mb-2">
              <strong>Created At:</strong>{" "}
              {new Date(ratingData?.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
