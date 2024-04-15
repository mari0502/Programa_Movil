import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Consulte_Menu = () =>{

    const handlePress = (action) => {
        switch(action){
            case 'consulteStudent':
                //Do something
            case 'consulteCourse':
                //Do something
            case 'consulteRegistration':
                //Do something
        }
    }

    return(
        <View style = {styles.container}>

            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={() => handlePress('consulteStudent')}>
                    <Text style = {styles.buttonText} >Consultar un estudiante</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('consulteCourse')}>
                    <Text style = {styles.buttonText} >Consultar un curso</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={() => handlePress('consulteRegistration')}>
                    <Text style = {styles.buttonText} >Consultar Matricula</Text>
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

export default Consulte_Menu;