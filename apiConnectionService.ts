import { User, userReport } from "./types";
import Graphic from "@arcgis/core/Graphic.js";
import Geometry from "@arcgis/core/geometry/Geometry.js";
class ApiConnectionService {
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
                token: data.token
            }
            console.log(data.id);
            console.log(data.token);
            return tempUser;
        }catch(exception){
            console.log(exception);
            return "Not found";
        }
    }
    async getPreviousReports(user: User) : Promise<Graphic[]>{
        try{
            console.log("https://localhost:7004/api/Reports/"+user.id);
            const response = await fetch("https://localhost:7004/api/Reports/"+user.id,{
                method : "GET",
                headers: {
                    "content-type" : "application/json",
                    "Authorization" :"Bearer "+user.token,
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
                        id: data[i].Id,
                        title: data[i].reportTitle,
                        details: data[i].reportDescription,
                    },
                    symbol:{
                        type: "simple-marker",
                        color: "red",
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
            const response= await fetch("https://localhost:7004/api/Reports/",{
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
}

var apiConnection = new ApiConnectionService();

export { apiConnection};
