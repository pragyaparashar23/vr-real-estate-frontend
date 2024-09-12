import React, { useState } from "react";
import { Home, DollarSign, BedDouble, Droplets, Maximize } from "lucide-react";

// Simple Slider component
const Slider = ({ min, max, value, onChange }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full"
    />
  );
};

// Simple Checkbox component
const Checkbox = ({ id, checked, onChange, label }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};

const PropertyFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    range: [0, 1000000],
    bedrooms: 0,
    bathrooms: 0,
    propertyType: "",
    amenities: [],
  });

  const propertyTypes = ["House", "Apartment", "Condo", "Townhouse"];
  const amenitiesList = ["Pool", "Gym", "Parking", "Balcony", "Pet Friendly"];

  const handlePriceChange = (value) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePropertyTypeChange = (type) => {
    setFilters((prev) => ({ ...prev, propertyType: type }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  console.log("filters", filters);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Filter Properties
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <Slider
          min={0}
          max={1000000}
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>${filters.range[0]?.toLocaleString()}</span>
          <span>${filters.priceRange?.toLocaleString()}</span>
          <span>${filters.range[1]?.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <div className="relative">
            <BedDouble className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleInputChange}
              min="0"
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <div className="relative">
            <Droplets className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleInputChange}
              min="0"
              step="0.5"
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => handlePropertyTypeChange(type)}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                filters.propertyType === type
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amenities
        </label>
        <div className="grid grid-cols-2 gap-2">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center">
              <Checkbox
                key={amenity}
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                label={amenity}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default PropertyFilter;
