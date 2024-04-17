
// Importacion de librerias
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import db from '../database/Config'
import { getDoc, doc, collection, getDocs, updateDoc } from 'firebase/firestore';

const Modify_Student = () => {
    // Variables para almacenar datos
    const [nombre, setNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');

    // Variables para manejar los dropdown
    const [openStudent, setOpenStudent] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([]);

    
    //Cargar los estudiantes si hay
    useEffect(() => {
        const fetchStudents = async () => {
            const data = [];
            
            const querySnapshot = await getDocs(collection(db, "estudiantes")); // Obtiene todos los estudiantes
            querySnapshot.forEach((doc) => { // Recorre los documentos
                data.push({
                    label: doc.data().carnet,
                    value: doc.id,
                });
            });

            setStudents(data); // Guarda los datos
        };
        
        fetchStudents(); // Llama a la función
    }, [])
    

    // Funcion para llenar los datos del estudiante
    useEffect(() => {
        const loadStudentData = async () => {
            if(selectedStudent){ // Si hay un estudiante seleccionado
                const studentData = await getDoc(doc(db, 'estudiantes', selectedStudent)); // Obtiene al estudiante seleccionado
                if(studentData.exists()){ // Si existe el estudiante
                    const data = studentData.data();
                    
                    // Setea los datos del estudiante
                    setNombre(data.nombre);
                    setPrimerApellido(data.primerApellido);
                    setSegundoApellido(data.segundoApellido);
                }else{
                    setNombre('');
                    setPrimerApellido('');
                    setSegundoApellido('');
                }
            }
        };

        loadStudentData(); // Llama a la función
    }, [selectedStudent]); // Se ejecuta dependiendo del estudiante seleccionado

    // Funcion para modificar al estudiante
    const handleModifyStudent = async () => {
        try {
            if(selectedStudent){ // Si hay un estudiante seleccionado
                await updateDoc(doc(db, 'estudiantes', selectedStudent),{ // Actualiza los datos 
                    nombre: nombre,
                    primerApellido: primerApellido,
                    segundoApellido: segundoApellido
                });

                //Mostrar mensaje de éxito
                Alert.alert('El estudiante se ha modificado con éxito');

                //Mensaje de la consola
                console.log("SE MODIFICÓ ESTUDIANTE");

                // Limpia todo
                setSelectedStudent(null);
                setNombre('');
                setPrimerApellido('');
                setSegundoApellido('');
            }
        } catch (error) {
            console.log("ERROR", error); // Mensaje de error
        }
    };

    // Interfaz
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccione Estudiante</Text>

            <Text style={styles.label}>Carnet:</Text>
            <DropDownPicker style={styles.dropDownContainer}
                open={openStudent}
                value={selectedStudent}
                items={students}
                setOpen={setOpenStudent}
                setValue={setSelectedStudent}
                setItems={setStudents}
            />

            
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
            />
            
            <Text style={styles.label}>Primer Apellido:</Text>
            <TextInput
                style={styles.input}
                value={primerApellido}
                onChangeText={setPrimerApellido}
            />

            <Text style={styles.label}>Segundo Apellido:</Text>
            <TextInput
                style={styles.input}
                value={segundoApellido}
                onChangeText={setSegundoApellido}
            />
            
            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={handleModifyStudent}>
                    <Text style = {styles.buttonText} >Modificar</Text>
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
        backgroundColor: '#4793AF',
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

export default Modify_Student; // Exportacion de la funcion