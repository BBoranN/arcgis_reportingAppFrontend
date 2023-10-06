import { login } from "./login";
import MapView from "@arcgis/core/views/MapView.js";
import esriConfig from "@arcgis/core/config.js";
import Map from "@arcgis/core/Map.js";
import { User, userReport } from "./types";
import { apiConnection } from "./apiConnectionService";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js"
import PopupTemplate from "@arcgis/core/PopupTemplate.js";
import CustomContent from "@arcgis/core/popup/content/CustomContent";


export async function changePageAdmin(user :User){
    let viewDiv= document.getElementById("viewDiv");
    var graphics = await apiConnection.getPreviousReports(user);
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
    
    for(let i=0; i< graphics.length;i++){
        let form = document.createElement("form");
        let text = document.createElement("p");
        text.innerHTML= "Description: "+graphics[i].attributes.details+ "\nStatus: " +graphics[i].attributes.status;
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

        let formContent = new CustomContent({
            outFields: ["*"],
            creator: ( event) =>{
                return form;
            }
        });
        const template = new PopupTemplate({
            title:graphics[i].attributes.title,
            content:[formContent]
        });
        graphics[i].popupTemplate=template;

        statusButton.addEventListener('click',async (e)=>{
            e.preventDefault();
            if(workingOn.checked == true){
                console.log("Working On");
                graphics[i].attributes.status= "Working On";
                await apiConnection.changeReportStatus({id:graphics[i].attributes.id,status:graphics[i].attributes.status},user.token);
            }
            else if(Irrelevant.checked ==true){
                console.log("Irrelevant Report");
                graphics[i].attributes.status= "Irrelevant";
                await apiConnection.changeReportStatus({id:graphics[i].attributes.id,status:graphics[i].attributes.status},user.token);
            }
            else if(solved.checked ==true){
                console.log("Irrelevant Report");
                graphics[i].attributes.status= "Solved";
                await apiConnection.changeReportStatus({id:graphics[i].attributes.id,status:graphics[i].attributes.status},user.token);
            }
            graphics[i].symbol= {
                type: "simple-marker",
                color:((graphics[i].attributes.status == "Pending") ? "red" : (graphics[i].attributes.status =="Working On") ? "yellow" : 
                (graphics[i].attributes.status =="Solved") ?  "green" :"blue"),
                size:"30px"
            }
        });
    }

    graphicsLayer.addMany(graphics);
} 