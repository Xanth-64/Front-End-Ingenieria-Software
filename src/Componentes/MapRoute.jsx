import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Loader, Alert, Icons } from "rsuite";

export const MapRoute = (props) => {
  const [userPosition, setUserPosition] = useState(props.userPosition);
  const [driverPosition, setDriverPosition] = useState(props.driverPosition);
  const [zoom, setZoom] = useState(10.5);
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const update = () => {
    setUserPosition(props.userPosition);
    setDriverPosition(props.driverPosition);
  };

  useEffect(update, [props.userPosition, props.driverPosition]);
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
          <Marker
            position={driverPosition}
            label={{
              text: "D",
              color: "#ffffff",
              fontsize: "20px",
              fontFamily: "Roboto",
            }}
            onClick={() => {
              Alert.info("Su Driver Está Aquí");
            }}
          ></Marker>
          <Marker
            position={userPosition}
            label={{
              text: "U",
              color: "#ffffff",
              fontsize: "20px",
              fontFamily: "Roboto",
            }}
            onClick={() => {
              Alert.info("Usted Está Aquí");
            }}
          ></Marker>
        </GoogleMap>
      ) : (
        <Loader speed="fast" center />
      )}
    </>
  );
};
