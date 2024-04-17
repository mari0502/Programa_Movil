// Importaciones de librerias
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import db from '../database/Config' // Importación de la base de datos
import { getDoc, doc, collection, getDocs, deleteDoc } from 'firebase/firestore';

const Delete_Course = () => {
    // Variables para almacenar los datos
    const [nombre, setNombre] = useState('');

    // Variables para manejar los dropdown
    const [openCourse, setOpenCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);

    // Función para cargar los cursos
    const fetchCourses = async () => {
        const data = [];
        
        const querySnapshot = await getDocs(collection(db, "cursos")); // Obtiene los cursos de la base de datos
        querySnapshot.forEach((doc) => { // Recorre cada documento
            data.push({
                label: doc.data().codigo, 
                value: doc.id,
            });
        });
        
        setCourses(data); // Guarda los datos
    };
    
    useEffect(() => {        
        fetchCourses(); // Llama a los función
    }, [])
    
    // Cargar el nombre del curso seleccionado
    useEffect(() => {
        const loadCourseData = async () => {
            if(selectedCourse){ //Si hay un curso seleccionado
                const courseData = await getDoc(doc(db, 'cursos', selectedCourse)); // Busca el curso seleccionado en la base de datos
                if(courseData.exists()){
                    const data = courseData.data(); // Datos del curso seleccionado
                    setNombre(data.nombre); // Setea el input de nombre
                }else{
                    setNombre('');
                }
            }
        };
    
        loadCourseData(); // Llama a la función
    }, [selectedCourse]); // Se ejecuta si se selecciona un curso
    
    // Función para eliminar curso
    const handleDeleteCourse = async () => {
        try {
            if(selectedCourse){ // Si hay un curso seleccionado
                // Mostrar confirmación
                Alert.alert(
                    'Eliminar curso',
                    '¿Estás seguro de que deseas eliminar este curso?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel'
                        },
                        {
                            text: 'Eliminar',
                            onPress: async () => {
                                // Eliminar el curso
                                await deleteDoc(doc(db, 'cursos', selectedCourse));

                                // Mostrar mensaje de éxito
                                Alert.alert('El curso se ha eliminado con éxito');

                                fetchCourses(); // Recargar cursos
                                
                                // Limpiar los campos
                                setSelectedCourse(null)
                                setNombre('');
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
            <Text style={styles.title}>Seleccione Curso</Text>

            <Text style={styles.label}>Código:</Text>
            <DropDownPicker style={styles.dropDownContainer}
                open={openCourse}
                value={selectedCourse}
                items={courses}
                setOpen={setOpenCourse}
                setValue={setSelectedCourse}
                setItems={setCourses}
            />

            
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />
                        
            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={handleDeleteCourse}>
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

export default Delete_Course; // Exportacion de la funcion