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

// Función para obtener las carreras
export const getCarreras = async () => {
    try {
        const snapshot = await db.collection('carreras').get();
        const carreras = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return carreras;
    } catch(error) {
        console.error('Error al obtener carreras: ', error);
        throw error;
    }
}