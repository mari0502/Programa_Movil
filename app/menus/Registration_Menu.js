// Importaciones de librerias
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Registration_Menu = () =>{
    // Declaración e inicialización de la variable
    const navigation = useNavigation();

    const handlePress = (action) => {
        switch(action){
            case 'addRegistration':
                navigation.navigate('Add_Registration');
                break;
            case 'modifyRegistration':
                navigation.navigate('Modify_Registration');
                break;
            case 'consulteRegistration':
                navigation.navigate('Search_Registration');
                break;
            case 'deleteRegistration':
                navigation.navigate('Delete_Registration');
                break;
            default:
                break;
        }
    }

    // Interfaz del menu
    return(
        <View style = {styles.container}>

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('addRegistration')}>
                    <Text style = {styles.buttonText} >Agregar Matrícula</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('modifyRegistration')}>
                    <Text style = {styles.buttonText} >Modificar Matrícula</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('consulteRegistration')}>
                    <Text style = {styles.buttonText} >Consultar Matricula</Text>
                </TouchableOpacity>

                
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('deleteRegistration')}>
                    <Text style = {styles.buttonText} >Eliminar Matricula</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

// Estilo del menu
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

export default Registration_Menu; // Exportacion de la funcion