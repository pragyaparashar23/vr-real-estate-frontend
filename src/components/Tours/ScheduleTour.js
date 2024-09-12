import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleTour } from '../../actions/tourActions';

const ScheduleTour = () => {
  const [property, setProperty] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.tours);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(scheduleTour({ property, date, time }));
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Schedule a Tour</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Property</label>
          <input
            type="text"
            value={property}
            onChange={(e) => setProperty(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Schedule Tour
        </button>
      </form>
    </div>
  );
};

export default ScheduleTour;
