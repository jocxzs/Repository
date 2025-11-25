import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import rickandmorty  from "../../assets/rickandmorty.jpg";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image}source={rickandmorty} />
      <Text style={styles.Text}></Text>
      <TouchableOpacity style={styles.buttonContainer}
      onPress={() => navigation.navigate("CharacterList")}>
        <Text style={styles.buttonText}>Go to Character List</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000ff",
    },
    Text: {
        color: "#e6e6e6ff",
        fontSize: 24,
        marginBottom: 20,  
    },
    buttonContainer: {
        height: 50,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#6bda61ff",
        borderRadius: 20,
    },
    buttonText: {
        color: "#ffffffff",
        fontSize: 18,
    },
    image: {
      width: 300,
      height: 500,
      marginBottom: 20,
    },
});
export default HomeScreen;
