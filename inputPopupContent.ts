
import Graphic from "@arcgis/core/Graphic";


export class inputPop extends HTMLDivElement{
    inputButton: HTMLButtonElement;
    inputTitle: HTMLInputElement;
    inputDetails: HTMLInputElement;
    constructor(){
        super();


        this.inputTitle= document.createElement("input");
        this.inputTitle.id="inputtitle";
        this.inputDetails = document.createElement("input");
        this.inputDetails.id="inputdetails";
        this.inputButton= document.createElement("button");
        this.inputButton.id="inputbutton";

        this.inputTitle.placeholder="Enter report title:";
        this.inputDetails.placeholder="Enter report description";
        this.inputButton.innerText="Submit";

        this.appendChild(this.inputTitle);
        this.appendChild(this.inputDetails);
        this.appendChild(this.inputButton);
        
        this.id="inputpopupcontent"
    }
}customElements.define("input-pop",inputPop,{extends:"div"});
