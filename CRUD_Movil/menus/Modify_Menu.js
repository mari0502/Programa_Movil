import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Modify_Menu = () =>{

    const handlePress = (action) => {
        switch(action){
            case 'modifyStudent':
                //Do something
            case 'modifyCourse':
                //Do something
            case 'modifyRegistration':
                //Do something
        }
    }

    return(
        <View style = {styles.container}>

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('modifyStudent')}>
                    <Text style = {styles.buttonText} >Modificar Estudiante</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('modifyCourse')}>
                    <Text style = {styles.buttonText} >Modificar Curso</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('modifyRegistration')}>
                    <Text style = {styles.buttonText} >Modificar Matricula</Text>
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
        backgroundColor: '#DD5746',
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

export default Modify_Menu;