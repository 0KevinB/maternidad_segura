export interface User{
    Cedula? : string;
    Nombre? : string;
    Apellido? : string;
    CorreoElectronico? : string;
    Contraseña?: string;
    Direccion? : string;
    Telefono? : string;
    Estado?: Boolean;
    RolID? : Number;
    createdAt?: Date ;
    updatedAt?: Date;
}