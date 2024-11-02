import React, { useState, useEffect } from "react";
import DateTimePicker from "./TimePicker";
import { baseUrl } from "../../config";
import { toast } from "react-toastify";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium", // small, medium, large
  variant = "default", // default, danger, success
  tourDetails = null,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // Prevent scroll on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Modal size classes
  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-lg",
    large: "max-w-2xl",
  };

  // Modal variant classes
  const variantClasses = {
    default: "border-gray-200",
    danger: "border-red-200",
    success: "border-green-200",
  };

  const headerColors = {
    default: "bg-gray-50",
    danger: "bg-red-50 text-red-700",
    success: "bg-green-50 text-green-700",
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          bg-white rounded-lg shadow-xl 
          border ${variantClasses[variant]}
          transform transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b ${headerColors[variant]} rounded-t-lg flex items-center justify-between`}
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

// Example usage component with all variants
const ModalDemo = ({ modalConfig, setModalConfig, checkIstourScheduled }) => {
  const [selectedDate, setSelectedDate] = useState("");

  //   const [modalConfig, setModalConfig] = useState({
  //     isOpen: false,
  //     variant: "default",
  //     size: "medium",
  //     title: "Modal Title",
  //   });

  //   const openModal = (variant, size, title) => {
  //     setModalConfig({
  //       isOpen: true,
  //       variant,
  //       size,
  //       title,
  //     });
  //   };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const scheduleTour = async () => {
    console.log("modalConfig.propertyId", modalConfig);
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    try {
      const response = await fetch(
        `${baseUrl}/tours/schedule/${modalConfig.propertyId}/${userDetails._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: selectedDate }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to schedule tour");
      }

      const data = await response.json();
      if (data.message === "Property already booked for the selected date") {
        toast.info("Property already booked for the selected date");
      } else {
        console.log(data);
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
        checkIstourScheduled();
        toast.success("Tour scheduled successfully!");
        closeModal();
      }
    } catch (error) {
      console.error("Error scheduling tour:", error);
      toast.error("Failed to schedule tour. Please try again.");
    }
  };

  const confirmDate = () => {
    console.log(selectedDate);
    scheduleTour();
  };

  return (
    <div className="h-full p-4 mb-10">
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.title}
        variant={modalConfig.variant}
        size={modalConfig.size}
      >
        <div className="space-y-4">
          <DateTimePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={confirmDate}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDemo;
