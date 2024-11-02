import React, { useEffect, useState } from "react";
import { baseUrl, imageUrl } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ScheduleTourList = () => {
  const navigate = useNavigate();
  const [toursData, setToursData] = useState([]);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [tourId, setTourId] = useState("");
  const [reviewData, setReviewData] = useState([]);

  const fetchTours = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const response = await fetch(
        `${baseUrl}/tours/agentTours/${userDetails._id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setToursData(data);
      getRating();
      console.log(data); // Handle the data as needed
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const cancelTour = async (tourId) => {
    const response = await fetch(`${baseUrl}/tours/cancelTourAgent/${tourId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    fetchTours();
  };

  const visitTour = async (tourId) => {
    console.log(tourId);
    const response = await fetch(`${baseUrl}/tours/visitProperty/${tourId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    toast.success("Tour Started");
    fetchTours();
  };

  const completeTour = async (tourId) => {
    console.log(tourId);
    const response = await fetch(`${baseUrl}/tours/completeTour/${tourId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    fetchTours();
    toast.success("Tour Completed");
  };

  const rateTour = async (tourId) => {
    console.log(tourId);
    setTourId(tourId);
    setShowReviewForm(true);
  };

  const getRating = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const response = await fetch(
        `${baseUrl}/tours/getRating/${userDetails?._id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setReviewData(data);

      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${baseUrl}/tours/rateTour/${tourId}/${rating}/${review}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    getRating();
    fetchTours();
    toast.success("Tour Rated");
    setShowReviewForm(false);
  };

  const handleNavigate = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  console.log("reviewData", reviewData);
  console.log("toursData", toursData);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Scheduled Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {toursData?.map((tour, index) => (
          <div key={index} className="shadow-lg rounded-lg p-4">
            <img
              src={imageUrl + tour?.property?.images[0]?.url}
              alt="Tour"
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{tour?.property?.title}</h2>
            <p
              className={`text-lg font-bold mb-4 ${
                new Date(tour?.date) < new Date()
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              Scheduled Date: {new Date(tour?.date).toLocaleDateString()}
            </p>
            <p className="text-lg font-bold mb-4">
              Price: ${tour?.property?.price}
            </p>
            <p className="text-lg font-bold mb-4">
              Location: {tour?.property?.address}
            </p>
            <p className="text-lg font-bold mb-4">
              Description: {tour?.property?.description}
            </p>
            <div className="flex justify-between">
              {tour.status === "scheduled" &&
                tour.status !== "completed" &&
                new Date(tour.date) >= new Date().setHours(0, 0, 0, 0) && (
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this tour?"
                        )
                      ) {
                        cancelTour(tour._id);
                      }
                    }}
                  >
                    Cancel Tour
                  </button>
                )}

              <p
                className={`text-lg font-bold mb-4 ${
                  tour.status === "scheduled"
                    ? "text-blue-500"
                    : tour.status === "cancelled"
                    ? "text-red-500"
                    : tour.status === "visiting"
                    ? "text-yellow-500"
                    : tour.status === "completed"
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >
                Status : {tour.status} by {tour?.cancelledBy || ""}
              </p>

              {/* {new Date(tour?.date).toLocaleDateString() ===
                new Date().toLocaleDateString() &&
                tour.status === "scheduled" && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                    onClick={() => visitTour(tour._id)}
                  >
                    Visit Tour
                  </button>
                )} */}
              {/* {tour.status === "completed" && !tour?.isRated && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
                  onClick={() => rateTour(tour._id)}
                >
                  Rate Tour
                </button>
              )} */}
              {/* {tour.status === "visiting" && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
                  onClick={() => completeTour(tour._id)}
                >
                  Tour Completed
                </button>
              )} */}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                onClick={() => handleNavigate(tour?.property?._id)}
              >
                View Property
              </button>
            </div>

            {showReviewForm && tour._id === tourId && !tour?.isRated && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Rate and Review
                </h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label
                      htmlFor="rating"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Rating
                    </label>
                    <select
                      id="rating"
                      name="rating"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select a rating</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="review"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Review
                    </label>
                    <textarea
                      id="review"
                      name="review"
                      rows={3}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}
            <div className="mt-4">
              {reviewData?.map(
                (review) =>
                  review.tour === tour._id && (
                    <>
                      <h3 className="text-lg font-medium text-gray-900">
                        Review
                      </h3>
                      <div className="mt-2">
                        <div key={review.id} className="mb-4">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={review.user.avatar}
                                alt={review.user.name}
                              />
                            </div> */}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                Rating : {review.rating} / 5
                              </div>
                              <div className="text-sm text-gray-500">
                                Review : {review.review}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTourList;
