import db from './Config'

//Funcion para agregar un documento a una colección
export const agregar = async (coleccion, datos) =>{
    try{
        await db.collection(coleccion).add(datos);
        console.log("Datos agregados correctamente");
    }catch(error){
        console.error('Error al agregar: ', error);
    }
}