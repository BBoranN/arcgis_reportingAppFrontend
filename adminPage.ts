import { login } from "./login";
import MapView from "@arcgis/core/views/MapView.js";
import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import { User, userReport } from "./types";
import { apiConnection } from "./apiConnectionService";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js"
import PopupTemplate from "@arcgis/core/PopupTemplate.js";
import CustomContent from "@arcgis/core/popup/content/CustomContent";
import Graphic from "@arcgis/core/Graphic";
import Color from "@arcgis/core/Color.js";
import { sidebar } from "./sidebar";
import Popup from "@arcgis/core/widgets/Popup.js";
import { PopupContent } from "./PopupContent";

function createPopupContent(graphic : Graphic,layer:GraphicsLayer){

    let form = document.createElement("form");
    let text = document.createElement("p");
    text.innerHTML= "Description: "+graphic.attributes.details;
    text.id="text";

    let status = document.createElement("p");
    status.innerHTML= "Status: " +graphic.attributes.status;
    status.id="text";

    let statusButton = document.createElement("button");
    statusButton.innerHTML="Submit Status Changes";

    statusButton.id="statusB";
    let content= new PopupContent(graphic);
    form.appendChild(text);
    form.appendChild(status);
    form.appendChild(content);
    form.appendChild(statusButton);
    
    statusButton.addEventListener('click',async (e)=>{
        e.preventDefault();
        let radios = content.radioList;
        for(let radio of radios){
            if(radio.checked ==true){
                graphic.attributes.status= (radio).value;
            await apiConnection.changeReportStatus({id:graphic.attributes.id,status:graphic.attributes.status});
            }
        }
        var colorx = new Color((graphic.attributes.status == "Pending") ? "red" : (graphic.attributes.status =="Working On") ? "yellow" : 
        (graphic.attributes.status =="Solved") ?  "green" :"blue");
        graphic.symbol.color= colorx;
        layer.remove(graphic);
        layer.add(graphic);
        
    });
    

    return form;
}
export async function changePageAdmin(user :User){
    let viewDiv= document.getElementById("viewDiv");
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
            popup: new Popup({
                dockEnabled: true,
                dockOptions: {
                  buttonEnabled: false,
                  
                  breakpoint: false
                },
                visibleElements: {
                  closeButton: true
                }
            }),
            container: "viewDiv" // Div element
    });
      
    view.popup.set("dockOptions", {
        breakpoint: false,
        buttonEnabled: false,
        position:"top-right"
    });
    var graphicsLayer = new GraphicsLayer();  
    map.layers.add(graphicsLayer);  
    
    graphicsLayer.addMany(graphics);

    let formContent = new CustomContent({
        outFields: ["*"],
        creator: ( event) =>{
            return createPopupContent(event!.graphic,graphicsLayer);
        }
    });

    const template = new PopupTemplate({
        title: '{title}',
        content:[formContent]
    });
    
    for(let i=0; i< graphics.length;i++){
        graphics[i].popupTemplate=template;
    }
    let bar= new sidebar();
    view.ui.add(bar , "bottom-left");
    
   
    
} 