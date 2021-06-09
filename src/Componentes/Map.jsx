import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Loader, Alert } from "rsuite";

const containerStyle = {
  width: "400px",
  height: "400px",
};

export const Map = () => {
  const [position, setPosition] = useState({
    lat: 10.4894445,
    lng: -66.860827,
  });
  const [zoom, setZoom] = useState(19);
  const showError = (error) => {
    console.log(error);
  };
  const displayLocation = (location) => {
    setPosition({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    console.log({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBbYhPXeFHWiysO_TWyFKc92Tioay5hxmY",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const onLoadMarker = (marker) => {
    console.log("marker: ", marker);
  };
  useEffect(() => {
    Alert.info(
      "Esta aplicación solicitará su localización, la cual es necesaria para completar el proceso de creación de cuenta",
      10000
    );
    if (navigator.geolocation) {
      console.log("GEOLOCATION :D");
      navigator.geolocation.getCurrentPosition(displayLocation, showError, {
        enableHighAccuracy: true,
      });
    } else {
      console.log(":c");
      Alert.warning("Lo lamentamos, su navegador no soporta esta función");
    }
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={position}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        onLoad={onLoadMarker}
        onClick={() => {
          Alert.success("Usted está aquí");
        }}
        position={position}
      ></Marker>
    </GoogleMap>
  ) : (
    <Loader></Loader>
  );
};
