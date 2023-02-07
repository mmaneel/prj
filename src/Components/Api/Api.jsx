import { useMemo } from "react";
import "./Api.css"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import L from 'leaflet';

import React, { useRef, useEffect } from 'react';

const Api = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100vw' }} />;
};

export default Api;
