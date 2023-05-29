const validarCorreo=(correo)=>{
    return /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(correo.trim());

}
const validarPassword=(password)=>{
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/.test(password.trim()); 
}
const validarNombre=(nombre)=>{
    return /^([a-z ñáéíóú]{2,60})$/i.test(nombre.trim());
}