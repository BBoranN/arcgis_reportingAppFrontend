import MapView from "@arcgis/core/views/MapView.js";
import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";

esriConfig.apiKey = "AAPK52342f431d2440c7ae7bf9b7de0d0b86R9JtgalY2YgKIDa8rsG4uO6Z3HzLNLpUPoXFeSjk0VX5QNWh5DFZGx-hNGZRMLBH";

//let viewDiv = document.createElement("div");


        const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
        });

        const view1 = new MapView({
            map: map,
            center: [30, 40], // Longitude, latitude
            zoom: 13, // Zoom level
            container: "viewDiv" // Div element
        });

        view1.on("click", (event)=>{
            view1.openPopup({
             location: event.mapPoint,
             title: "You clicked here",
             content: "This is a point of interest"
            });
          });



export {view1};

