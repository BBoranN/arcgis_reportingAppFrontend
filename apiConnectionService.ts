import { User, userReport } from "./types";
import Graphic from "@arcgis/core/Graphic.js";
import Geometry from "@arcgis/core/geometry/Geometry.js";
import { inputPop } from "./inputPopupContent";
class ApiConnectionService {
    currentUserInfo: User;
    constructor(){

    }
    async authenticate(user : User): Promise<User|string> {
        try{
            const response = await fetch("https://localhost:7004/api/Authentication/Login",{
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "content-type": "application/json"
                  }
                }
            )
            const data = await response.json();
            let tempUser:User ={
                id: data.id,
                token: data.token,
                role: data.role
            }
            console.log(data.id);
            console.log(data.token);
            this.currentUserInfo=data;
            return tempUser;
        }catch(exception){
            console.log(exception);
            return "Not found";
        }
    }
    async getPreviousReports() : Promise<Graphic[]>{
        try{
            console.log("https://localhost:7004/api/Reports");
            const response = await fetch("https://localhost:7004/api/Reports",{
                method : "GET",
                headers: {
                    "content-type" : "application/json",
                    "Authorization" :"Bearer "+this.currentUserInfo.token,
                }
            });
            const data =await response.json() ;
            console.log(data[0]);
            let graphics:Graphic[] =[];
            for(let i=0; i< data.length; i++){
                var graphic = new Graphic({
                    geometry:{
                        type: "point",
                        latitude:data[i].y,
                        longitude: data[i].x,
                    },
                    attributes: {
                        id: data[i].id,
                        title: data[i].reportTitle,
                        details: data[i].reportDescription,
                        status: data[i].status
                    },
                    symbol:{
                        type: "simple-marker",
                        color:((data[i].status == "Pending") ? "red" : ((data[i].status =="Working On") ? "yellow" : (data[i].status =="Solved") ?  "green" :"blue")),
                        size:"30px"
                    },
                    popupTemplate:{
                        title:"{title}",
                        content:[{
                            type: "text",
                            text: "{details}"
                    }]
                    }
                });
                graphics.push(graphic);
            }
            return graphics;

        }catch(exception){
            console.log(exception);
            let temp: Report[] = [];
            return [];
        }
    }

    async postUserReport(report:userReport,token){
        try{
            const response= await fetch("https://localhost:7004/api/Reports",{
                method: "POST",
                body:JSON.stringify(report),
                headers: {
                    "content-type" : "application/json",
                    "Authorization" :"Bearer "+token,
                },
            });
            let data = await response.json();
            console.log(data);
        }
        catch(exception){
            console.log(exception);
            console.log(JSON.stringify(report));
        }
    }

    async changeReportStatus(report:userReport){
        try{
            const response = await fetch("https://localhost:7004/api/Reports/ChangeStatus",{
                method: "POST",
                body:JSON.stringify(report),
                headers: {
                    "content-type" : "application/json",
                    "Authorization" :"Bearer "+this.currentUserInfo.token,
                },
            });
            console.log(JSON.stringify(report));
            let data = await response.json();
            console.log(data);

        }catch(exception){
            console.log(exception);
        }
    }
}

var apiConnection = new ApiConnectionService();

export { apiConnection};
