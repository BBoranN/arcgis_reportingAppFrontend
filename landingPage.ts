import { login } from "./login";
import MapView from "@arcgis/core/views/MapView.js";
import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import { User } from "./types";
import { apiConnection } from "./apiConnectionService";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js"
import Graphic from "@arcgis/core/Graphic.js";
import PopupTemplate from "@arcgis/core/PopupTemplate.js";
import Popup from "@arcgis/core/widgets/Popup.js";
import { inputPop, inputDetails, inputTitle,button} from "./inputPopupContent";
import Geometry from "@arcgis/core/geometry/Geometry";

let viewDiv= document.getElementById("viewDiv");
viewDiv!.appendChild(login);

//document.body.appendChild(login);

export async function changePage(user :User){
    
    var graphics = await apiConnection.getPreviousReports(user);
    
    viewDiv!.removeChild(login);
    esriConfig.apiKey = "AAPK52342f431d2440c7ae7bf9b7de0d0b86R9JtgalY2YgKIDa8rsG4uO6Z3HzLNLpUPoXFeSjk0VX5QNWh5DFZGx-hNGZRMLBH";
    const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
        });

    const view = new MapView({
            map: map,
            center: [30, 40], // Longitude, latitude
            zoom: 13, // Zoom level
            container: "viewDiv" // Div element
    });
      
    var graphicsLayer = new GraphicsLayer();  
    map.layers.add(graphicsLayer);  
    graphicsLayer.addMany(graphics);


    var temp = document.createElement("div");
    var button = document.createElement("button");
    button.innerHTML="Add report";
    temp.appendChild(button);
    view.ui.add(temp,"top-right");

    var edit=false;

    button.addEventListener("click",()=>{
        edit=true;
       
    })
    var input1 = document.createElement("div");

    view.on("click",function(event){
        if(edit){
            const clickedPoint = view.toMap(event);
            console.log(event)
            var graphic = new Graphic({
                geometry:{
                    type: "point",
                    latitude:clickedPoint.latitude,
                    longitude: clickedPoint.longitude,
                },
                attributes: {
                    title: "",
                    details: "",
                },
                symbol:{
                    type: "simple-marker",
                    color: "red",
                    size:"30px"
                },
                popupTemplate:{
                    content:[inputPop]
                }
            });
            graphicsLayer.add(graphic);
            button.addEventListener("click",f=>{
                graphic.attributes ={
                    title: inputTitle,
                    details: inputDetails
                }
                graphic.popupTemplate= new PopupTemplate({
                    title:"{title}",
                    content:[{
                        type: "text",
                        text: "{details}"
                }]
                });
                    
            })
            edit=false;
        }
    })
    
}


