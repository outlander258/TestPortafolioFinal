export interface Travel{
    id: number | undefined;
    solicitante_id : any;
    conductor_id : number | undefined;
    estado : string;
    fecha : string;
    tarifa : number;
    mensaje : string;
}