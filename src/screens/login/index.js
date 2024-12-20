import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const LoginScreen = ({ navigation }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    authenticateWithFingerprint();
  }, []);

  const authenticateWithFingerprint = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        setErrorMessage("Dispositivo não suporta autenticação por digital.");
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        setErrorMessage(
          "Nenhuma digital cadastrada no dispositivo, faça o cadastro e tente novamente fazer o login."
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Logue com sua digital",
      });

      if (result.success) {
        navigation.replace("Home");
      } else {
        setErrorMessage("Falha na autenticação, tente novamente.");
      }
    } catch (error) {
      setErrorMessage("Erro ao tentar autenticar.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.text}>*** Login com Digital ***</Text>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.button}
          onPress={authenticateWithFingerprint}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={{ color: "#004259" }}>Versão: 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    maxWidth: 200,
    height: 200,
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    color: "#004259",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    paddingTop: 14,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#004259",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  footer: {
    position: "absolute",
    bottom: 20,
  },
});

export default LoginScreen;
