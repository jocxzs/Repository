import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-web'; 

const baseurl = "https://rickandmortyapi.com/api/character/"; 

const CharacterList = ({ navigation }) => {

    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextUrl, setNextUrl] = useState(baseurl); 
    const [isFetchingMore, setIsFetchingMore] = useState(false); 

    async function fetchCharacters() {
        if (!nextUrl) return; 

        if (characters.length === 0) {
            setIsLoading(true);
        } else {
            setIsFetchingMore(true);
        }

        try {
            const response = await fetch(nextUrl);
            const json = await response.json();

            setCharacters(prevCharacters => [...prevCharacters, ...json.results]);
            
            setNextUrl(json.info.next); 

        } catch (error) {
            console.error("Error fetching characters:", error);
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    }

    useEffect(() => {
        fetchCharacters();
    }, []);

    const handleLoadMore = () => {
        if (!isFetchingMore && nextUrl) {
            fetchCharacters();
        }
    };

    const renderFooter = () => {
        if (!isFetchingMore) return null; 
        
        return (
            <View style={styles.footerContainer}>
                <ActivityIndicator size="large" color="#15ff00ff" />
                <Text style={styles.loadingText}>Carregando mais...</Text>
            </View>
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.flexItem, styles.center]}
            onPress={() => {
                navigation.navigate('CharacterDetails', { character: item });
            }}
        >
            <Image source={{ uri: item.image }} style={styles.image}/> 
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>Status: {item.status} - {item.species}</Text>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#15ff00ff" />
                <Text style={styles.loadingText}>Carregando dados...</Text>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Character List</Text>
            <FlatList
                data={characters}
                renderItem={renderItem} 
                keyExtractor={(item) => item.id.toString()} 
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                onEndReached={handleLoadMore} 
                onEndReachedThreshold={0.5} 
                ListFooterComponent={renderFooter} 
            />
             <View style={styles.center}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000000ff",
    },
    Text: {
        color: "#e6e6e6ff",
        fontSize: 24,
        margin: 20,
    },
    buttonContainer: {
        height: 50,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#6bda61ff",
        borderRadius: 20,
        margin: 10,
    },
    buttonText: {
        color: "#ffffffff",
        fontSize: 18,
    },
    center: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "#e6e6e6ff",
        marginTop: 10,
    },
    name: {
        paddingTop: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: "#eeeeeeff",
    },
    status: {
        fontSize: 14,
        color: "#eeeeeeff",
    },
    separator: {
        height: 1,
        backgroundColor: "#dddddd",
    },
    flexItem: {
        padding: 15,
        backgroundColor: "#252525ff",
    },
    image: { 
        height: 200,
        width: "40%",
        borderRadius:10
    },
    footerContainer: { 
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE",
        backgroundColor: "#252525ff",
        alignItems: 'center',
    }
});

export default CharacterList;