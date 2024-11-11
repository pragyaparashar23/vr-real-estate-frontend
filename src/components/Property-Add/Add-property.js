import React, { useEffect, useState } from "react";
import {
  Home,
  DollarSign,
  BedDouble,
  Droplets,
  Maximize,
  Car,
  Plus,
  Minus,
  ImageIcon,
  X,
} from "lucide-react";
import { baseUrl } from "../../config";

const AddPropertyForm = () => {
  const [property, setProperty] = useState({
    address: "",
    price: "",
    bedrooms: null,
    bathrooms: null,
    squareFeet: null,
    garage: "none",
    description: "",
    features: [""],
    images: [],
    title: "",
  });

  const [userDetails, setUserDetails] = useState({});
  const [previewImages, setPreviewImages] = useState([]);

  const handleApiCallData = async () => {
    try {
      const formData = new FormData();
      Object.entries(property).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (key === "images") {
            console.log("value", value);
            value.forEach((image) => {
              console.log("image", image);
              formData.append(key, image.file, image.subtitle);
            });
          } else {
            value.forEach((item, index) => {
              console.log("item", item);

              formData.append(`${key}[${index}]`, item);
            });
          }
        } else {
          formData.append(key, value);
        }
      });

      console.log("formData", formData);

      const response = await fetch(
        `${baseUrl}/properties/create/property/${userDetails?._id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("response ee ", data);
      if (data) {
        alert("Property added successfully");
      } else {
        alert("Something went wrong please try again");
      }

      // Optionally, you can redirect or perform other actions after successful submission
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleApiCall = async () => {
    try {
      const formData = new FormData();
      Object.entries(property).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, value);
        }
      });

      console.log("formData", formData);

      const response = await fetch(
        `${baseUrl}/properties/create/property/${userDetails?._id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Property added successfully:", data);
      // Optionally, you can redirect or perform other actions after successful submission
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...property.features];
    newFeatures[index] = value;
    setProperty((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setProperty((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index) => {
    const newFeatures = property.features.filter((_, i) => i !== index);
    setProperty((prev) => ({ ...prev, features: newFeatures }));
  };

  const handleImageUpload = (e, title) => {
    console.log("123 e", e);
    // const files = e.target.files;
    // const images = [];
    // // let previewImages = [];
    // for (let i = 0; i < files.length; i++) {
    //   images.push(files[i]);
    // }
    // // previewImages.push(URL.createObjectURL(files[i]));

    // setProperty((prev) => ({ ...prev, ...images }));

    console.log("123 title", title);

    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      subtitle: title,
    }));
    setProperty((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleImageSubtitleChange = (index, subtitle) => {
    const newImages = [...property.images];
    newImages[index].subtitle = subtitle;
    setProperty((prev) => ({ ...prev, images: newImages }));
  };

  const removeImage = (index) => {
    const newImages = property.images.filter((_, i) => i !== index);
    setProperty((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleApiCallData();
    console.log("Property data submitted:", property);
    // Here you would typically send the data to your backend or state management system
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(user);
  }, []);

  console.log("Property data submitted:", property);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Add New Property
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="title"
              value={property.title}
              onChange={handleChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Title"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="address"
              value={property.address}
              onChange={handleChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="123 Main St, City, State, ZIP"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="price"
                value={property.price}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="1000000"
                required
                min="1"
                step="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Square Feet *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Maximize className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="squareFeet"
                value={property.squareFeet}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="2000"
                required
                min="1"
                step="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bedrooms *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BedDouble className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="bedrooms"
                value={property.bedrooms}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="3"
                required
                min="1"
                step="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bathrooms *
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Droplets className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="bathrooms"
                value={property.bathrooms}
                onChange={handleChange}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="2.5"
                step="0.5"
                required
                min="1"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Garage *
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Car className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="garage"
              value={property.garage}
              onChange={handleChange}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            >
              <option value="none">None</option>
              <option value="1-car attached">1-car attached</option>
              <option value="2-car attached">2-car attached</option>
              <option value="3-car attached">3-car attached</option>
              <option value="detached">Detached</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <div className="mt-1">
            <textarea
              name="description"
              rows="3"
              value={property.description}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Describe the property..."
              required
            ></textarea>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          {property.features.map((feature, index) => (
            <div key={index} className="flex mt-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter a feature"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Feature
          </button>
        </div>

        {/*  */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Images *
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            {["Entrance", "Kitchen", "Bedroom", "Bathroom", "Living Room"].map(
              (subtitle) => (
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById(`file-upload-${subtitle}`).click()
                  }
                  className="relative ml-2 cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>{subtitle} Image</span>
                  <input
                    id={`file-upload-${subtitle}`}
                    name={`file-upload-${subtitle}`}
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, subtitle)}
                  />
                </button>
              )
            )}
          </div>
        </div>

        {property?.images?.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {property?.images?.map((image, index) => (
              <div key={index} className="relative">
                {console.log("preview image", image)}
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="h-40 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={image.subtitle}
                  onChange={(e) =>
                    handleImageSubtitleChange(index, e.target.value)
                  }
                  placeholder="Image subtitle"
                  className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Property
          </button>
        </div>

        {/*  */}
      </form>
    </div>
  );
};

export default AddPropertyForm;
