import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../actions/propertyActions";
import { Link } from "react-router-dom";
import PropertyFilter from "./Filter-property-section";

const PropertyList = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log("properties", properties);

  const url =
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 lg:w-1/5">
          <PropertyFilter />
        </div>
        <div className="md:w-3/4 lg:w-4/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((property, id) => (
              <div
                key={id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={url}
                  alt={"Property"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 text-gray-800">
                    {"Luxury Apartment"}
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm">
                    {
                      "This beautiful apartment features modern amenities and stunning views..."
                    }
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      ${"500,000"}
                    </span>
                    <Link
                      to={`/properties/${id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
