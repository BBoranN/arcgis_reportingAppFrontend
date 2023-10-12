
export class sidebar extends HTMLDivElement{
    text: HTMLElement;
    
    constructor(){
        super();
        this.text= document.createElement("p");
        this.appendChild(this.text);
        this.text.innerHTML="Reporting Map Statuses:";
        this.id="sidebar";

        this.appendChild(new reportSpan("pending"));
        this.appendChild(new reportInfo("pendinginfo","Report is pending for look"));
        this.appendChild(new reportSpan("irrelevant"));
        this.appendChild(new reportSpan("workingon"));
        this.appendChild(new reportSpan("solved"));
    }
}customElements.define("side-bar",sidebar,{extends:"div"})

class reportSpan extends HTMLSpanElement{
    constructor(name :string){
        super();
        this.className=name;
    }
}customElements.define("report-span",reportSpan,{extends:"span"})

class reportInfo extends HTMLParagraphElement{
    constructor(name:string,text:string){
        super();
        this.className=name;
        this.innerHTML=text;
    }
}customElements.define("report-info",reportInfo,{extends:"p"})