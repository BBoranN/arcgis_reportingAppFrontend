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
import Expand from "@arcgis/core/widgets/Expand.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";
import { sidebar } from "./sidebar";

function createPopupContent(graphic : Graphic,layer){
    let form = document.createElement("form");
    let text = document.createElement("p");
    text.innerHTML= "Description: "+graphic.attributes.details+ "\nStatus: " +graphic.attributes.status;
    let workingOn= document.createElement("input");
    workingOn.type="radio";
    workingOn.value="Working On";
    workingOn.name="status";
    let label1 = document.createElement("label");
    label1.innerHTML=("Working On");

    let Irrelevant= document.createElement("input");
    Irrelevant.type="radio";
    Irrelevant.name="status";
    Irrelevant.value="Irrelevant";
    let label2 = document.createElement("label");
    label2.innerHTML=("Irrelevant Report");

    let solved= document.createElement("input");
    solved.type="radio";
    solved.name="status";
    solved.value="Solved";
    let label3 = document.createElement("label");
    label3.innerHTML=("Solved");

    let statusButton = document.createElement("button");
    statusButton.innerHTML="Submit Status Changes";

    form.appendChild(text);
    form.appendChild(workingOn);
    form.appendChild(label1);
    form.appendChild(Irrelevant);
    form.appendChild(label2);
    form.appendChild(solved);
    form.appendChild(label3);
    form.appendChild(statusButton);
    
    

    statusButton.addEventListener('click',async (e)=>{
        e.preventDefault();
        if(workingOn.checked == true){
            console.log("Working On");
            graphic.attributes.status= "Working On";
            await apiConnection.changeReportStatus({id:graphic.attributes.id,status:graphic.attributes.status});
        }
        else if(Irrelevant.checked ==true){
            console.log("Irrelevant Report");
            graphic.attributes.status= "Irrelevant";
            await apiConnection.changeReportStatus({id:graphic.attributes.id,status:graphic.attributes.status});
        }
        else if(solved.checked ==true){
            console.log("Irrelevant Report");
            graphic.attributes.status= "Solved";
            await apiConnection.changeReportStatus({id:graphic.attributes.id,status:graphic.attributes.status});
        }
        var colorx = new Color((graphic.attributes.status == "Pending") ? "red" : (graphic.attributes.status =="Working On") ? "yellow" : 
        (graphic.attributes.status =="Solved") ?  "green" :"blue");
        layer.remove(graphic);
        graphic.symbol.color= colorx;
        layer.add(graphic);
        
    });

    return form;
}

function changeColor(graphic: Graphic){
    var colorx = new Color((graphic.attributes.status == "Pending") ? "red" : (graphic.attributes.status =="Working On") ? "yellow" : 
        (graphic.attributes.status =="Solved") ?  "green" :"blue");
        graphic.symbol.color= colorx;
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
            container: "viewDiv" // Div element
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
    let layerListExpand = new Expand({
        expandIcon: "layers",  // see https://developers.arcgis.com/calcite-design-system/icons/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: view,
        content: new sidebar()
    });
    view.ui.add(layerListExpand, "top-left");
    
} 