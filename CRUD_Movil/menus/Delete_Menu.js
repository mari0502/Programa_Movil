import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Delete_Menu = () =>{

    const handlePress = (action) => {
        switch(action){
            case 'deleteStudent':
                //Do something
            case 'deleteCourse':
                //Do something
            case 'deleteRegistration':
                //Do something
        }
    }

    return(
        <View style = {styles.container}>

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('deleteStudent')}>
                    <Text style = {styles.buttonText} >Eliminar Estudiante</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('deleteCourse')}>
                    <Text style = {styles.buttonText} >Eliminar Curso</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('deleteRegistration')}>
                    <Text style = {styles.buttonText} >Eliminar Matricula</Text>
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

export default Delete_Menu;