
// Importaciones de librerias
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import db from '../database/Config' // Importación de la base de datos
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Add_Course = () => {
    // Variables para los datos de cursos
    const [nombre, setNombre] = useState('');
    const [codigo, setCodigo] = useState('');

    // Función para agregar un curso
    const handleAddCourse = async () => {
        try {
            // Verificar si ya existe un curso con el mismo codigo
           const courseDoc = doc(db, 'cursos', codigo);
           const courseSnapshot = await getDoc(courseDoc);

           if (courseSnapshot.exists()) {
           // Si ya existe un curso con el mismo codigo, mostrar una alerta al usuario
           Alert.alert('Error', 'Ya existe un curso con ese código.');
           // Clean inputs
           setCodigo('')
           return;
           }

           // Si el codigo es único, agregar el curso a la base de datos
           await setDoc(courseDoc, {
               nombre: nombre,
               codigo: codigo
           });

           // Mensaje de consola
           console.log("SE AGREGÓ CURSO");
           
           // Mensaje para el usuario
           Alert.alert('Curso Agregado', 'El curso se ha agregado con éxito.');

           // Limpiar inputs
           setNombre('')
           setCodigo('')

       } catch (error) {
           console.log("ERROR", error); // Mensaje de consola por si hay algún error
       }
    };

    // Interfaz
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos del Curso</Text>
            
            <Text style={styles.label}>Código:</Text>
            <TextInput
                style={styles.input}
                value={codigo}
                onChangeText={setCodigo}
            />
                        
            <Text style={styles.label}>Nombre del Curso:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={handleAddCourse}>
                    <Text style = {styles.buttonText} >Confirmar</Text>
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

export default Add_Course; // Se exporta la función de agregar curso