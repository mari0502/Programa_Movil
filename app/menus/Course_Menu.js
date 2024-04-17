import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Course_Menu = () =>{
    const navigation = useNavigation();

    const handlePress = (action) => {
        switch(action){
            case 'addCourse':
                navigation.navigate('Add_Course');
                break;
            case 'modifyCourse':
                navigation.navigate('Modify_Course');
                break;
            case 'registrationCourse':
                navigation.navigate('Search_Course');
                break;
            case 'deleteCourse':
                navigation.navigate('Delete_Course');
                break;
            default:
                break;
        }
    }

    return(
        <View style = {styles.container}>

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('addCourse')}>
                    <Text style = {styles.buttonText} >Agregar curso</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('modifyCourse')}>
                    <Text style = {styles.buttonText} >Modificar curso</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('registrationCourse')}>
                    <Text style = {styles.buttonText} >Consultar curso</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('deleteCourse')}>
                    <Text style = {styles.buttonText} >Eliminar curso</Text>
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

export default Course_Menu;