import React, { useState, useEffect } from "react";
import "aframe";
import "aframe-event-set-component";

// Wait for AFRAME to be available
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

const VRTour = ({ url }) => {
  const [currentScene, setCurrentScene] = useState("scene1");

  const navigateToScene = (targetSelector) => {
    const sceneId = targetSelector.replace("#", "");
    setCurrentScene(sceneId);
  };

  useEffect(() => {
    window.navigateToScene = navigateToScene;
    return () => {
      delete window.navigateToScene;
    };
  }, []);

  const scenes = {
    scene1: {
      skyUrl:
        "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg",
      hotspots: [
        { position: "0 0 -6", to: "#scene2", label: "Go to Living Room" },
      ],
    },
    scene2: {
      skyUrl:
        "https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg",
      hotspots: [
        { position: "5 0 0", to: "#scene3", label: "Go to Kitchen" },
        { position: "0 0 -9", to: "#scene1", label: "Back to Entrance" },
      ],
    },
    scene3: {
      skyUrl:
        "https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg",
      hotspots: [
        { position: "0 0 4", to: "#scene2", label: "Back to Living Room" },
      ],
    },
  };

  useEffect(() => {
    console.log("Current scene:", currentScene);
  }, [currentScene]);

  return (
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
              hotspot={`to: ${hotspot.to}; onNavigate: window.navigateToScene`}
              geometry="primitive: sphere; radius: 0.5"
              material="color: #00ff00; shader: flat"
              position={hotspot.position}
              event-set__mouseenter="_event: mouseenter; material.opacity: 0.5; scale: 1.2 1.2 1.2"
              event-set__mouseleave="_event: mouseleave; material.opacity: 1; scale: 1 1 1"
            >
              <a-text
                value={hotspot.label}
                align="center"
                position="0 0.6 0"
                scale="0.5 0.5 0.5"
              />
            </a-entity>
          ))}
        </a-entity>
      ))}

      <a-camera id="main-camera">
        <a-cursor color="#FFFFFF" />
      </a-camera>
    </a-scene>
  );
};

export default VRTour;
