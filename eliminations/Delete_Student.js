import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import db from '../database/Config'
import { getDoc, doc, collection, getDocs, deleteDoc } from 'firebase/firestore';

const Delete_Student = () => {
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
            
            const querySnapshot = await getDocs(collection(db, "estudiantes"));
            querySnapshot.forEach((doc) => {
                data.push({
                    label: doc.data().carnet,
                    value: doc.id,
                });
            });

            setStudents(data);
        };
        
        fetchStudents();
    }, [])
    

    useEffect(() => {
        const loadStudentData = async () => {
            if(selectedStudent){
                const studentData = await getDoc(doc(db, 'estudiantes', selectedStudent));
                if(studentData.exists()){
                    const data = studentData.data();
                    
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

        loadStudentData();
    }, [selectedStudent]);

    
    const handleDeleteStudent = async () => {
        try {
            if(selectedStudent){
                // Mostrar confirmación
                Alert.alert(
                    'Eliminar estudiante',
                    '¿Estás seguro de que deseas eliminar este estudiante?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel'
                        },
                        {
                            text: 'Eliminar',
                            /*onPress: async () => {
                                // Eliminar el estudiante
                                await deleteDoc(doc(db, 'estudiantes', selectedStudent));

                                // Mostrar mensaje de éxito
                                Alert.alert('El estudiante se ha eliminado con éxito');

                                // Limpiar los campos
                                setSelectedStudent(null);
                                setNombre('');
                                setPrimerApellido('');
                                setSegundoApellido('');
                            },*/
                            style: 'destructive'
                        }
                    ]
                );
            }
        } catch (error) {
            console.log("ERROR", error);
        }
    };

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
                <TouchableOpacity style = {styles.button} onPress={handleDeleteStudent}>
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

export default Delete_Student;
       