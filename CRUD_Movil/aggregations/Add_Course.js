
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Add_Course = () => {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');

    const handleAddStudent = () => {
        // Aquí puedes manejar la lógica para agregar el estudiante

        console.log('NombreCurso:', nombre);
        console.log('Carrera:', carrera);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos del Curso</Text>
            
            <Text style={styles.label}>Carrera:</Text>
            <TextInput
                style={styles.input}
                value={carrera}
                onChangeText={setCarrera}
            />
                        
            <Text style={styles.label}>Nombre del Curso:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
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
        backgroundColor: '#DD5746',
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

export default Add_Course;