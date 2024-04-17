// Importacion de librerias
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import db from '../database/Config' // Importación de la base de datos
import { getDocs, collection } from 'firebase/firestore';

const Search_Course = () => {
    // Variables para manejar los datos
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [courses, setCourses] = useState([]);

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

    // Función para buscar los cursos 
    const handleSearch = (text) => {
        setSearchTerm(text); // Setea el texto de busqueda
        if (text === '') { // Si es vacío
            setSearchResults(courses); // Muestra todos los cursos
        } else { // Sino filtra los resultados
            const results = courses.filter(course => { //Filtra los resultados por nombre o codigo
                return (
                    course.nombre.toLowerCase().includes(text.toLowerCase()) ||
                    course.codigo.toLowerCase().includes(text.toLowerCase())
                );
            });
            setSearchResults(results); //Setea los resultados filtrados
        }
    };

    // Intefaz
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscar Curso</Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar por nombre o código"
                value={searchTerm}
                onChangeText={handleSearch}
            />

            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.resultItem}
                        onPress={() => console.log('Course selected:', item)}
                    >
                        <Text>{`${item.nombre}`}</Text>
                        <Text>{item.codigo}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
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

export default Search_Course; // Exportacion de la página