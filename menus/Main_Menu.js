import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Main_Menu = () =>{
    const navigation = useNavigation();

    const handlePress = (action) => {
        switch(action){
            case 'student':
                navigation.navigate('Student_Menu');
                break;
            case 'course':
                navigation.navigate('Course_Menu');
                break;
            case 'registration':
                navigation.navigate('Registration_Menu');
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
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('student')}>
                    <Text style = {styles.buttonText} >Estudiantes</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('course')}>
                    <Text style = {styles.buttonText} >Cursos</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('registration')}>
                    <Text style = {styles.buttonText} >Matrícula</Text>
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

export default Main_Menu;