import React, { useState, useEffect, useRef } from "react";
import "aframe";
import "aframe-event-set-component";
import "./vrStyle.css";
if (
  typeof window !== "undefined" &&
  window.AFRAME &&
  !window.AFRAME.components.hotspot
) {
  window.AFRAME.registerComponent("hotspot", {
    schema: {
      to: { type: "string" },
      onNavigate: { type: "string" },
    },
    init: function () {
      this.el.addEventListener("click", () => {
        const targetSelector = this.data.to;
        const onNavigate = this.data.onNavigate;
        if (onNavigate) {
          const functionName = onNavigate.split(".")[1];
          window[functionName](targetSelector);
        }
      });
    },
  });
}

const VRPropertyTour = ({ url }) => {
  const [currentScene, setCurrentScene] = useState("entrance");
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [infoContent, setInfoContent] = useState("");
  const cameraRef = useRef(null);

  const navigateToScene = (targetSelector) => {
    const sceneId = targetSelector.replace("#", "");
    setCurrentScene(sceneId);
  };

  const handleZoom = (delta) => {
    setZoom((prevZoom) => Math.max(0.5, Math.min(prevZoom + delta, 2)));
  };

  const handleRotation = (axis, delta) => {
    if (cameraRef.current) {
      const camera = cameraRef.current.object3D;
      if (axis === "y") {
        camera.rotation.y += delta;
      } else if (axis === "x") {
        camera.rotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, camera.rotation.x + delta)
        );
      }
    }
  };

  const showPropertyInfo = (info) => {
    setInfoContent(info);
    setShowInfo(true);
  };

  const homeEntranceImage =
    "https://www.shutterstock.com/image-illustration/new-house-wooden-door-empty-260nw-1692961513.jpg";
  const livingRoomImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScAVGhdLr7TSrF9x1N0gIOzEy81ZF2uNEFag&s";
  const kitchenImage = "";
  const bedroomImage = "";
  const bathroomImage = "";

  useEffect(() => {
    window.navigateToScene = navigateToScene;
    window.showPropertyInfo = showPropertyInfo;
    return () => {
      delete window.navigateToScene;
      delete window.showPropertyInfo;
    };
  }, []);

  const scenes = {
    entrance: {
      skyUrl: url.imageOne,
      hotspots: [
        { position: "0 0 -5", to: "#livingRoom", label: "Enter Living Room" },
        { position: "-3 0 -3", to: "#kitchen", label: "Go to Kitchen" },
        { position: "3 0 -3", to: "#stairs", label: "Go Upstairs" },
        {
          position: "0 -1 -3",
          infoLabel: "House Info",
          info: "Welcome to this beautiful 3-bedroom, 2.5-bath home with an open floor plan and modern finishes.",
        },
      ],
    },
    livingRoom: {
      skyUrl: livingRoomImage,
      hotspots: [
        { position: "5 0 0", to: "#kitchen", label: "Go to Kitchen" },
        { position: "0 0 5", to: "#entrance", label: "Back to Entrance" },
      ],
    },
    kitchen: {
      skyUrl: url.imageFour,
      hotspots: [
        { position: "-5 0 0", to: "#livingRoom", label: "Back to Living Room" },
        { position: "0 0 -5", to: "#diningRoom", label: "To Dining Room" },
        {
          position: "0 -1 -3",
          infoLabel: "Kitchen Info",
          info: "Modern kitchen with stainless steel appliances, quartz countertops, and a large island.",
        },
      ],
    },
    diningRoom: {
      skyUrl: url.imageThree,
      hotspots: [
        { position: "0 0 5", to: "#kitchen", label: "Back to Kitchen" },
        { position: "5 0 0", to: "#livingRoom", label: "To Living Room" },
        {
          position: "0 -1 -3",
          infoLabel: "Dining Room Info",
          info: "Elegant dining room with chandelier and built-in china cabinet.",
        },
      ],
    },
    stairs: {
      skyUrl: url.imageTwo,
      hotspots: [
        { position: "0 -2 -5", to: "#entrance", label: "Back to Entrance" },
        { position: "0 2 5", to: "#upstairsHall", label: "Go Upstairs" },
        {
          position: "0 -1 -3",
          infoLabel: "Stairs Info",
          info: "Beautiful hardwood staircase with wrought iron balusters.",
        },
      ],
    },
    upstairsHall: {
      skyUrl: url.imageOne,
      hotspots: [
        { position: "0 -2 -5", to: "#stairs", label: "Go Downstairs" },
        { position: "5 0 0", to: "#masterBedroom", label: "Master Bedroom" },
        { position: "-3 0 -3", to: "#bedroom2", label: "Bedroom 2" },
        { position: "3 0 -3", to: "#bedroom3", label: "Bedroom 3" },
        {
          position: "0 -1 -3",
          infoLabel: "Upstairs Info",
          info: "Upstairs features 3 bedrooms and 2 full bathrooms.",
        },
      ],
    },
    masterBedroom: {
      skyUrl: url.imageFour,
      hotspots: [
        { position: "-5 0 0", to: "#upstairsHall", label: "Back to Hall" },
        { position: "3 0 -3", to: "#masterBath", label: "Master Bathroom" },
        {
          position: "0 -1 -3",
          infoLabel: "Master Bedroom Info",
          info: "Spacious master bedroom with en-suite bathroom and walk-in closet.",
        },
      ],
    },
    masterBath: {
      skyUrl: url.imageThree,
      hotspots: [
        {
          position: "-3 0 3",
          to: "#masterBedroom",
          label: "Back to Master Bedroom",
        },
        {
          position: "0 -1 -3",
          infoLabel: "Master Bath Info",
          info: "Luxurious master bathroom with double vanity, soaking tub, and large walk-in shower.",
        },
      ],
    },
    bedroom2: {
      skyUrl: url.imageTwo,
      hotspots: [
        { position: "3 0 3", to: "#upstairsHall", label: "Back to Hall" },
        {
          position: "0 -1 -3",
          infoLabel: "Bedroom 2 Info",
          info: "Comfortable second bedroom with large closet and plenty of natural light.",
        },
      ],
    },
    bedroom3: {
      skyUrl: url.imageOne,
      hotspots: [
        { position: "-3 0 3", to: "#upstairsHall", label: "Back to Hall" },
        {
          position: "0 -1 -3",
          infoLabel: "Bedroom 3 Info",
          info: "Versatile third bedroom, perfect for a guest room or home office.",
        },
      ],
    },
  };

  return (
    <div className="vr-container">
      <a-scene embedded>
        <a-assets>
          {Object.entries(scenes).map(([id, scene]) => (
            <img
              key={id}
              id={`${id}-sky`}
              src={scene.skyUrl}
              alt={`360 view of ${id}`}
            />
          ))}
        </a-assets>

        {Object.entries(scenes).map(([id, scene]) => (
          <a-entity key={id} id={id} visible={currentScene === id}>
            <a-sky src={`#${id}-sky`} />
            {scene.hotspots.map((hotspot, index) => (
              <a-entity
                key={index}
                hotspot={`to: ${hotspot.to}; onNavigate: ${
                  hotspot.to
                    ? "window.navigateToScene"
                    : "window.showPropertyInfo"
                }`}
                geometry="primitive: sphere; radius: 0.3"
                material={`color: ${
                  hotspot.to ? "#00ff00" : "#0000ff"
                }; shader: flat`}
                position={hotspot.position}
                event-set__mouseenter="_event: mouseenter; material.opacity: 0.5; scale: 1.2 1.2 1.2"
                event-set__mouseleave="_event: mouseleave; material.opacity: 1; scale: 1 1 1"
              >
                <a-text
                  value={hotspot.label || hotspot.infoLabel}
                  align="center"
                  position="0 0.5 0"
                  scale="0.5 0.5 0.5"
                />
              </a-entity>
            ))}
          </a-entity>
        ))}

        <a-camera id="main-camera" ref={cameraRef} zoom={zoom}>
          <a-cursor color="#FFFFFF" />
        </a-camera>
      </a-scene>
      <div className="controls">
        <button onClick={() => handleZoom(0.1)}>Zoom In</button>
        <button onClick={() => handleZoom(-0.1)}>Zoom Out</button>
        {/* <button onClick={() => handleRotation("y", -Math.PI / 18)}>Left</button>
        <button onClick={() => handleRotation("y", Math.PI / 18)}>Right</button>
        <button onClick={() => handleRotation("x", -Math.PI / 18)}>Up</button>
        <button onClick={() => handleRotation("x", Math.PI / 18)}>Down</button> */}
      </div>
      {showInfo && (
        <div className="info-overlay">
          <div className="info-content">
            <p>{infoContent}</p>
            <button onClick={() => setShowInfo(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VRPropertyTour;
