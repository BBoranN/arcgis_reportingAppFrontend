export type User ={
    id?: string;
    name?: string;
    password ?:string;
    token?:string;
}
export type Report ={
    Id?: number; 
    ReporterId?: string;
    reportTitle: string;
    reportDescription:string;
    x?:number;
    y?:number;
}