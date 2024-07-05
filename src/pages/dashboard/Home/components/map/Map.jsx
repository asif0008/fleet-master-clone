import React, { useEffect, useState } from "react";
import L from "leaflet";
import TruckIcon from "../../../../../assets/images/truck.png";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrucksAction } from "../../../../../redux/actions/truck.actions";
import TruckModal from "./TruckModal"; // Adjust the import path as needed

const truckIcon = new L.Icon({
  iconUrl: TruckIcon,
  iconSize: [45, 45],
});

const Map = () => {
  const [truckPosition, setTruckPosition] = useState(null);
  const [drawnLayer, setDrawnLayer] = useState(null);
  const [hasCrossedBoundary, setHasCrossedBoundary] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [truckName, setTruckName] = useState("");
  const dispatch = useDispatch();

  const { devicesData } = useSelector((state) => state.device);
  const { trucks } = useSelector((state) => state.truck);
  // RUN THIS WHEN USER DRAW A LINE
  // -------------------------------
  useEffect(() => {
    if (drawnLayer) {
      dispatch(getAllTrucksAction());
      setShowModal(true); 
    }
  }, [drawnLayer, dispatch]);
  // CHANGE THE POSITION OF SENSOR WHEN GET DATA FROM SOCKET
  // -------------------------------------------------------
  useEffect(() => {
    if (devicesData?.payload) {
      const latitude = devicesData?.payload?.gps?.latitude;
      const longitude = devicesData?.payload?.gps?.longitude;
      setTruckPosition([latitude, longitude]);
    }
  }, [devicesData]);
  // WHEN WE DRAW POLIGON HE CAN GETTHE VALUE OF LINE
  // -------------------------------------------------
  const _created = (e) => {
    const type = e.layerType;
    const layer = e.layer;

    setDrawnLayer(layer);
    setHasCrossedBoundary(false);

    if (type === "polygon" || type === "rectangle") {
      const bounds = layer.getBounds();
      const center = bounds.getCenter();
      setTruckPosition([center.lat, center.lng]);
    } else if (type === "circle") {
      const center = layer.getLatLng();
      setTruckPosition([center.lat, center.lng]);
    } else {
      setTruckPosition(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectTruck = (truck) => {
    console.log("Selected truck:", truck);
    setTruckName(truck.truckName);
    setShowModal(false);
    // Add your logic to handle the selected truck
  };

  return (
    <React.Fragment>
      <MapContainer
        center={[25.276987, 55.296249]}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_created}
            draw={{
              polygon: true,
              rectangle: false,
              circle: true,
              polyline: false,
              marker: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {truckPosition && (
          <Marker position={truckPosition} icon={truckIcon}>
            <Popup>
              {truckName} is here:{" "}
              <pre>{JSON.stringify(truckPosition, null, 2)}</pre>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <TruckModal
        show={showModal}
        handleClose={handleCloseModal}
        trucks={trucks || []}
        handleSelect={handleSelectTruck}
      />
    </React.Fragment>
  );
};

export default Map;
