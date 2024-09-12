import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "../../actions/tourActions";

const TourList = () => {
  const dispatch = useDispatch();
  const { tours, loading, error } = useSelector((state) => state.tours);

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Scheduled Tours</h1>
      <ul>
        {[1, 2, 3, 4, 5].map((tour, id) => (
          <li key={id} className="mb-4">
            <p className="font-bold">{"tour.property.title"}</p>
            <p>{"tour.date"}</p>
            <p>{"tour.time"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourList;
