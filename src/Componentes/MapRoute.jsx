import {
  GoogleMap,
  useJsApiLoader,
  MarkerWithLabel,
} from "@react-google-maps/api";
import { useState } from "react";
import { Loader, Alert } from "rsuite";

export const MapRoute = (props) => {
  const [userPosition, setUserPosition] = useState(props.userPosition);
  const [driverPosition, setDriverPosition] = useState(props.driverPosition);
  const [zoom, setZoom] = useState(10);
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPKEY,
  });

  const onLoad = () => {};
  const onUnmount = () => {};
  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={driverPosition}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <MarkerWithLabel
            position={driverPosition}
            labelAnchor={new window.google.maps.Point(0, 0)}
            labelStyle={{
              backgroundColor: "#FAFAFA",
              fontSize: "32px",
              padding: "16px",
            }}
          >
            <div>Driver</div>
          </MarkerWithLabel>
          <MarkerWithLabel
            position={userPosition}
            labelAnchor={new window.google.maps.Point(0, 0)}
            labelStyle={{
              backgroundColor: "#FAFAFA",
              fontSize: "32px",
              padding: "16px",
            }}
          >
            <div>Driver</div>
          </MarkerWithLabel>
        </GoogleMap>
      ) : (
        <Loader speed="fast" center />
      )}
    </>
  );
};
