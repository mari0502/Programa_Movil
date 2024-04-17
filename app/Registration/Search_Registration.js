// Importaciones de librerias
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import db from '../database/Config' // Importacion de la base de datos
import { getDocs, collection } from 'firebase/firestore';

const Search_Registration = () => {
    // Variables para manejar los datos
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [matriculas, setMatriculas] = useState([]);

    //Cargar los estudiantes si hay
    useEffect(() => {
        const fetchStudents = async () => {
            const data = [];

            const querySnapshot = await getDocs(collection(db, "estudiantes")); // Obtener todos los estudiantes
            querySnapshot.forEach((doc) => { // Recorrer cada uno de los estudiantes
                data.push({
                    id: doc.id,
                    nombre: doc.data().nombre,
                    primerApellido: doc.data().primerApellido,
                    segundoApellido: doc.data().segundoApellido,
                    carnet: doc.data().carnet,
                });
            });

            setStudents(data);
        };

        fetchStudents();  // Llmada a la función
    }, []);

    //Cargar los cursos si hay
    useEffect(() => {
        const fetchCourses = async () => {
            const data = [];
            
            const querySnapshot = await getDocs(collection(db, "cursos")); // Obtener todos los cursos
            querySnapshot.forEach((doc) => { // Recorrer cada uno de los cursos
                data.push({
                    id: doc.id,
                    nombre: doc.data().nombre,
                    codigo: doc.data().codigo
                });
            });
    
            setCourses(data); // Guardar los cursos en una variable
        };
    
        fetchCourses(); // Llmada a la función
    }, []);


    //Cargar las matriculas si hay
    useEffect(() => {
        const fetchMatriculas = async () => {
            const data = [];
            
            const querySnapshot = await getDocs(collection(db, "matriculas")); // Obtiene los documentos de matriculas
            querySnapshot.forEach((doc) => { // Recorre los documentos
                data.push({
                    id: doc.id ,
                    idEstudiante: doc.data().idEstudiante,
                    idCurso: doc.data().idCurso,
                    codMatricula: doc.data().codMatricula
                });
            });

            setMatriculas(data); // Guarda los datos
        };
            
        fetchMatriculas(); // Llama a la funcion
    }, [])


    // Función para buscar por código de matrícula, código de curso o carnet
    const handleSearch = (text) => {
        setSearchTerm(text); // Setea el texto buscado

        if (text === '') { // Si el texto está vacío, retorna todos los datos
            setSearchResults(matriculas.map(matricula => ({ // Mapea los datos que se desean mostrar y lo almacena en searchResult
                codigoMatricula: matricula.codMatricula,
                nombreCompletoEstudiante: getFullName(matricula.idEstudiante),
                carnetEstudiante: matricula.idEstudiante,
                codigoCurso: matricula.idCurso,
                nombreCurso: getCourseName(matricula.idCurso)
            })));
        } else {
            const results = matriculas.filter(matricula => ( // Filtra los datos de la matrícula
                matricula.codMatricula.toLowerCase().includes(text.toLowerCase()) ||
                matricula.idCurso.toLowerCase().includes(text.toLowerCase()) ||
                matricula.idEstudiante.includes(text)
            )).map(matricula => ({ // Mapea los datos a mostrar 
                codigoMatricula: matricula.codMatricula,
                nombreCompletoEstudiante: getFullName(matricula.idEstudiante),
                carnetEstudiante: matricula.idEstudiante,
                codigoCurso: matricula.idCurso,
                nombreCurso: getCourseName(matricula.idCurso)
            }));

            setSearchResults(results); // Setea el resultado filtrado
        }
    };
    
    // Función para obtener el nombre completo del estudiante
    const getFullName = (idEstudiante) => {
        const student = students.find(student => student.id === idEstudiante); // Busca el estudiante por id de los obtenidos en la base de datos
        if (student) {
            return `${student.nombre} ${student.primerApellido} ${student.segundoApellido}`; // Retorna nombre completo
        }
        return ''; // Si no, vacío
    };
        
    // Función para obtener el nombre del curso
    const getCourseName = (idCurso) => {
        const course = courses.find(course => course.id === idCurso); // Busca el curso de los obtenidos en la base de datos
        if (course) {
            return course.nombre; // Retorna el nombre del curso
        }
        return ''; // Si no lo encuentra, retorna vacío
    };
    
    // Interfaz
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscar Matrícula</Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar por cod.Matrícula, cod.Curso o carnet"
                value={searchTerm}
                onChangeText={handleSearch}
            />

            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                
                <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => console.log('Matricula selected:', item)}
                >
            
                <Text>{`Código de Matrícula: ${item.codigoMatricula}`}</Text>
                <Text>{`Estudiante: ${item.nombreCompletoEstudiante}`}</Text>
                <Text>{`Carnet: ${item.carnetEstudiante}`}</Text>
                <Text>{`Código del Curso: ${item.codigoCurso}`}</Text>
                <Text>{`Curso: ${item.nombreCurso}`}</Text>
            </TouchableOpacity>
    )}
    keyExtractor={item => item.codigoMatricula}
/>

        </View>
    );
};

// Estilo de la interfaz
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 40
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    resultItem: {
        backgroundColor: '#BED7DC',
        padding: 10,
        borderRadius: 10,
        marginBottom: 8,
        fontSize: 16
    }
});

export default Search_Registration; // Exportacion de funcion