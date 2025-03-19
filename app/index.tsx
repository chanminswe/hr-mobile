import { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState('');

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Illustration by Storyset - https://storyset.com */}
        <Image source={require('../assets/images/office-amico.png')} style={styles.imageStyle} />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={passwordValue}
          onChangeText={setPasswordValue}
        />
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
