import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config";
import { ViewUserModal } from "./viewModal";

function AdminHomePage() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [tours, setTours] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [showModal, setShowModal] = useState(false);
  const [singleData, setSingleData] = useState({
    user: null,
    property: null,
    tour: null,
    rating: null,
  });

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/api/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/api/tours")
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/api/ratings")
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/api/reviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteUser = (id) => {
    axios
      .get(`${baseUrl}/admin/deleteUser/${id}`)
      .then((response) => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteProperty = (id) => {
    axios
      .get(`${baseUrl}/admin/deleteProperty/${id}`)
      .then((response) => {
        setProperties(properties.filter((property) => property._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteTour = (id) => {
    axios
      .get(`${baseUrl}/admin/deleteTour/${id}`)
      .then((response) => {
        setTours(tours.filter((tour) => tour._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteRating = (id) => {
    axios
      .get(`${baseUrl}/admin/deleteRatingAndReview/${id}`)
      .then((response) => {
        setRatings(ratings.filter((rating) => rating._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // if (tab === "users") {
    //   handleManageUsers();
    // } else if (tab === "properties") {
    //   handleManageProperties();
    // } else if (tab === "tours") {
    //   handleManageTours();
    // } else if (tab === "ratings") {
    //   handleManageRatingsAndReviews();
    // }
  };

  const fetchAdminDashboardData = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/dashboard`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.success) {
        setUsers(data.data.users);
        setProperties(data.data.properties);
        setTours(data.data.tours);
        setRatings(data.data.ratingsAndReviews);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchAdminDashboardData();
  }, []);

  return (
    <div className="container mx-auto px-3 py-2">
      <div className="row">
        <div className="col">
          <h1 className="text-2xl text-center font-bold mb-4">
            Admin Dashboard
          </h1>
          <div className="flex justify-between mb-4">
            <button
              className={`text-xl    font-bold ${
                activeTab === "users" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabChange("users")}
            >
              Users
            </button>
            <button
              className={`text-xl font-bold ${
                activeTab === "properties" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabChange("properties")}
            >
              Properties
            </button>
            <button
              className={`text-xl font-bold ${
                activeTab === "tours" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabChange("tours")}
            >
              Tours
            </button>
            <button
              className={`text-xl font-bold ${
                activeTab === "ratings" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabChange("ratings")}
            >
              Ratings and Reviews
            </button>
            {/* <button
              className={`text-lg font-bold ${
                activeTab === "reviews" ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => handleTabChange("reviews")}
            >
              Reviews
            </button> */}
          </div>
          {activeTab === "users" && (
            <table className="table-auto w-full mt-5">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Email
                  </th>
                  <th className="px-4 py-2 text-center text-gray-800 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2 flex justify-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this user?"
                            )
                          ) {
                            handleDeleteUser(user._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setShowModal(true);
                          setSingleData({ user: user });
                        }}
                      >
                        View
                      </button>
                      <button
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setShowModal(true);
                          setSingleData({ user: user });
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "properties" && (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Price
                  </th>
                  <th className="px-4 py-2 text-center text-gray-800 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {properties?.map((property, index) => (
                  <tr key={property.id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{property.title}</td>
                    <td className="px-4 py-2">{property.price}</td>
                    <td className="px-4 py-2 flex justify-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this property?"
                            )
                          ) {
                            handleDeleteProperty(property._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setShowModal(true);
                          setSingleData({ property: property });
                        }}
                      >
                        View
                      </button>
                      <button
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setShowModal(true);
                          setSingleData({ property: property });
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "tours" && (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Property Name
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Tour Scheduled by
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Agent Name
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Price
                  </th>
                  <th className="px-4 py-2 text-center text-gray-800 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tours?.map((tour, index) => (
                  <tr key={tour.id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{tour?.property?.title}</td>
                    <td className="px-4 py-2">{tour?.buyer?.name}</td>
                    <td className="px-4 py-2">{tour?.agent?.name}</td>
                    <td className="px-4 py-2">{tour?.property?.price}</td>
                    <td className="px-4 py-2 flex justify-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this tour?"
                            )
                          ) {
                            handleDeleteTour(tour._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setShowModal(true);
                          setSingleData({ tour: tour });
                        }}
                      >
                        View
                      </button>
                      <button
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setShowModal(true);
                          setSingleData({ tour: tour });
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === "ratings" && (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-start text-gray-800 font-bold">
                    Property Name
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Rated by
                  </th>
                  <th className="px-4 py-2 text-center  text-gray-800 font-bold">
                    Rating (out of 5)
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Review
                  </th>
                  <th className="px-4 py-2 text-center text-gray-800 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {ratings?.map((rating, index) => (
                  <tr key={rating.id} className="border-b">
                    <td className="px-4 py-2">{rating?.property?.title}</td>
                    <td className="px-4 py-2">{rating?.reviewer?.name}</td>
                    <td className="px-4 py-2 text-center">{rating?.rating}</td>
                    <td className="px-4 py-2">{rating?.review}</td>
                    <td className="px-4 py-2 flex justify-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this rating?"
                            )
                          ) {
                            handleDeleteRating(rating._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setShowModal(true);
                          setSingleData({ rating: rating });
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* {activeTab === "reviews" && (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Tour ID
                  </th>
                  <th className="px-4 py-2 text-left text-gray-800 font-bold">
                    Review
                  </th>
                  <th className="px-4 py-2 text-center text-gray-800 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review.id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{review.tourId}</td>
                    <td className="px-4 py-2">{review.review}</td>
                    <td className="px-4 py-2 flex justify-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        // onClick={() => handleDeleteReview(review.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowModal(review)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )} */}
        </div>
      </div>
      <ViewUserModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Details"
        userData={singleData.user}
        propertyData={singleData.property}
        tourData={singleData.tour}
        ratingData={singleData.rating}
      >
        <p>User Details</p>
      </ViewUserModal>
    </div>
  );
}

export default AdminHomePage;
