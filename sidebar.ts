
export class sidebar extends HTMLDivElement{
    text: HTMLTextAreaElement;
    constructor(){
        super();
        let text= document.createElement("p");
        this.appendChild(text);
        text.innerHTML="I hope this will work";
        this.id="sidebar";
    }
}customElements.define("side-bar",sidebar,{extends:"div"})