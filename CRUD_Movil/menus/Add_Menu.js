import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { agregar } from '../database/Functions'

const Add_Menu = () =>{

    const handlePress = (action) => {
        switch(action){
            case 'addStudent':
                //Do something
            case 'addCourse':
                //Do something
            case 'modify':
                //Do something
            case 'delete':
                //Do something
        }
    }

    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>
                ¡Bienvenido/a!
            </Text>

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('addStudent')}>
                    <Text style = {styles.buttonText} >Agregar Estudiante</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('addCourse')}>
                    <Text style = {styles.buttonText} >Agregar Curso</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('modify')}>
                    <Text style = {styles.buttonText} >Matricular Estudiante</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20
    },
    buttons: {
        justifyContent: 'center',
        alignItems:'center', 
        marginTop: 20
    },
    button:{
        backgroundColor: '#E178C5',
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

/*
                const dataStudent ={
                    nombre: 'Juan',
                    primerApellido: 'Mora',
                    segundoApellido: 'Pérez',
                    carnet: '2021104035',
                    carrera: 'Ingeniería',
                    cursosMatriculados: ['Base de Datos']
                }

                agregar('estudiantes', dataStudent);
*/

export default Add_Menu;