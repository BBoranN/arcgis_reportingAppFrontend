import { login } from "./login";
import MapView from "@arcgis/core/views/MapView.js";
import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import { User, userReport } from "./types";
import { apiConnection } from "./apiConnectionService";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js"
import Graphic from "@arcgis/core/Graphic.js";
import PopupTemplate from "@arcgis/core/PopupTemplate.js";
import Popup from "@arcgis/core/widgets/Popup.js";
import Geometry from "@arcgis/core/geometry/Geometry";
import CustomContent from "@arcgis/core/popup/content/CustomContent";
import { sidebar } from "./sidebar";
import { inputPop } from "./inputPopupContent";



let viewDiv= document.getElementById("viewDiv");
viewDiv!.appendChild(login);

export async function changePageUser(user :User){
    
    var graphics = await apiConnection.getPreviousReports();
    console.log(user.role);
    viewDiv!.removeChild(login);
    esriConfig.apiKey = "AAPK52342f431d2440c7ae7bf9b7de0d0b86R9JtgalY2YgKIDa8rsG4uO6Z3HzLNLpUPoXFeSjk0VX5QNWh5DFZGx-hNGZRMLBH";
    const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
        });

    const view = new MapView({
            map: map,
            center: [30, 40], // Longitude, latitude
            zoom: 13, // Zoom level
            container: "viewDiv", // Div element
            popup: new Popup({
                dockEnabled: true,
                dockOptions: {
                  // Disables the dock button from the popup
                  buttonEnabled: false,
                  // Ignore the default sizes that trigger responsive docking
                  breakpoint: false
                },
                visibleElements: {
                  closeButton: true
                }
            }),
    });
    view.popup.set("dockOptions", {
        breakpoint: false,
        buttonEnabled: false,
        position:"top-left"
    });
      
    var graphicsLayer = new GraphicsLayer();  
    map.layers.add(graphicsLayer);  
    graphicsLayer.addMany(graphics);
    

    var temp = document.createElement("div");
    var button = document.createElement("button");
    button.innerHTML="Add report";
    button.id="reportaddinbutton";
    temp.appendChild(button);
    view.ui.add(temp,"top-right");

    var edit=false;

    button.addEventListener("click",()=>{
        edit=true;
       
    })
    var input1 = document.createElement("div");

    view.on("click",function(event){
        if(edit){
            
            let inputPopupContent = new inputPop();
            let customPop = new CustomContent({
                creator: ( event) =>{
                    return inputPopupContent;
                }
            })
            const clickedPoint = view.toMap(event);
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
                    content:[customPop]
                }
            });
            inputPopupContent.inputButton.addEventListener("click",async ()=>{
                graphic.attributes={title:(inputPopupContent.inputTitle.value),
                details:(inputPopupContent.inputDetails.value)};
                console.log(event.mapPoint.latitude,event.mapPoint.longitude);
                graphic.popupTemplate={
                    title:"{title}",
                    content:[{
                        type: "text",
                        text: "{details}"
                }]
                }
                apiConnection.postUserReport({userId:user.id,
                    reportTitle: graphic.attributes.title,reportDescription:graphic.attributes.details,
                    x:clickedPoint.longitude, y:clickedPoint.latitude },user.token);
                view.popup.visible=false;
            })
            
            graphicsLayer.add(graphic); 
            edit=false;
        }
    })
    let bar= new sidebar();
    view.ui.add(bar , "bottom-left");
}
