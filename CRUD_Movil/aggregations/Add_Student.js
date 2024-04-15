
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { agregar, getCarreras } from '../database/Functions'

const Add_Student = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [carnet, setCarnet] = useState('');
    const [carrera, setCarrera] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const carreras = await getCarreras();
                setItems(carreras);
            } catch (error) {
                console.error("Error al obtener carreras:", error);
            }
        };

        fetchCarreras();
    }, []);
    

    const handleAddStudent = () => {



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
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos del Estudiante</Text>
            
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />
            
            <Text style={styles.label}>Apellido:</Text>
            <TextInput
                style={styles.input}
                value={apellido}
                onChangeText={setApellido}
            />
            
            <Text style={styles.label}>Carnet:</Text>
            <TextInput
                style={styles.input}
                value={carnet}
                onChangeText={setCarnet}
                keyboardType="numeric"
            />
            
            <Text style={styles.label}>Carrera:</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                onChangeValue={setCarrera}
            />


            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={handleAddStudent}>
                    <Text style = {styles.buttonText} >Confirmar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    buttons: {
        justifyContent: 'center',
        alignItems:'center', 
        marginTop: 20
    },
    button:{
        backgroundColor: '#DD5746',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20, 
        borderRadius: 20
    },
    buttonText: {
        alignContent: 'center',
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default Add_Student;
