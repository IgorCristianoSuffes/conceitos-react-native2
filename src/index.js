import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";

import api from "../services/api";

export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Igor Cristiano Suffes'
        });

        setProjects([...projects, response.data]);

    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project} >{project.title}</Text>
                    )}
                />

                <TouchableOpacity 
                    activeOpacity={0.5} 
                    style={styles.button} 
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>

            </SafeAreaView>

            {/*<View style={styles.container}>
                {projects.map(project => (
                    <Text key={project.id} style={styles.project} >{project.title}</Text>
                ))}
            </View>*/}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        //justifyContent: 'center',
        //alignItems: 'center',
    },

    project: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    button: {
       backgroundColor: '#fff',
       margin: 20,
       height: 50,
       borderRadius: 4,
       justifyContent: 'center',
       alignItems: 'center',
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});