import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Add_Menu = () =>{
    const navigation = useNavigation();

    const handlePress = (action) => {
        switch(action){
            case 'addStudent':
                navigation.navigate('Add_Student');
                break;
            case 'modifyStudent':
                navigation.navigate('Modify_Student');
                break;
            case 'consulteStudent':
                navigation.navigate('Consulte_Student');
                break;
            case 'deleteStudent':
                navigation.navigate('Delete_Student');
                break;
        }
    }

    return(
        <View style = {styles.container}>

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('addStudent')}>
                    <Text style = {styles.buttonText} >Agregar Estudiante</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('modifyStudent')}>
                    <Text style = {styles.buttonText} >Modificar Estudiante</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('consulteStudent')}>
                    <Text style = {styles.buttonText} >Consultar Estudiante</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('deleteStudent')}>
                    <Text style = {styles.buttonText} >Eliminar Estudiante</Text>
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


export default Add_Menu;