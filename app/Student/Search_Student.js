import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import db from '../database/Config'
import { getDocs, collection } from 'firebase/firestore';

const Search_Student = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [students, setStudents] = useState([]);

    //Cargar los estudiantes si hay
    useEffect(() => {
        const fetchStudents = async () => {
            const data = [];

            const querySnapshot = await getDocs(collection(db, "estudiantes"));
            querySnapshot.forEach((doc) => {
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

        fetchStudents();
    }, []);

    const handleSearch = (text) => {
        setSearchTerm(text);
        if (text === '') {
            setSearchResults(students);
        } else {
            const results = students.filter(student => {
                return (
                    student.nombre.toLowerCase().includes(text.toLowerCase()) ||
                    student.primerApellido.toLowerCase().includes(text.toLowerCase()) ||
                    student.segundoApellido.toLowerCase().includes(text.toLowerCase()) ||
                    student.carnet.includes(text)
                );
            });
            setSearchResults(results);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buscar Estudiante</Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar por nombre, apellido o carnet"
                value={searchTerm}
                onChangeText={handleSearch}
            />

            <FlatList
                data={searchResults}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.resultItem}
                        onPress={() => console.log('Student selected:', item)}
                    >
                        <Text>{`${item.nombre} ${item.primerApellido} ${item.segundoApellido}`}</Text>
                        <Text>{item.carnet}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

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

export default Search_Student;