export type User ={
    id?: undefined;
    name?: string;
    password ?:string;
    token?:string;
    role?: string; 
}
export type userReport ={
    id?: number; 
    userId?: number;
    reportTitle?: string;
    reportDescription?:string;
    x?:number;
    y?:number;
    status?: string;
}