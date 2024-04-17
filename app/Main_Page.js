// Importaciones de librerias
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Main_Page = () =>{
    // Declaración e inicialización de la variable
    const navigation = useNavigation();

    // Funcion para navegar a los otros menús
    const handlePress = (action) => {
        switch(action){ // Dependiendo de la action se dirige a cierta pagina especifica
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

    // Interfaz
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

// Estilo de la interfaz
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

export default Main_Page; // Exportacion de la funcion