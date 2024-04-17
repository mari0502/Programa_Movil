
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import db from '../database/Config'
import { setDoc, getDoc, doc } from 'firebase/firestore';

const Add_Student = () => {
    const [nombre, setNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');
    const [carnet, setCarnet] = useState('');
   

    const handleAddStudent = async () => {
        try {
             // Verificar si ya existe un estudiante con el mismo carnet
            const studentDoc = doc(db, 'estudiantes', carnet);
            const studentSnapshot = await getDoc(studentDoc);

            if (studentSnapshot.exists()) {
            // Si ya existe un estudiante con el mismo carnet, mostrar una alerta al usuario
            Alert.alert('Error', 'Ya existe un estudiante con este carnet.');
            // Clean inputs
            setCarnet('')
            return;
            }

            // Si el carnet es único, agregar el estudiante a la base de datos
            await setDoc(studentDoc, {
                nombre: nombre,
                primerApellido: primerApellido,
                segundoApellido: segundoApellido,
                carnet: carnet
            });

            // Shoe message in console
            console.log("SE AGREGÓ ESTUDIANTE");
            
            // Show message for the user
            Alert.alert('Estudiante Agregado', 'El estudiante se ha agregado con éxito.');

            // Clean inputs
            setNombre('')
            setPrimerApellido('')
            setSegundoApellido('')
            setCarnet('')

        } catch (error) {
            console.log("ERROR", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos del Estudiante</Text>
            
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />
            
            <Text style={styles.label}>Primer Apellido:</Text>
            <TextInput
                style={styles.input}
                value={primerApellido}
                onChangeText={setPrimerApellido}
            />

            <Text style={styles.label}>Segundo Apellido:</Text>
            <TextInput
                style={styles.input}
                value={segundoApellido}
                onChangeText={setSegundoApellido}
            />
            
            <Text style={styles.label}>Carnet:</Text>
            <TextInput
                style={styles.input}
                value={carnet}
                onChangeText={setCarnet}
                keyboardType="numeric"
            />

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={handleAddStudent}>
                    <Text style = {styles.buttonText} >Confirmar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

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

export default Add_Student;