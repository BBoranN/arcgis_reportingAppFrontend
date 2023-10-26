import Graphic from "@arcgis/core/Graphic";
import { apiConnection } from "./apiConnectionService";
import Color from "@arcgis/core/Color";

export class PopupContent extends HTMLDivElement{
    radioList: HTMLInputElement[];
    constructor(graphic: Graphic){
        super();
        this.id="popup";

        let text = document.createElement("p");
        text.innerHTML="Change Status:";
        this.appendChild(text);
        text.id="changestatus";

        this.radioList = new Array<HTMLInputElement>();
        let workingOn= new radioButton("status","Working On");
        this.radioList.push(workingOn);
        this.appendChild(new RadioNLabel(workingOn,"Working On"));

        let Irrelevant= new radioButton("status","Irrelevant");
        this.radioList.push(Irrelevant);
        this.appendChild(new RadioNLabel(Irrelevant,"Irrelevant Report"));

        let solved= new radioButton("status","Solved");
        this.radioList.push(solved);
        this.appendChild(new RadioNLabel(solved,"Solved"));


        /* let statusButton = document.createElement("button");
        statusButton.innerHTML="Submit Status Changes";

        statusButton.id="statusB";
        this.appendChild(statusButton);
        statusButton.addEventListener('click',async (e)=>{
            e.preventDefault();
            let radios = this.radioList;
            for(let radio of radios){
                if(radio.checked ==true){
                    graphic.attributes.status= (radio).value;
                await apiConnection.changeReportStatus({id:graphic.attributes.id,status:graphic.attributes.status});
                }
            }
            var colorx = new Color((graphic.attributes.status == "Pending") ? "red" : (graphic.attributes.status =="Working On") ? "yellow" : 
            (graphic.attributes.status =="Solved") ?  "green" :"blue");
            graphic.symbol.color= colorx;
            
        }); */
        
    }

}customElements.define("popup-content",PopupContent,{extends:"div"});

export class radioButton extends HTMLInputElement{
    constructor(name:string,value:string){
        super();
        this.type="radio";
        this.value=value;
        this.name=name;
    }
}customElements.define("radio-button",radioButton,{extends:"input"});

class RadioNLabel extends HTMLDivElement{
    constructor(radio: radioButton, text:string){
        super();
        this.appendChild(radio);
        let label = document.createElement("label");
        label.innerHTML=text;
        this.appendChild(label);
    }
}customElements.define("radion-label",RadioNLabel,{extends:"div"});

