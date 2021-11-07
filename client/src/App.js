import * as React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
import { Room, Star } from "@material-ui/icons";
import "./app.css";
import axios from "axios";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYnVidTgxNSIsImEiOiJja3ZvMHpleG01cGRzMnJva3p5bjV6NXR3In0._Yc8FW_e8rtuk77c0Yo4FA";

function App() {
  const [pins, setPins] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 22.8046,
    longitude: 86.2029,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/bubu815/ckvo3eh5k27b714mmiv987v5i"
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.latitude}
              longitude={p.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div>You are here</div>
              <Room
                style={{ fontSize: viewport.zoom * 5, color: "slateblue" }}
              ></Room>
            </Marker>
            {/* <Popup
              latitude={22.8115}
              longitude={86.1968}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
            >
              <div className="card">
                <label>Place:</label>
                <h4>Jubliee Park</h4>
                <label>Review:</label>
                <p className="desc">
                  This is a beautiful place to visit. It is located in the
                  middle of the city.
                </p>
                <label>Rating:</label>
                <div className="stars">
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                  <Star className="star" />
                </div>

                <label>Information:</label>
                <span className="username">
                  Created by <b>Bubu</b>
                </span>
                <span className="date">1 hour ago</span>
              </div>
            </Popup> */}
          </>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default App;
