// Importaciones de librerias
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import db from '../database/Config' // Importación de la base de datos
import { getDoc, doc, collection, getDocs, deleteDoc } from 'firebase/firestore';

const Delete_Registration = () => {
    // Variables para almacenar los datos
    const [estudiante, setEstudiante] = useState('');
    const [curso, setCurso] = useState('');

    // Variables para manejar los dropdown
    const [openMatricula, setOpenMatricula] = useState(false);
    const [selectedMatricula, setSelectedMatricula] = useState(null);
    const [matriculas, setMatriculas] = useState([]);

    //Cargar las matriculas si hay
    const fetchMatriculas = async () => {
        const data = [];
            
        const querySnapshot = await getDocs(collection(db, "matriculas")); // Obtiene los documentos de matriculas
            querySnapshot.forEach((doc) => { // Recorre los documentos
            data.push({
                label: doc.data().codMatricula ,
                value: doc.id,
            });
        });
        setMatriculas(data); // Guarda los datos
    };

    useEffect(() => {
        fetchMatriculas(); // Llama a la funcion
    }, [])

    // Cargar los datos de la matricula
    useEffect(() => {
        const loadData = async () => {
            if(selectedMatricula){ 
                try {
                    const matriculaRef = doc(db, 'matriculas', selectedMatricula);
                    const matriculaSnapshot = await getDoc(matriculaRef);
                    if(matriculaSnapshot.exists()){
                        const data = matriculaSnapshot.data();
                        
                        // Obtener nombre completo del estudiante
                        const estudianteRef = doc(db, 'estudiantes', data.idEstudiante);
                        const estudianteSnapshot = await getDoc(estudianteRef);
                        const estudianteData = estudianteSnapshot.data();
                        const nombreEstudiante = estudianteData ? `${estudianteData.nombre} ${estudianteData.primerApellido} ${estudianteData.segundoApellido}` : '';
                        
                        // Obtener nombre del curso
                        const cursoRef = doc(db, 'cursos', data.idCurso);
                        const cursoSnapshot = await getDoc(cursoRef);
                        const cursoData = cursoSnapshot.data();
                        const nombreCurso = cursoData ? cursoData.nombre : '';
                        
                        setEstudiante(nombreEstudiante);
                        setCurso(nombreCurso);
                    } else {
                        // Matrícula no encontrada
                        setEstudiante('');
                        setCurso('');
                    }
                } catch (error) {
                    console.error("Error al cargar los datos de la matrícula:", error);
                }
            }
        };
            
        loadData(); // Llama a la función
    }, [selectedMatricula]); // Se ejecuta si se selecciona un curso




    
    // Función para eliminar curso
    const handleDeleteRegistration = async () => {
        try {
            if(selectedMatricula){ // Si hay una matricula seleccionada
                // Mostrar confirmación
                Alert.alert(
                    'Eliminar matrícula',
                    '¿Estás seguro de que deseas eliminar esta matrícula?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel'
                        },
                        {
                            text: 'Eliminar',
                            onPress: async () => {
                                // Eliminar el curso
                                await deleteDoc(doc(db, 'matriculas', selectedMatricula)); // Elimina la matricula en la base de datos

                                // Mostrar mensaje de éxito
                                Alert.alert('La matrícula se ha eliminado con éxito');

                                // Mensaje de consola
                                console.log("SE ELIMINO MATRICULA");

                                // Recargar matriculas
                                fetchMatriculas();
                                
                                // Limpiar los campos
                                setSelectedMatricula(null);
                                setCurso('')
                                setEstudiante('')
                            },
                            style: 'destructive'
                        }
                    ]
                );
            }
        } catch (error) {
            console.log("ERROR", error); // Muestra mensaje de error
        }
    };

    // Interfaz
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccione Matrícula</Text>

            <Text style={styles.label}>Código de Matrícula:</Text>
            <DropDownPicker style={styles.dropDownContainer}
                open={openMatricula}
                value={selectedMatricula}
                items={matriculas}
                setOpen={setOpenMatricula}
                setValue={setSelectedMatricula}
                setItems={setMatriculas}
            />

            
            <Text style={styles.label}>Estudiante:</Text>
            <TextInput
                style={styles.input}
                value={estudiante}
                onChangeText={setEstudiante}
                editable={false}
            />

            <Text style={styles.label}>Curso:</Text>
            <TextInput
                style={styles.input}
                value={curso}
                onChangeText={setCurso}
                editable={false}
            />
                        
            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={handleDeleteRegistration}>
                    <Text style = {styles.buttonText} >Eliminar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

// Estilo de la interfaz
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    buttons: {
        justifyContent: 'center',
        alignItems:'center', 
        marginTop: 20
    },
    button:{
        backgroundColor: '#4793AF',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20, 
        borderRadius: 20
    },
    buttonText: {
        alignContent: 'center',
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    dropDownContainer: {
        marginBottom: 100
    }
});

export default Delete_Registration; // Exportacion de la funcion