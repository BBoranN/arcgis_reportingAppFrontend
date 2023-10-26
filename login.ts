import { apiConnection } from "./apiConnectionService";
import { changePageUser} from "./landingPage";
import { changePageAdmin } from "./adminPage";
import { User } from "./types";


class Login extends HTMLDivElement{
    constructor(){
        super();
        this.id="login";
        let namediv= document.createElement("div");
        this.appendChild(namediv);
        
        let userName=document.createElement("label");
        userName.innerHTML="User Name:";
        namediv.appendChild(userName);

        let userNameInput = document.createElement("input");
        userNameInput.id="usernameinput";
        userNameInput.placeholder="Enter Username";
        namediv.appendChild(userNameInput);

        let passwordDiv= document.createElement("div");
        passwordDiv.id="passworddiv";
        this.appendChild(passwordDiv);
        let password= document.createElement("label");
        password.innerHTML = "Password:";
        passwordDiv.appendChild(password);

        let passwordInput = document.createElement("input");
        passwordInput.placeholder="Enter Password";
        passwordInput.id="passwordinput";
        passwordInput.type="password";
        passwordDiv.appendChild(passwordInput);

        let loginButton = document.createElement("button");
        loginButton.innerHTML= "Login";
        loginButton.id="loginButton";
        this.appendChild(loginButton);
        
        loginButton.addEventListener("click",()=>this.login({name:userNameInput.value,password :passwordInput.value}));

    }

    async login(user :User){
        let result= await apiConnection.authenticate(user);
        
        if(typeof(result)=="string")
            return ;
        if(result.role==='roleVatandas')changePageUser(result);
        else if(result.role ==='admin')changePageAdmin(result);
    }

}customElements.define("log-in",Login,{extends:"div"});

var login = new Login();

login.id="login";
export {login};