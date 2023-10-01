
import CustomContent from "@arcgis/core/popup/content/CustomContent.js";

let xputPop= document.createElement("div");
let inputTitle= document.createElement("input");
let inputDetails = document.createElement("input");
let button= document.createElement("button");

inputTitle.placeholder="Enter report title:";
inputDetails.placeholder="Enter report descriptiop";
button.innerText="Submit";

xputPop.appendChild(inputTitle);
xputPop.appendChild(inputDetails);
xputPop.appendChild(button);

button.addEventListener("click",()=>{
    console.log(inputTitle.value);
    console.log(inputDetails.value);
})


let inputPop = new CustomContent({
    creator: ( event) =>{
        return xputPop;
    }
})
export {inputPop,xputPop};