
import CustomContent from "@arcgis/core/popup/content/CustomContent.js";

let xputPop= document.createElement("div");
let inputTitle= document.createElement("input");
let inputDetails = document.createElement("input");
let inputButton= document.createElement("button");

inputTitle.placeholder="Enter report title:";
inputDetails.placeholder="Enter report descriptiop";
inputButton.innerText="Submit";

xputPop.appendChild(inputTitle);
xputPop.appendChild(inputDetails);
xputPop.appendChild(inputButton);


let inputPop = new CustomContent({
    creator: ( event) =>{
        return xputPop;
    }
})
export {inputPop,inputButton,inputTitle,inputDetails};