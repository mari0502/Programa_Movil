
/// Importaciones de librerias
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import db from '../database/Config' // Importacion de la base de datos
import { getDoc, doc, collection, getDocs, updateDoc } from 'firebase/firestore';

const Modify_Registration = () => {
    // Variables para manejar los dropdown
    const [openStudent, setOpenStudent] = useState(false);
    const [valueStudent, setValueStudent] = useState(null);
    const [students, setStudents] = useState([]);
    
    const [openCourse, setOpenCourse] = useState(false);
    const [valueCourse, setValueCourse] = useState(null);
    const [courses, setCourses] = useState([]);

    const [openCodMatricula, setOpenCodMatricula] = useState(false);
    const [valueCodMatricula, setValueCodMatricula] = useState(null);
    const [matriculas, setMatriculas] = useState([]);
    
     //Cargar los estudiantes si hay
    const fetchStudents = async () => {
        const data = [];
        
        const querySnapshot = await getDocs(collection(db, "estudiantes")); // Obtiene los estudiantes
        querySnapshot.forEach((doc) => { // Recorre los documentos
            data.push({
                label: doc.data().nombre +' '+ doc.data().primerApellido +' '+ doc.data().segundoApellido,
                value: doc.id,
            });
        });
        setStudents(data); // Guarda los datos
    };

    useEffect(() => {
        fetchStudents(); // Llama a la funcion
    }, [])


    //Cargar los cursos si hay
    const fetchCourses = async () => {
        const data = [];
        
        const querySnapshot = await getDocs(collection(db, "cursos")); // Obtiene los documentos de cursos
        querySnapshot.forEach((doc) => { // Recorre los documentos
            data.push({
                label: doc.data().nombre ,
                value: doc.id,
            });
        });
        
        setCourses(data); // Guarda los datos
    };
        
    useEffect(() => {
        fetchCourses(); // Llama a la funcion
    }, [])
    
    //Cargar las matriculas si hay
    useEffect(() => {
        const fetchMatriculas = async () => {
            const data = [];
            
            const querySnapshot = await getDocs(collection(db, "matriculas")); // Obtiene los documentos de matriculas
            querySnapshot.forEach((doc) => { // Recorre los documentos
                data.push({
                    label: doc.data().codMatricula ,
                    value: doc.id,
                });
            });
            setMatriculas(data); // Guarda los datos
        };
        
        fetchMatriculas(); // Llama a la funcion
    }, [])


    // Funcion para seleccionar según código de matricula
    useEffect(() => {
        const loadData = async () => {
            if(valueCodMatricula){ // Si la matricula se encuentra seleccionada
                const matriculaData = await getDoc(doc(db, 'matriculas', valueCodMatricula)); // Obtiene el documento de esa matricula
                if(matriculaData.exists()){ // Verifica que exista
                    const data = matriculaData.data(); // Toma los datos
                    
                    // Setea los datos (rellena)
                    setValueStudent(data.idEstudiante);
                    setValueCourse(data.idCurso)
                }else{
                    // Setea los datos si no se ha seleccionado una matricula
                    setValueStudent(null);
                    setValueCourse(null);
                }
            }
        };

        loadData(); // Llama a la funcion
    }, [valueCodMatricula]); // Se ejecuta si ha cambia el valor de codMatricula

    
    const handleModifyRegistration = async () => {
        try {
            if(valueCodMatricula){ // Verifica si hay codigo de matricula seleccionado
                await updateDoc(doc(db, 'matriculas', valueCodMatricula),{ // Actualiza los datos del código de matricula seleccionado
                    idEstudiante: valueStudent,
                    idCurso: valueCourse
                });

                //Mostrar mensaje de éxito
                Alert.alert('La matrícula se ha modificado con éxito');

                //Mensaje de la consola
                console.log("SE MODIFICÓ MaTRÍCULA");

                // Limpiar
                setValueStudent(null);
                setValueCourse(null);
                setValueCodMatricula(null);

                // Recargar
                fetchStudents();
                fetchCourses();
            }
        } catch (error) {
            console.log("ERROR", error); // Mensaje de error
        }
    };

    // Interfaz
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccione Matrícula</Text>

            <Text style={styles.label}>Código de matrícula:</Text>
            <DropDownPicker style={styles.dropDownContainer}
                open={openCodMatricula}
                value={valueCodMatricula}
                items={matriculas}
                setOpen={setOpenCodMatricula}
                setValue={setValueCodMatricula}
                setItems={setMatriculas}
            />
            
            <Text style={styles.label}>Estudiante:</Text>
            <DropDownPicker style={styles.dropDownContainer}
                open={openStudent}
                value={valueStudent}
                items={students}
                setOpen={setOpenStudent}
                setValue={setValueStudent}
                setItems={setStudents}
            />
 
            <Text style={styles.label}>Curso:</Text>
            <DropDownPicker style={styles.dropDownContainer}
                open={openCourse}
                value={valueCourse}
                items={courses}
                setOpen={setOpenCourse}
                setValue={setValueCourse}
                setItems={setCourses}
            />
            
            <View style= {styles.buttons}>
                <TouchableOpacity style = {styles.button} onPress={handleModifyRegistration}>
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
    },
    dropDownContainer: {
        marginBottom: 100
    }
});

export default Modify_Registration; // Exportacion de la funcion