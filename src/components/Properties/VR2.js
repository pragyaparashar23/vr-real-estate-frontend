import React, { useState, useEffect, useRef } from "react";
import "aframe";
import "aframe-event-set-component";
import { imageUrl } from "../../config";
import { imageList } from "../../imageList";

// ... (previous hotspot registration code remains the same)

const VRPropertyTour1 = ({ url, data }) => {
  const [currentScene, setCurrentScene] = useState("entrance");
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [infoContent, setInfoContent] = useState("");
  const [isVRMode, setIsVRMode] = useState(false);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const [imageData, setImageData] = useState([]);

  const [entranceSky, setEntranceSky] = useState("");
  const [kitchenSky, setKitchenSky] = useState("");
  const [bedroomSky, setBedroomSky] = useState("");

  const navigateToScene = (targetSelector) => {
    const sceneId = targetSelector.replace("#", "");
    setCurrentScene(sceneId);
  };

  const images = [
    {
      title: "entrance",
      image:
        "https://png.pngtree.com/background/20230527/original/pngtree-modern-entrance-home-design-videos-picture-image_2757752.jpg",
    },
    {
      title: "kitchen",
      image:
        "https://images.pexels.com/photos/4030908/pexels-photo-4030908.jpeg?cs=srgb&dl=pexels-quirva-4030908.jpg&fm=jpg",
    },
    {
      title: "bedroom",
      image:
        "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?cs=srgb&dl=pexels-pixabay-262048.jpg&fm=jpg",
    },
    {
      title: "bathroom",
      image:
        "https://c4.wallpaperflare.com/wallpaper/985/875/592/blender-bathroom-interior-design-wallpaper-preview.jpg",
    },
    {
      title: "livingroom",
      image:
        "https://plus.unsplash.com/premium_photo-1661407582641-9ce38a3c8402?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
    },
  ];

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

  const toggleVRMode = () => {
    if (!isVRMode) {
      if (sceneRef.current.requestFullscreen) {
        sceneRef.current.requestFullscreen();
      } else if (sceneRef.current.mozRequestFullScreen) {
        sceneRef.current.mozRequestFullScreen();
      } else if (sceneRef.current.webkitRequestFullscreen) {
        sceneRef.current.webkitRequestFullscreen();
      } else if (sceneRef.current.msRequestFullscreen) {
        sceneRef.current.msRequestFullscreen();
      }
      setIsVRMode(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsVRMode(false);
    }
  };

  useEffect(() => {
    window.navigateToScene = navigateToScene;
    window.showPropertyInfo = showPropertyInfo;

    const handleFullscreenChange = () => {
      setIsVRMode(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      delete window.navigateToScene;
      delete window.showPropertyInfo;
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    setImageData(data?.images);
    console.log("124 data", data);
    if (data?.images.length > 0) {
      setEntranceSky(imageUrl + data?.images[0]?.url);
      setKitchenSky(imageUrl + data?.images[1]?.url);
      setBedroomSky(imageUrl + data?.images[2]?.url);
    }
  }, [data]);

  console.log("124 imageData", imageUrl + imageData[0]?.url);

  // ... (scenes object remains the same)

  console.log("125 entranceSky", entranceSky);
  console.log("125 url.imageOne", url.imageOne);

  const scenes = {
    entrance: {
      skyUrl: images[0]?.image,
      hotspots: [
        {
          position: "-6 0 -5",
          to: "#kitchen",
          label: "",
        },
        {
          position: "-6 0 9",
          to: "#bedroom",
          label: "",
        },

        {
          position: "-6 0 -6",
          to: "#bathroom",
          label: "",
        },
      ],
    },

    kitchen: {
      skyUrl: images[1]?.image,
      hotspots: [
        { position: "-5 0 0", to: "#entrance", label: "Back to Entrance" },
        { position: "-6 0 12", to: "#bedroom", label: "" },
        { position: "-6 0 -5", to: "#bathroom", label: "" },
      ],
    },

    bedroom: {
      skyUrl: images[2]?.image,
      hotspots: [
        { position: "3 0 3", to: "#entrance", label: "Back to entrance" },
        { position: "3 0 3", to: "#kitchen", label: "" },
        { position: "3 0 5", to: "#bathroom", label: "" },
      ],
    },
    livingroom: {
      skyUrl: images[3]?.image,
      hotspots: [
        { position: "-3 0 3", to: "#entrance", label: "Back to entrance" },

        { position: "-3 0 2", to: "#kitchen", label: "" },
        { position: "-3 0 -3", to: "#bedroom", label: "" },
        { position: "-3 0 -5", to: "#bathroom", label: "" },
      ],
    },
    bathroom: {
      skyUrl: images[4]?.image,
      hotspots: [
        { position: "-3 0 -8", to: "#entrance", label: "Back to entranc" },

        { position: "-3 0 1", to: "#kitchen", label: "" },
        { position: "-3 0 -3", to: "#bedroom", label: "" },
      ],
    },
  };

  return (
    <div className={`vr-container ${isVRMode ? "vr-mode" : ""}`}>
      {data?.images.length > 0 && (
        <a-scene embedded ref={sceneRef}>
          {/* ... (a-assets and scene entities remain the same) */}

          <>
            <a-assets>
              {Object.entries(scenes).map(([id, scene]) => (
                <>
                  {console.log("111 scene", scene)}
                  <img
                    key={id}
                    id={`${id}-sky`}
                    src={scene.skyUrl}
                    alt={`360 view of ${id}`}
                  />
                </>
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
          </>

          <a-camera id="main-camera" ref={cameraRef} zoom={zoom}>
            <a-cursor color="#FFFFFF" />
          </a-camera>
        </a-scene>
      )}

      {/* <button className="vr-toggle" onClick={toggleVRMode}>
        {isVRMode ? "Exit VR" : "View VR"}
      </button> */}
      {/* {isVRMode && ( */}
      {/* <div className="vr-controls">
        <button onClick={() => handleZoom(0.1)}>Zoom In</button>
        <button onClick={() => handleZoom(-0.1)}>Zoom Out</button>
        <button onClick={() => handleRotation("y", -Math.PI / 18)}>Left</button>
        <button onClick={() => handleRotation("y", Math.PI / 18)}>Right</button>
        <button onClick={() => handleRotation("x", -Math.PI / 18)}>Up</button>
        <button onClick={() => handleRotation("x", Math.PI / 18)}>Down</button>
      </div> */}
      {/* )} */}
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

export default VRPropertyTour1;
