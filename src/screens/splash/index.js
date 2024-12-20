import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.text}>GERADOR DE SENHAS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    maxWidth: 200,
    height: 200,
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#004259",
  },
});

export default SplashScreen;
