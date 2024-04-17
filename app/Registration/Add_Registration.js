// Importaciones de librerias
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import db from '../database/Config' // Importacion de la base de datos
import { getDoc, getDocs, collection, setDoc, doc, query, where } from 'firebase/firestore';


const Add_Registration = () => {
    // Variables para manejar los dropdown
    const [openStudent, setOpenStudent] = useState(false);
    const [openCourse, setOpenCourse] = useState(false);
    const [valueStudent, setValueStudent] = useState(null);
    const [valueCourse, setValueCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const[codMatricula, setCodMatricula] = useState('')

    
    //Cargar los estudiantes si hay
    useEffect(() => {
        const fetchStudents = async () => {
          const data = [];
    
          const querySnapshot = await getDocs(collection(db, "estudiantes")); // Obtiene los estudiantes
          querySnapshot.forEach((doc) => { // Recorre los documentos
            data.push({
              label: doc.data().nombre +' '+ doc.data().primerApellido +' '+ doc.data().segundoApellido,
              value: doc.data().carnet,
            });
          });
    
          setStudents(data); // Guarda los datos
        };
    
        fetchStudents(); // Llama a la funcion
      }, [])



    //Cargar los cursos si hay
    useEffect(() => {
        const fetchCourses = async () => {
          const data = [];
    
          const querySnapshot = await getDocs(collection(db, "cursos")); // Obtiene los documentos de cursos
          querySnapshot.forEach((doc) => { // Recorre los documentos
            data.push({
              label: doc.data().nombre ,
              value: doc.data().codigo,
            });
          });
    
          setCourses(data); // Guarda los datos
        };
    
        fetchCourses(); // Llama a la funcion
      }, [])


    // Función para agregar la matricula
    const handleConfirm = async () => {
        try {
            // Verificar si ya existe una matricula con el mismo codigo
            const matriculaDoc = doc(db, 'matriculas', codMatricula);
            const codMatriculaSnapshot = await getDoc(matriculaDoc);
            
            if (codMatriculaSnapshot.exists()) {
                // Si ya existe un estudiante con el mismo carnet, mostrar una alerta al usuario
                Alert.alert('Error', 'Ya existe una matrícula con ese código.');
                // Limpia el input
                setCodMatricula('')
                return;
            }
             
            // Verificar si ya existe una matrícula para este estudiante y curso
            const matriculaQuery = query(collection(db, 'matriculas'), where('idEstudiante', '==', valueStudent), where('idCurso', '==', valueCourse));
            const matriculaSnapshot = await getDocs(matriculaQuery);

            // Si ya existe una matrícula para este estudiante y curso, mostrar un mensaje y evitar agregar una nueva matrícula
            if (!matriculaSnapshot.empty) {
                Alert.alert('Error', 'El estudiante ya está matriculado en este curso');
                setValueStudent(null); //Setea el dropdown del estudiante
                return; // Salir de la función para evitar agregar una nueva matrícula
            }

            
            // Si el codigo es único y el estudiante no se encuentra en ese curso, procede a agregar
             await setDoc(matriculaDoc, {
                codMatricula: codMatricula,
                idEstudiante: valueStudent,
                idCurso: valueCourse
            });


            // Mensaje de consola
            console.log("Se Agregó MATRICULA");

            // Mensaje para el usuario
            Alert.alert('Matrícula agregada', 'La matrícula se ha registrado con éxito');

            // Limpiar variables
            setCodMatricula('');
            setValueStudent(null);
            setValueCourse(null);

        } catch (error) {
            console.log("ERROR", error); // Mensaje de error 
        }
    };
    
    // Intefaz
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Datos de Matrícula</Text>

            <Text style={styles.label}>Código de Matricula:</Text>
            <TextInput
                style={styles.input}
                value={codMatricula}
                onChangeText={setCodMatricula}
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
                <TouchableOpacity style = {styles.button} onPress={handleConfirm}>
                    <Text style = {styles.buttonText} >Confirmar</Text>
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
    label: {
        fontSize: 16, 
        marginBottom: 4
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
    },
    dropDownContainer: {
        marginBottom: 100
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20
    }
});

export default Add_Registration; // Exportacion de la pagina