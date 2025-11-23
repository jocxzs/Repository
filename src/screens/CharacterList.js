import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

const baseurl = "https://rickandmortyapi.com/api/character/"; 
var page = 1;

// Exemplo de uso:
// fecthById(1);

// for(i = 1; i<42; i++){
//     const ListData = [
//         fecthById(i)
//     ]
// }

const CharacterList = ({ navigation }) => {

    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchCharacters(page) {
    try {
      setIsLoading(true);
      const pagesufix = "?page=";
      const finalurl = baseurl + pagesufix + page;
      for (page = 1; page <= 42; page++) {
        const response = await fetch(finalurl);
        const json = await response.json();
        setCharacters(json.results); 
        console.log(json.results);
    }
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function fecthById(id) {
  try {
    setIsLoading(true);
    const finalurl = baseurl + id;
    const response = await fetch(finalurl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Couldn't fetch data", error);
  }
    finally { setIsLoading(false); }
}
  const setPage = (newPage) => {
    page = newPage;
    fetchCharacters(page);
  }
  const handleNextPageButtonPress = () => {
    if (page <= 42) {
      setPage(page + 1);
    }
    return;
  };

  const handlePreviousPageButtonPress = () => {
    if (page >= 2) {
      setPage(page -1);
    }
    return;
  };

  useEffect(() => {
    fetchCharacters(1);
  }, []);

    const renderItem = ({ item }) => (
    <TouchableOpacity 
    style={styles.flexItem}
      onPress={() => { //navigation.navigate('CharacterDetail', { characterId: item.id });
      }}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.status}>Status: {item.status} - {item.species}</Text>
    </TouchableOpacity>
    );
  

        if (isLoading) {
        return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#15ff00ff" />
            <Text>Loading data...</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
          <Text style={styles.Text}>Lista de Personagens</Text>
          <FlatList
            data={characters}
            renderItem={renderItem} 
            keyExtractor={(item) => item.id.toString()} 
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          <View style={styles.pageContainer}>
            <TouchableOpacity style={[styles.buttonContainer, page === 1 && styles.disabledButton]} 
              onPress={() => handlePreviousPageButtonPress()}
              disabled={page == 1}>
              <Text style={styles.buttonText}>Previous Page</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, page === 42 && styles.disabledButton]} 
              onPress={() => handleNextPageButtonPress()}
              disabled={page == 42}>
              <Text style={styles.buttonText}>Next Page</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.center}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Go back</Text>
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
  pageButtonContainer: {
    height: 50,
    width: 120,
  },
  buttonText: {
    color: "#ffffffff",
    fontSize: 18,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  name: {
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
  pageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  disabledButton: {
    backgroundColor: "#999999ff",
  }
});

export default CharacterList;