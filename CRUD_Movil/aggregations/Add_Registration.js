import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Picker from '@react-native-picker/picker';

const Add_Registration = () => {
    const [carrera, setCarrera] = useState('');
    const [estudiante, setEstudiante] = useState('');
    const [curso, setCurso] = useState('');

    const handleConfirm = () => {
        // Aquí puedes manejar la lógica para confirmar la inscripción
        console.log('Carrera seleccionada:', carrera);
        console.log('Estudiante seleccionado:', estudiante);
        console.log('Curso seleccionado:', curso);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Carrera:</Text>


            <Text style={styles.label}>Estudiante:</Text>

            <Text style={styles.label}>Curso:</Text>

            <TouchableOpacity style = {styles.button} onPress={handleConfirm}>
                <Text style = {styles.buttonText} >Confirmar</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    buttons: {
        justifyContent: 'center',
        alignItems:'center'
    },
    button:{
        backgroundColor: '#4793AF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20, 
        borderRadius: 20
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Add_Registration;
