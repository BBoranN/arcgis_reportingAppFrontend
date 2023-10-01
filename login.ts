import { apiConnection } from "./apiConnectionService";
import { changePage} from "./landingPage";
import { User } from "./types";


class Login extends HTMLDivElement{
    constructor(){
        super();
        let userName=document.createElement("label");
        userName.innerHTML="User Name:";
        this.appendChild(userName);

        let userNameInput = document.createElement("input");
        userNameInput.placeholder="Enter Username";
        this.appendChild(userNameInput);

        let password= document.createElement("label");
        password.innerHTML = "Password";
        this.appendChild(password);

        let passwordInput = document.createElement("input");
        passwordInput.type="password";
        this.appendChild(passwordInput);

        let loginButton = document.createElement("button");
        loginButton.innerHTML= "Login";
        this.appendChild(loginButton);
        
        loginButton.addEventListener("click",()=>this.login({name:userNameInput.value,password :passwordInput.value}));

    }

    async login(user :User){
        let result= await apiConnection.authenticate(user);
        
        if(typeof(result)=="string")
            return ;
        
        changePage(result);
    }

}customElements.define("log-in",Login,{extends:"div"});

var login = new Login();

export {login};