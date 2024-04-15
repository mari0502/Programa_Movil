import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Main_Menu = () =>{
    const navigation = useNavigation();

    const handlePress = (action) => {
        switch(action){
            case 'add':
                navigation.navigate('Add_Menu');
                break;
            case 'consulte':
                navigation.navigate('Consulte_Menu');
                break;
            case 'modify':
                navigation.navigate('Modify_Menu');
                break;
            case 'delete':
                navigation.navigate('Delete_Menu');
                break;
            default:
                break;
        }
    }

    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>
                ¡Bienvenido/a!
            </Text>

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('add')}>
                    <Text style = {styles.buttonText} >Agregar</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('consulte')}>
                    <Text style = {styles.buttonText} >Consultar</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('modify')}>
                    <Text style = {styles.buttonText} >Modificar</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('delete')}>
                    <Text style = {styles.buttonText} >Eliminar</Text>
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

export default Main_Menu;