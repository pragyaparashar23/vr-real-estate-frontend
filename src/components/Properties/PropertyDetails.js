import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperty } from "../../actions/propertyActions";
import "aframe";
import VRTour from "./VR-tour";
import VRTourOne from "./VR-tour1";
import VRPropertyTour from "./VR-tour1";
import VRPropertyTour2 from "./VR2";
import VRPropertyTour1 from "./VR2";

import { Home, Bed, Bath, Ruler, DollarSign, Car } from "lucide-react";

const PropertyDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { property, loading, error } = useSelector((state) => state.properties);

  const [isVRMode, setIsVRMode] = useState(false);
  const [toogleCall, setTogglecall] = useState(false);

  // useEffect(() => {
  //   dispatch(getProperty(match.params.id));
  // }, [dispatch, match.params.id]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  const url = {
    imageOne:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    imageTwo:
      "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg",
    imageThree:
      "https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg",
    imageFour:
      "https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg",
    imageFive:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
  };

  const propertyDetails = {
    address: "123 Luxury Lane, Beverly Hills, CA 90210",
    price: "$5,750,000",
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4500,
    garage: "2-car attached",
    description:
      "Experience luxury living in this stunning modern home. Featuring an open concept living area, gourmet kitchen with top-of-the-line appliances, and a private master suite with a spa-like bathroom. The backyard oasis includes a pool, spa, and outdoor kitchen, perfect for entertaining.",
    features: [
      "Open concept floor plan",
      "Gourmet kitchen with island",
      "Master suite with walk-in closet",
      "Home theater room",
      "Smart home technology",
      "Energy-efficient appliances",
      "Hardwood floors throughout",
      "Custom lighting fixtures",
      "Landscaped gardens",
      "Pool and spa",
    ],
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* <a-scene embedded vr-mode-ui="enabled: false">
        <a-assets>
          <img id="skyTexture" src={url} alt="360 view" />
        </a-assets>
        <a-sky src="#skyTexture"></a-sky>
        <a-text
          value="Welcome to VR Tour"
          position="-1 1.5 -2"
          color="#000000"
          width="4"
        ></a-text>
        <a-camera>
          <a-cursor></a-cursor>
        </a-camera>
      </a-scene> */}
      {/* {isVRMode && ( */}
      <VRPropertyTour1 url={url} />
      {/* )} */}
      {/* <VRTour url={url} /> */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4 mt-8 z-10">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {propertyDetails.address}
          </h2>
          <button className="vr-toggle" onClick={() => setIsVRMode(true)}>
            {isVRMode ? "Exit VR" : "View VR"}
          </button>
          <p className="text-2xl text-green-600 font-semibold mb-4">
            {propertyDetails.price}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center">
              <Bed className="w-6 h-6 text-blue-500 mr-2" />
              <span>{propertyDetails.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-6 h-6 text-blue-500 mr-2" />
              <span>{propertyDetails.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <Ruler className="w-6 h-6 text-blue-500 mr-2" />
              <span>{propertyDetails.squareFeet} sq ft</span>
            </div>
            <div className="flex items-center">
              <Car className="w-6 h-6 text-blue-500 mr-2" />
              <span>{propertyDetails.garage}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{propertyDetails.description}</p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Key Features
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {propertyDetails.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Home className="w-5 h-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
