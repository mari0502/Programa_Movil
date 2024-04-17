
// Importaciones de librerias
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import db from '../database/Config' // Importación de la base de datos
import { getDoc, doc, collection, getDocs, updateDoc } from 'firebase/firestore';

const Modify_Course = () => {
    // Variables para gestionar los datos
    const [nombre, setNombre] = useState('');
    
    // Variables para manejar los dropdown
    const [openCourse, setOpenCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);

    
    //Cargar los cursos si hay
    useEffect(() => {
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

    
    const handleModifyCourse = async () => {
        try {
            if(selectedCourse){ // Si hay un curso seleccionado
                await updateDoc(doc(db, 'cursos', selectedCourse),{ // Actualiza los datos de curso
                    nombre: nombre
                });

                //Mostrar mensaje de éxito
                Alert.alert('El curso se ha modificado con éxito');

                //Mensaje de la consola
                console.log("SE MODIFICÓ CURSO");

                // Limpia los elementos
                setSelectedCourse(null);
                setNombre('');
            }
        } catch (error) {
            console.log("ERROR", error); // Mensaje de error
        }
    };

    // Intefaz
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
                <TouchableOpacity style = {styles.button} onPress={handleModifyCourse}>
                    <Text style = {styles.buttonText} >Modificar</Text>
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
    }
});

export default Modify_Course; // Exportación de la página