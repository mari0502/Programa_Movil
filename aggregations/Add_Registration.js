import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import db from '../database/Config'
import { addDoc, getDocs, collection } from 'firebase/firestore';


const Add_Registration = () => {
    // Variables para manejar los dropdown
    const [openStudent, setOpenStudent] = useState(false);
    const [openCourse, setOpenCourse] = useState(false);
    const [valueStudent, setValueStudent] = useState(null);
    const [valueCourse, setValueCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    //Cargar los estudiantes si hay
    useEffect(() => {
        const fetchStudents = async () => {
          const data = [];
    
          const querySnapshot = await getDocs(collection(db, "estudiantes"));
          querySnapshot.forEach((doc) => {
            data.push({
              label: doc.data().name +' '+ doc.data().firstLastName +' '+ doc.data().secondLastName,
              value: doc.data().carnet,
            });
          });
    
          setStudents(data);
        };
    
        fetchStudents();
      }, [])



    //Cargar los cursos si hay
    useEffect(() => {
        const fetchCourses = async () => {
          const data = [];
    
          const querySnapshot = await getDocs(collection(db, "cursos"));
          querySnapshot.forEach((doc) => {
            data.push({
              label: doc.data().name ,
              value: doc.data().code,
            });
          });
    
          setCourses(data);
        };
    
        fetchCourses();
      }, [])



    const handleConfirm = async () => {
        try {
            console.log("HOLAAAA");
            const collectionRef = collection(db, 'matriculas'); // Referencia a la colección 'carreras'
            await addDoc(collectionRef, { 
                idStudent: valueStudent,
                idCourse: valueCourse
            }); // Agregar un documento a la colección
            console.log("Se Agregó MATRICULA");
        } catch (error) {
            console.log("ERROR", error);
        }
    };
    

    return (
        <View style={styles.container}>
    
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
        backgroundColor: '#DD5746',
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
    }
});

export default Add_Registration;
