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

import BedRoomImage1 from "../../assests/images/bedroom.jpg";
import BedRoomImage2 from "../../assests/images/bedroom2.jpg";
import KitchenImage1 from "../../assests/images/kitchen.jpg";
import WashroomImage1 from "../../assests/images/washroom.jpg";

import EntranceImage from "../../assests/images/entrance.jpg";
import EntranceImage1 from "../../assests/images/entrance2.jpg";
import LivingImage1 from "../../assests/images/livingroom.jpg";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import TimePickerComponent from "./TimePicker";
import DatePickerComponent from "./DatePicker";
import DateTimePicker from "./TimePicker";
import ModalDemo from "./modal";

const propertyData = [
  {
    id: 1,
    title: "Modern Family Home in Springfield",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    price: "$600,000",
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3800,
    garage: "3-car detached",
    description:
      "This charming two-story home features a spacious family room, updated kitchen with granite countertops, and a luxurious master suite with a balcony. The backyard is a private retreat with a custom patio, fire pit, and garden area. Perfect for family living.",
    features: [
      "Granite countertops in kitchen",
      "Large backyard with garden",
      "Fire pit and custom patio",
      "Hardwood floors throughout",
    ],
    images: [
      {
        url: BedRoomImage1,
        title: "Go to bed room",
      },
      {
        url: KitchenImage1,
        title: "Go to Kitchen",
      },
      {
        url: BedRoomImage1,
        title: "Go to bed room",
      },
      {
        url: BedRoomImage1,
        title: "Go to bed room",
      },
    ],
    mainImage: EntranceImage,
  },
  {
    id: 2,
    title: "Luxury Beachfront Estate in Miami",
    address: "99 Beachfront Avenue, Miami, FL 33139",
    price: "$2,500,000",
    bedrooms: 6,
    bathrooms: 6.5,
    squareFeet: 6200,
    garage: "4-car attached",
    description:
      "Enjoy beachfront living in this magnificent modern estate. With floor-to-ceiling windows, ocean views, and a rooftop terrace with infinity pool, this home offers luxury at its finest. Features include a chef's kitchen, private gym, and direct beach access.",
    features: [
      "Floor-to-ceiling windows with ocean views",
      "Infinity pool and rooftop terrace",
      "Private gym and spa",
      "Direct access to private beach",
    ],
    images: [
      {
        url: BedRoomImage1,
        title: "Go to bed room",
      },
      {
        url: KitchenImage1,
        title: "Go to kitchen",
      },
      {
        url: BedRoomImage1,
        title: "Go to bed room",
      },
      {
        url: BedRoomImage1,
        title: "Go to bed room",
      },
    ],
    mainImage: EntranceImage1,
  },
  {
    id: 3,
    title: "Mountain Retreat in Aspen",
    address: "350 Oakwood Drive, Aspen, CO 81611",
    price: "$8,900,000",
    bedrooms: 7,
    bathrooms: 8,
    squareFeet: 8500,
    garage: "3-car heated garage",
    description:
      "Nestled in the mountains, this exquisite ski-in, ski-out home offers stunning views of Aspen's snow-capped peaks. With an expansive living area, gourmet kitchen, wine cellar, and outdoor hot tub, this is the ultimate mountain retreat. Perfect for winter getaways and entertaining.",
    features: [
      "Ski-in, ski-out access",
      "Wine cellar and tasting room",
      "Expansive deck with mountain views",
      "Outdoor hot tub and fire pit",
    ],
    images: [
      {
        url: BedRoomImage1,
        title: "Go to bed room",
      },
      {
        url: KitchenImage1,
        title: "Go to kitchen",
      },
      {
        url: BedRoomImage1,
        title: "Go to bed room",
      },
      {
        url: BedRoomImage1,
        title: "Go to bed room",
      },
    ],
    mainImage: EntranceImage,
  },
  // {
  //   title: "Lakefront Luxury in Lake Tahoe",
  //   address: "200 Lakeview Crescent, Lake Tahoe, NV 89449",
  //   price: "$1,750,000",
  //   bedrooms: 4,
  //   bathrooms: 4,
  //   squareFeet: 5200,
  //   garage: "2-car attached",
  //   description:
  //     "A lakefront paradise, this home offers stunning lake views, a private dock, and an open floor plan perfect for lakeside living. The gourmet kitchen features custom cabinetry, and the spacious master suite includes a private balcony overlooking the water.",
  //   features: [
  //     "Private dock with boat access",
  //     "Lakefront views from every room",
  //     "Spacious open floor plan",
  //     "Master suite with private balcony",
  //   ],
  //   images: [
  //     {
  //       url: BedRoomImage1,
  //       title: "Go to bed room",
  //     },
  //     {
  //       url: KitchenImage1,
  //       title: "Go to kitchen",
  //     },
  //     {
  //       url: BedRoomImage1,
  //       title: "Go to bed room",
  //     },
  //     {
  //       url: BedRoomImage1,
  //       title: "Go to bed room",
  //     },
  //   ],
  //   mainImage: "",
  // },
  // // {
  //   title: "Elegant Vineyard Estate in Napa",
  //   address: "123 Vineyard Road, Napa, CA 94558",
  //   price: "$3,200,000",
  //   bedrooms: 5,
  //   bathrooms: 5.5,
  //   squareFeet: 6000,
  //   garage: "2-car attached",
  //   description:
  //     "Set in the heart of wine country, this luxurious estate boasts a private vineyard, chef’s kitchen, and expansive outdoor entertaining area with a pool and outdoor fireplace. Perfect for those who love wine, nature, and elegant country living.",
  //   features: [
  //     "Private vineyard with wine cellar",
  //     "Chef's kitchen with premium appliances",
  //     "Outdoor fireplace and pool",
  //     "Expansive patio and garden",
  //   ],
  //   images: [
  //     {
  //       url: BedRoomImage1,
  //       title: "Go to bed room",
  //     },
  //     {
  //       url: BedRoomImage1,
  //       title: "Go to bed room",
  //     },
  //     {
  //       url: BedRoomImage1,
  //       title: "Go to bed room",
  //     },
  //     {
  //       url: BedRoomImage1,
  //       title: "Go to bed room",
  //     },
  //   ],
  //   mainImage: "",
  // },
];

const PropertyDetails = ({ match }) => {
  const params = useParams();
  const { property, loading, error } = useSelector((state) => state.properties);

  const [isVRMode, setIsVRMode] = useState(false);
  const [toogleCall, setTogglecall] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    variant: "default",
    size: "medium",
    title: "Modal Title",
  });

  const [showModal, setShowModal] = useState(false);
  const [isTourScheduled, setIsTourScheduled] = useState(false);
  const [tourDetails, setTourDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const url = {
    Entrance:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg",
    Kitchen:
      "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg",
    Bedroom:
      "https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg",
    Washroom:
      "https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg",
    LivingRoom:
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

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/properties/property/${params.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("preoprt data", data);
      setData(data.data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const scheduleTour = () => {
    console.log("scheduleTour");
    setShowModal(true);
  };
  const openModal = (variant, size, title, propertyId) => {
    console.log("propertyId", propertyId);
    setModalConfig({
      isOpen: true,
      variant,
      size,
      title,
      propertyId,
    });
  };

  const checkIstourScheduled = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const response = await fetch(
      `${baseUrl}/tours/checkSchedule/${params.id}/${userDetails._id}`
    );
    const data = await response.json();
    console.log("checkIstourScheduled", data);
    if (data.tourExists) {
      setIsTourScheduled(true);
      setTourDetails(data.tour);
    } else {
      setIsTourScheduled(false);
    }
  };

  const calculateRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return totalRating / reviews.length;
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(userDetails);
    fetchData();
    if (userDetails) {
      checkIstourScheduled();
    }
  }, [params.id]);

  return (
    <>
      {data?.property ? (
        <div className="h-screen w-full p-4 ">
          {data?.property?.images.length > 0 && (
            <VRPropertyTour1 url={url} data={data?.property} />
          )}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4 mt-8 z-10">
            <div className="p-6 relative ">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {data?.property?.address}
              </h2>
              {/* <button className="vr-toggle" onClick={() => setIsVRMode(true)}>
                {isVRMode ? "Exit VR" : "View VR"}
              </button> */}
              <p className="text-2xl text-green-600 font-semibold mb-4">
                $ {data?.property?.price}
              </p>
              <p className="text-2xl text-gray-600 font-semibold mb-4">
                Rating : {calculateRating(data?.getRating)} / 5
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center">
                  <Bed className="w-6 h-6 text-blue-500 mr-2" />
                  <span>{data?.property?.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-6 h-6 text-blue-500 mr-2" />
                  <span>{data?.property?.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="w-6 h-6 text-blue-500 mr-2" />
                  <span>{data?.property?.squareFeet} sq ft</span>
                </div>
                <div className="flex items-center">
                  <Car className="w-6 h-6 text-blue-500 mr-2" />
                  <span>{data?.property?.garage}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                {data?.property?.description}
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Key Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data?.property?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Home className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  scheduleTour();
                  // document
                  //   .getElementById("select-date-slot")
                  //   .classList.remove("hidden");
                }}
              >
                Schedule a Tour
              </button> */}
              {/* Default Modal */}

              {/* Success Modal */}
              {/* <button
                onClick={() => openModal("success", "small", "Schedule a Tour")}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
              >
                Open Success Modal
              </button> */}

              {/* Danger Modal */}
              {/* <button
                onClick={() => openModal("danger", "large", "Schedule a Tour")}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              >
                Open Danger Modal
              </button> */}

              <ModalDemo
                modalConfig={modalConfig}
                setModalConfig={setModalConfig}
                onClose={() => setShowModal(false)}
                checkIstourScheduled={checkIstourScheduled}
              />
            </div>

            {userDetails?.role === "buyer" && (
              <div className="flex justify-center items-center mb-10">
                {!isTourScheduled && (
                  <button
                    onClick={() =>
                      openModal(
                        "default",
                        "medium",
                        "Schedule a Tour",
                        data?.property?._id
                      )
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Schedule a Tour
                  </button>
                )}
                {isTourScheduled && (
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-default"
                    disabled={true}
                  >
                    Tour Scheduled on{" "}
                    {new Date(tourDetails.date).toLocaleDateString()}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <h3>Loading....</h3>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
