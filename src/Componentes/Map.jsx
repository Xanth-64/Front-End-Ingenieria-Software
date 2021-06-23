import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Loader, Alert } from "rsuite";

const containerStyle = {
  width: "400px",
  height: "400px",
};

export const Map = ({ setCoords }) => {
  const [position, setPosition] = useState({
    lat: 10.487267000000001,
    lng: -66.80741499999999,
  });
  const [zoom, setZoom] = useState(19);
  const showError = (error) => {
    console.log(error);
    Alert.warning(
      "Es necesario para la aplicación tener su ubicación para poder completar el proceso de creación de cuenta",
      2000
    );
  };
  const displayLocation = (location) => {
    setPosition({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setCoords({
      enabled: true,
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPKEY,
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
  const onLoadMarker = (marker) => {};
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocation, showError, {
        enableHighAccuracy: true,
      });
    } else {
      Alert.warning("Lo lamentamos, su navegador no soporta esta función");
      setCoords({
        enable: false,
      });
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
        draggable={true}
        onLoad={onLoadMarker}
        onDragEnd={(mapEvent) => {
          setPosition({
            lat: mapEvent.latLng.lat(),
            lng: mapEvent.latLng.lng(),
          });
        }}
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
