
export class sidebar extends HTMLDivElement{
    text: HTMLElement;
    
    constructor(){
        super();
        this.text= document.createElement("p");
        this.appendChild(this.text);
        this.text.innerHTML="Reporting Map Statuses:";
        this.text.id="bartext";
        this.id="sidebar";

        
        this.appendChild(new colorInfo(new reportSpan("pending"),new reportInfo("pendinginfo","Report is pending:")));
        this.appendChild(new colorInfo(new reportSpan("irrelevant"),new reportInfo("irrelevantinfo","Report is irrelevant:")));
        this.appendChild(new colorInfo(new reportSpan("workingon"),new reportInfo("workingoninfo","Report is currently working on:")));
        this.appendChild(new colorInfo(new reportSpan("solved"),new reportInfo("solvedinfo","Report is solved:")));

    }

    createSpan(id: string) :HTMLSpanElement{
        const selm= document.createElement("span");
        selm.id=id;
        return selm;
    }
}customElements.define("side-bar",sidebar,{extends:"div"})



class reportSpan extends HTMLSpanElement{
    constructor(id :string){
        super();
        this.className="color";
        this.id=id;
    }
}customElements.define("report-span",reportSpan,{extends:"span"})


class reportInfo extends HTMLParagraphElement{
    constructor(name:string,text:string){
        super();
        this.innerHTML=text;
        this.id="colorCode";
    }
}customElements.define("report-info",reportInfo,{extends:"p"})

class colorInfo extends HTMLDivElement{
    constructor(dot:HTMLSpanElement,info: HTMLParagraphElement){
        super();
        this.appendChild(info);
        this.appendChild(dot);
        this.id="colorInfo";
    }
}customElements.define("color-info",colorInfo,{extends:"div"})