import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../actions/propertyActions";
import { Link, useNavigate } from "react-router-dom";
import PropertyFilter from "./Filter-property-section";

import BedRoomImage1 from "../../assests/images/bedroom.jpg";
import BedRoomImage2 from "../../assests/images/bedroom2.jpg";
import KitchenImage1 from "../../assests/images/kitchen.jpg";
import WashroomImage1 from "../../assests/images/washroom.jpg";

import EntranceImage from "../../assests/images/entrance.jpg";
import EntranceImage1 from "../../assests/images/entrance2.jpg";
import LivingImage1 from "../../assests/images/livingroom.jpg";
import { imageUrl } from "../../config";
import SliderOne from "../../assests/sliderImage/sliderOne.jpeg";
import SliderTwo from "../../assests/sliderImage/sliderTwo.jpeg";
import Logo from "../../assests/sliderImage/logo.jpeg";

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

const PropertyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties, loading, error } = useSelector(
    (state) => state.properties
  );

  const ud = localStorage.getItem("userDetails");
  const user = JSON.parse(ud);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (e) => {
    const target = e.target;
    if (target.tagName === "INPUT") {
      setCurrentSlide(Number(target.id.split("-")[1]) - 1);
    }
  };

  if (user?.role === "admin") {
    navigate("/admin");
  }

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % properties.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log("properties", properties);

  const url =
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  return (
    <>
      <div className="carousel-item w-full" style={{ height: "60vh" }}>
        <img
          src={SliderTwo}
          alt="slide 3"
          className="flex w-full"
          style={{ height: "100%" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* <div className="flex items-center justify-center">
          <div className="carousel relative shadow-2xl bg-white">
            <div className="carousel-inner relative overflow-hidden w-full">
              <input
                className="carousel-open"
                type="radio"
                id="carousel-1"
                name="carousel"
                aria-hidden="true"
                hidden=""
                checked="checked"
              />
              <div
                className="carousel-item absolute "
                style={{ height: "50vh" }}
              >
                <img
                  src={SliderOne}
                  alt="slide 1"
                  className="block w-full"
                  style={{ height: "100%" }}
                />
              </div>
              <input
                className="carousel-open"
                type="radio"
                id="carousel-2"
                name="carousel"
                aria-hidden="true"
                hidden=""
              />
              <div
                className="carousel-item absolute "
                style={{ height: "50vh" }}
              >
                <img
                  src={SliderTwo}
                  alt="slide 2"
                  className="block w-full"
                  style={{ height: "100%" }}
                />
              </div>
              <input
                className="carousel-open"
                type="radio"
                id="carousel-3"
                name="carousel"
                aria-hidden="true"
                hidden=""
              />
              <div
                className="carousel-item absolute"
                style={{ height: "50vh" }}
              >
                <img
                  src={SliderOne}
                  alt="slide 3"
                  className="flex w-full"
                  style={{ height: "100%" }}
                />
              </div>
            </div>
            <div className="carousel-indicators">
              <label
                htmlFor="carousel-1"
                className="carousel-bullet cursor-pointer block text-4xl text-white hover:text-gray-900"
              ></label>
              <label
                htmlFor="carousel-2"
                className="carousel-bullet cursor-pointer block text-4xl text-white hover:text-gray-900"
              ></label>
              <label
                htmlFor="carousel-3"
                className="carousel-bullet cursor-pointer block text-4xl text-white hover:text-gray-900"
              ></label>
            </div>
          </div>
        </div> */}

        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Featured Properties
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* <div className="md:w-1/4 lg:w-1/5">
          <PropertyFilter />
        </div> */}
          <div className="md:w-3/4 lg:w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties?.data?.map((property, id) => (
                <div
                  key={id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={imageUrl + property?.images[0]?.url}
                    alt={"Property"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">
                      {property?.title}
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm">
                      {property?.description.slice(0, 50)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">
                        $ {property?.price}
                      </span>
                      <Link
                        to={`/property/${property?._id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300"
                      >
                        View Property
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {properties?.data?.length === 0 && (
                <p className="text-lg font-bold text-center">
                  No properties found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <div>
  //     <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
  //       Featured Properties
  //     </h1>

  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
  //       <div className="w-[50%] h-full">
  //         <PropertyFilter />
  //       </div>
  //       <div className="w-full flex flex-wrap">
  //         {[1, 1, 3, 4].map((property, id) => (
  //           <div
  //             key={id}
  //             className="bg-white rounded-lg shadow-md overflow-hidden"
  //           >
  //             <img
  //               src={url || "https://via.placeholder.com/300x200"}
  //               alt={"property.title"}
  //               className="w-full h-48 object-cover"
  //             />
  //             <div className="p-6">
  //               <h2 className="text-xl font-semibold mb-2 text-gray-800">
  //                 {"property.title"}
  //               </h2>
  //               <p className="text-gray-600 mb-4">
  //                 {"property.description.substring(0, 100)"}...
  //               </p>
  //               <div className="flex justify-between items-center">
  //                 <span className="text-blue-600 font-bold">
  //                   ${"property.price.toLocaleString()"}
  //                 </span>
  //                 <Link
  //                   to={`/property/${"property._id"}`}
  //                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
  //                 >
  //                   View Details
  //                 </Link>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default PropertyList;
